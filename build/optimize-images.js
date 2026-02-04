#!/usr/bin/env node

const sharp = require('sharp');
const fs = require('fs-extra');
const path = require('path');

/**
 * Image optimization script for donkey-website
 * Converts images to WebP format with responsive sizes
 * Maintains directory structure and handles SVG files
 */

class ImageOptimizer {
  constructor(options = {}) {
    this.srcDir = options.srcDir || 'src/images';
    this.distDir = options.distDir || 'dist/images';
    this.responsiveWidths = options.responsiveWidths || [320, 640, 1024, 1920];
    this.webpQuality = options.webpQuality || 85;
    this.supportedFormats = ['.jpg', '.jpeg', '.png'];
    this.stats = {
      processed: 0,
      skipped: 0,
      errors: 0,
      totalSizeOriginal: 0,
      totalSizeOptimized: 0
    };
  }

  /**
   * Main optimization function
   */
  async optimize() {
    console.log('🖼️  Starting image optimization...');
    console.log(`📁 Source: ${this.srcDir}`);
    console.log(`📁 Output: ${this.distDir}`);
    console.log(`🎯 Responsive widths: ${this.responsiveWidths.join(', ')}px`);
    console.log(`⚡ WebP quality: ${this.webpQuality}%`);
    console.log('');

    try {
      // Ensure directories exist
      await fs.ensureDir(this.srcDir);
      await fs.ensureDir(this.distDir);

      // Process all images recursively
      await this.processDirectory(this.srcDir, this.distDir);

      // Print summary
      this.printSummary();

      return this.stats;
    } catch (error) {
      console.error('❌ Error during optimization:', error.message);
      throw error;
    }
  }

  /**
   * Process a directory recursively
   */
  async processDirectory(srcPath, distPath) {
    const items = await fs.readdir(srcPath);

    for (const item of items) {
      const srcItemPath = path.join(srcPath, item);
      const distItemPath = path.join(distPath, item);
      const stat = await fs.stat(srcItemPath);

      if (stat.isDirectory()) {
        // Recursively process subdirectories
        await fs.ensureDir(distItemPath);
        await this.processDirectory(srcItemPath, distItemPath);
      } else if (stat.isFile()) {
        await this.processFile(srcItemPath, distPath);
      }
    }
  }

  /**
   * Process a single file
   */
  async processFile(filePath, outputDir) {
    const fileName = path.basename(filePath);
    const fileExt = path.extname(filePath).toLowerCase();
    const baseName = path.basename(filePath, fileExt);

    try {
      if (fileExt === '.svg') {
        // Copy SVG files without modification
        const outputPath = path.join(outputDir, fileName);
        await fs.copy(filePath, outputPath);
        console.log(`📋 Copied: ${fileName}`);
        this.stats.processed++;
      } else if (this.supportedFormats.includes(fileExt)) {
        // Process raster images
        await this.processRasterImage(filePath, outputDir, baseName);
        this.stats.processed++;
      } else {
        console.log(`⏭️  Skipped: ${fileName} (unsupported format)`);
        this.stats.skipped++;
      }
    } catch (error) {
      console.error(`❌ Error processing ${fileName}: ${error.message}`);
      this.stats.errors++;
    }
  }

  /**
   * Process raster images (JPG, PNG) to WebP with responsive sizes
   */
  async processRasterImage(inputPath, outputDir, baseName) {
    const fileName = path.basename(inputPath);

    try {
      // Get original file size
      const originalStat = await fs.stat(inputPath);
      this.stats.totalSizeOriginal += originalStat.size;

      console.log(`🔄 Processing: ${fileName}`);

      // Load the image to get metadata
      const image = sharp(inputPath);
      const metadata = await image.metadata();

      console.log(`   📐 Original: ${metadata.width}x${metadata.height} (${this.formatBytes(originalStat.size)})`);

      let totalOptimizedSize = 0;

      // Generate responsive sizes
      for (const width of this.responsiveWidths) {
        // Only resize if the original is larger than target width
        if (metadata.width >= width) {
          const outputFileName = `${baseName}-${width}w.webp`;
          const outputPath = path.join(outputDir, outputFileName);

          await image
            .clone()
            .resize(width, null, {
              withoutEnlargement: true,
              fit: 'inside'
            })
            .webp({ quality: this.webpQuality })
            .toFile(outputPath);

          const outputStat = await fs.stat(outputPath);
          totalOptimizedSize += outputStat.size;

          console.log(`   ✅ Generated: ${outputFileName} (${this.formatBytes(outputStat.size)})`);
        } else {
          console.log(`   ⏭️  Skipped ${width}w: original too small`);
        }
      }

      // Always generate full-size WebP version
      const fullSizeFileName = `${baseName}.webp`;
      const fullSizePath = path.join(outputDir, fullSizeFileName);

      await image
        .webp({ quality: this.webpQuality })
        .toFile(fullSizePath);

      const fullSizeStat = await fs.stat(fullSizePath);
      totalOptimizedSize += fullSizeStat.size;

      console.log(`   ✅ Generated: ${fullSizeFileName} (${this.formatBytes(fullSizeStat.size)})`);

      this.stats.totalSizeOptimized += totalOptimizedSize;

      // Calculate savings
      const savings = ((originalStat.size - totalOptimizedSize) / originalStat.size * 100);
      console.log(`   💾 Size reduction: ${savings.toFixed(1)}%`);
      console.log('');

    } catch (error) {
      throw new Error(`Failed to process ${fileName}: ${error.message}`);
    }
  }

  /**
   * Format bytes to human readable format
   */
  formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  /**
   * Print optimization summary
   */
  printSummary() {
    console.log('📊 Optimization Summary');
    console.log('========================');
    console.log(`✅ Images processed: ${this.stats.processed}`);
    console.log(`⏭️  Images skipped: ${this.stats.skipped}`);
    console.log(`❌ Errors: ${this.stats.errors}`);
    console.log(`📦 Original total size: ${this.formatBytes(this.stats.totalSizeOriginal)}`);
    console.log(`📦 Optimized total size: ${this.formatBytes(this.stats.totalSizeOptimized)}`);

    if (this.stats.totalSizeOriginal > 0) {
      const totalSavings = ((this.stats.totalSizeOriginal - this.stats.totalSizeOptimized) / this.stats.totalSizeOriginal * 100);
      console.log(`💾 Total size reduction: ${totalSavings.toFixed(1)}%`);
    }
    console.log('');

    if (this.stats.errors > 0) {
      console.log('⚠️  Some images failed to process. Check the logs above.');
    } else {
      console.log('🎉 All images processed successfully!');
    }
  }
}

/**
 * Command line interface
 */
async function main() {
  const args = process.argv.slice(2);
  const options = {};

  // Parse command line arguments
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i];
    const value = args[i + 1];

    switch (key) {
      case '--src':
        options.srcDir = value;
        break;
      case '--dist':
        options.distDir = value;
        break;
      case '--quality':
        options.webpQuality = parseInt(value);
        break;
      case '--widths':
        options.responsiveWidths = value.split(',').map(w => parseInt(w.trim()));
        break;
    }
  }

  try {
    const optimizer = new ImageOptimizer(options);
    const stats = await optimizer.optimize();

    // Exit with error code if there were errors
    if (stats.errors > 0) {
      process.exit(1);
    }
  } catch (error) {
    console.error('Fatal error:', error.message);
    process.exit(1);
  }
}

// Export for use as a module
module.exports = { ImageOptimizer };

// Run if called directly
if (require.main === module) {
  main();
}