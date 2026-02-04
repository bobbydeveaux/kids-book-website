#!/usr/bin/env node

const sharp = require('sharp');
const fs = require('fs-extra');
const path = require('path');

/**
 * Create test images for the optimization script
 */
async function createTestImages() {
  console.log('🎨 Creating test images...');

  try {
    // Ensure directories exist
    await fs.ensureDir('src/images/heroes');
    await fs.ensureDir('src/images/breeds');
    await fs.ensureDir('src/images/care');

    // Create test PNG image (large resolution for testing responsive sizes)
    await sharp({
      create: {
        width: 2000,
        height: 1200,
        channels: 3,
        background: { r: 100, g: 150, b: 200 }
      }
    })
    .png()
    .toFile('src/images/heroes/hero-donkey.png');

    // Create test JPG image (medium resolution)
    await sharp({
      create: {
        width: 1600,
        height: 900,
        channels: 3,
        background: { r: 150, g: 100, b: 50 }
      }
    })
    .jpeg()
    .toFile('src/images/breeds/miniature-donkey.jpg');

    // Create smaller test image
    await sharp({
      create: {
        width: 800,
        height: 600,
        channels: 3,
        background: { r: 50, g: 150, b: 100 }
      }
    })
    .jpeg()
    .toFile('src/images/care/feeding-guide.jpg');

    // Create very small image to test skipping
    await sharp({
      create: {
        width: 200,
        height: 150,
        channels: 3,
        background: { r: 200, g: 50, b: 150 }
      }
    })
    .png()
    .toFile('src/images/care/small-image.png');

    // Create a simple SVG file
    const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="40" fill="#8B4513"/>
  <text x="50" y="55" text-anchor="middle" fill="white" font-family="Arial" font-size="12">Donkey</text>
</svg>`;

    await fs.writeFile('src/images/care/donkey-icon.svg', svgContent);

    console.log('✅ Created test images:');
    console.log('   📸 src/images/heroes/hero-donkey.png (2000x1200)');
    console.log('   📸 src/images/breeds/miniature-donkey.jpg (1600x900)');
    console.log('   📸 src/images/care/feeding-guide.jpg (800x600)');
    console.log('   📸 src/images/care/small-image.png (200x150)');
    console.log('   🎨 src/images/care/donkey-icon.svg');
    console.log('');

  } catch (error) {
    console.error('❌ Error creating test images:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  createTestImages();
}

module.exports = { createTestImages };