const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');

const RESPONSIVE_SIZES = [320, 640, 1024, 1920];
const OUTPUT_FORMATS = ['webp', 'original'];

async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }
}

async function isImageFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff'].includes(ext);
}

async function optimizeImage(inputPath, outputDir, filename) {
  const ext = path.extname(filename).toLowerCase();
  const baseName = path.basename(filename, ext);

  console.log(`  Processing: ${filename}`);

  try {
    // For SVG files, just copy them without modification
    if (ext === '.svg') {
      const outputPath = path.join(outputDir, filename);
      await fs.copyFile(inputPath, outputPath);
      console.log(`    ✓ Copied SVG: ${filename}`);
      return;
    }

    const image = sharp(inputPath);
    const metadata = await image.metadata();

    // Generate responsive sizes
    for (const width of RESPONSIVE_SIZES) {
      // Only resize if the original is larger than the target size
      if (metadata.width && metadata.width >= width) {
        // Generate WebP version
        const webpPath = path.join(outputDir, `${baseName}-${width}w.webp`);
        await image
          .clone()
          .resize(width, null, {
            withoutEnlargement: true,
            fit: 'inside'
          })
          .webp({ quality: 85 })
          .toFile(webpPath);

        // Generate original format version
        const originalPath = path.join(outputDir, `${baseName}-${width}w${ext}`);
        await image
          .clone()
          .resize(width, null, {
            withoutEnlargement: true,
            fit: 'inside'
          })
          .toFile(originalPath);
      }
    }

    // Also create full-size WebP version
    const fullSizeWebpPath = path.join(outputDir, `${baseName}.webp`);
    await image
      .clone()
      .webp({ quality: 85 })
      .toFile(fullSizeWebpPath);

    // And optimized full-size original
    const optimizedOriginalPath = path.join(outputDir, filename);
    if (ext === '.jpg' || ext === '.jpeg') {
      await image
        .clone()
        .jpeg({ quality: 85, mozjpeg: true })
        .toFile(optimizedOriginalPath);
    } else if (ext === '.png') {
      await image
        .clone()
        .png({ quality: 85, compressionLevel: 9 })
        .toFile(optimizedOriginalPath);
    } else {
      // For other formats, just copy
      await fs.copyFile(inputPath, optimizedOriginalPath);
    }

    console.log(`    ✓ Generated responsive images for: ${filename}`);
  } catch (error) {
    console.error(`    ✗ Error processing ${filename}:`, error.message);
    throw error;
  }
}

async function optimizeImages(inputDir, outputDir) {
  console.log(`Optimizing images from ${inputDir} to ${outputDir}`);

  try {
    await ensureDir(outputDir);

    const files = await fs.readdir(inputDir, { withFileTypes: true });
    let processedCount = 0;

    for (const file of files) {
      const inputPath = path.join(inputDir, file.name);

      if (file.isDirectory()) {
        // Recursively process subdirectories
        const subOutputDir = path.join(outputDir, file.name);
        await optimizeImages(inputPath, subOutputDir);
      } else if (await isImageFile(inputPath) || path.extname(file.name).toLowerCase() === '.svg') {
        await optimizeImage(inputPath, outputDir, file.name);
        processedCount++;
      }
    }

    console.log(`✓ Optimized ${processedCount} images`);
  } catch (error) {
    console.error(`Error processing directory ${inputDir}:`, error.message);
    throw error;
  }
}

async function main() {
  const srcImagesDir = path.join(__dirname, '../src/images');
  const distImagesDir = path.join(__dirname, '../dist/images');

  try {
    await optimizeImages(srcImagesDir, distImagesDir);
    console.log('✓ Image optimization completed successfully');
  } catch (error) {
    console.error('✗ Image optimization failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { optimizeImages };