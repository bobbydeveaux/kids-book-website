#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const CleanCSS = require('clean-css');

/**
 * CSS Bundling Script for Donkey Website
 *
 * Concatenates all CSS files in the correct import order:
 * base → layout → components → pages → utilities
 *
 * Features:
 * - Level 2 optimization with clean-css
 * - Source map generation
 * - File size reduction logging
 * - Proper dependency ordering
 */

class CSSBundler {
  constructor() {
    this.srcDir = path.join(process.cwd(), 'src', 'styles');
    this.outputDir = path.join(process.cwd(), 'dist', 'styles');
    this.outputFile = path.join(this.outputDir, 'styles.min.css');
    this.sourceMapFile = path.join(this.outputDir, 'styles.min.css.map');

    // CSS import order based on CSS specificity and dependency hierarchy
    this.importOrder = [
      'base',      // Reset, variables, typography (lowest specificity)
      'layout',    // Grid, container, header, footer
      'components', // Navigation, buttons, cards, etc.
      'pages',     // Page-specific styles
      'utilities'  // Utility classes (highest specificity)
    ];
  }

  /**
   * Get all CSS files from a directory in alphabetical order
   * @param {string} dir - Directory path
   * @returns {Promise<string[]>} Array of CSS file paths
   */
  async getCSSFiles(dir) {
    try {
      const files = await fs.readdir(dir);
      return files
        .filter(file => file.endsWith('.css'))
        .sort() // Alphabetical order within each category
        .map(file => path.join(dir, file));
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.log(`Directory ${dir} not found, skipping...`);
        return [];
      }
      throw error;
    }
  }

  /**
   * Read and concatenate CSS files in the correct order
   * @returns {Promise<string>} Concatenated CSS content
   */
  async concatenateCSS() {
    let concatenatedCSS = '';
    let totalFiles = 0;

    console.log('🔍 Gathering CSS files...');

    for (const category of this.importOrder) {
      const categoryDir = path.join(this.srcDir, category);
      const cssFiles = await this.getCSSFiles(categoryDir);

      if (cssFiles.length > 0) {
        console.log(`📁 Processing ${category}/ (${cssFiles.length} files)`);

        for (const filePath of cssFiles) {
          try {
            const content = await fs.readFile(filePath, 'utf8');
            const relativePath = path.relative(process.cwd(), filePath);

            // Add source comment for debugging
            concatenatedCSS += `/* === ${relativePath} === */\n`;
            concatenatedCSS += content.trim();
            concatenatedCSS += '\n\n';

            totalFiles++;
            console.log(`   ✅ ${path.basename(filePath)}`);
          } catch (error) {
            console.error(`❌ Error reading ${filePath}:`, error.message);
            throw error;
          }
        }
      }
    }

    console.log(`\n📦 Concatenated ${totalFiles} CSS files`);
    return concatenatedCSS;
  }

  /**
   * Minify CSS with clean-css level 2 optimizations and generate source map
   * @param {string} css - Input CSS content
   * @returns {Promise<{css: string, sourceMap: object, originalSize: number, minifiedSize: number}>}
   */
  async minifyCSS(css) {
    console.log('⚡ Minifying CSS with level 2 optimizations...');

    const originalSize = Buffer.byteLength(css, 'utf8');

    const cleanCSS = new CleanCSS({
      level: 2, // Level 2 optimizations as specified
      sourceMap: true,
      sourceMapInlineSources: true,
      format: 'beautify' // Can be changed to 'keep-breaks' or false for more compression
    });

    const result = cleanCSS.minify(css);

    if (result.errors && result.errors.length > 0) {
      console.error('❌ CSS minification errors:', result.errors);
      throw new Error(`CSS minification failed: ${result.errors.join(', ')}`);
    }

    if (result.warnings && result.warnings.length > 0) {
      console.warn('⚠️  CSS minification warnings:', result.warnings);
    }

    const minifiedSize = Buffer.byteLength(result.styles, 'utf8');

    return {
      css: result.styles,
      sourceMap: result.sourceMap,
      originalSize,
      minifiedSize
    };
  }

  /**
   * Ensure output directory exists
   */
  async ensureOutputDir() {
    try {
      await fs.mkdir(this.outputDir, { recursive: true });
    } catch (error) {
      console.error('❌ Error creating output directory:', error.message);
      throw error;
    }
  }

  /**
   * Write bundled CSS and source map to files
   * @param {string} css - Minified CSS content
   * @param {object} sourceMap - Source map object
   */
  async writeOutput(css, sourceMap) {
    console.log('💾 Writing output files...');

    // Write CSS file
    await fs.writeFile(this.outputFile, css, 'utf8');
    console.log(`   ✅ ${path.relative(process.cwd(), this.outputFile)}`);

    // Write source map file
    if (sourceMap) {
      await fs.writeFile(this.sourceMapFile, JSON.stringify(sourceMap, null, 2), 'utf8');
      console.log(`   ✅ ${path.relative(process.cwd(), this.sourceMapFile)}`);
    }
  }

  /**
   * Log file size reduction statistics
   * @param {number} originalSize - Original size in bytes
   * @param {number} minifiedSize - Minified size in bytes
   */
  logStats(originalSize, minifiedSize) {
    const reduction = originalSize - minifiedSize;
    const reductionPercent = originalSize > 0 ? ((reduction / originalSize) * 100) : 0;

    console.log('\n📊 Bundle Statistics:');
    console.log(`   Original size:  ${this.formatBytes(originalSize)}`);
    console.log(`   Minified size:  ${this.formatBytes(minifiedSize)}`);
    console.log(`   Reduction:      ${this.formatBytes(reduction)} (${reductionPercent.toFixed(1)}%)`);
    console.log(`   Output:         ${path.relative(process.cwd(), this.outputFile)}`);
  }

  /**
   * Format bytes to human readable format
   * @param {number} bytes - Size in bytes
   * @returns {string} Formatted size string
   */
  formatBytes(bytes) {
    if (bytes === 0) return '0 B';

    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  }

  /**
   * Main bundling process
   */
  async bundle() {
    try {
      console.log('🎨 CSS Bundler - Donkey Website');
      console.log('================================\n');

      // Ensure output directory exists
      await this.ensureOutputDir();

      // Concatenate CSS files in correct order
      const concatenatedCSS = await this.concatenateCSS();

      if (!concatenatedCSS.trim()) {
        console.log('⚠️  No CSS content found to bundle');
        console.log('   Make sure CSS files exist in src/styles/ subdirectories');
        return;
      }

      // Minify CSS and generate source map
      const { css, sourceMap, originalSize, minifiedSize } = await this.minifyCSS(concatenatedCSS);

      // Write output files
      await this.writeOutput(css, sourceMap);

      // Log statistics
      this.logStats(originalSize, minifiedSize);

      console.log('\n✨ CSS bundling completed successfully!');

    } catch (error) {
      console.error('\n❌ CSS bundling failed:', error.message);
      process.exit(1);
    }
  }
}

// Run the bundler if this script is executed directly
if (require.main === module) {
  const bundler = new CSSBundler();
  bundler.bundle();
}

// Export for use by other build scripts
module.exports = { CSSBundler };