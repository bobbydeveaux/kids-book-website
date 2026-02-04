#!/usr/bin/env node

/**
 * CSS Bundle Script for Donkey Website
 * Concatenates and minifies CSS files in proper order
 * Generates production-ready CSS bundle
 */

const fs = require('fs');
const path = require('path');
const CleanCSS = require('clean-css');
const mkdirp = require('mkdirp');

// Configuration
const config = {
  srcDir: path.join(__dirname, '..', 'src', 'styles'),
  distDir: path.join(__dirname, '..', 'dist', 'css'),
  outputFile: 'styles.css',
  minify: true,
  sourceMap: true
};

// CSS file order - important for cascade
const cssOrder = [
  // Base layer (foundational styles)
  'base/reset.css',
  'base/variables.css',
  'base/typography.css',

  // Layout layer (structural styles)
  'layout/container.css',
  'layout/grid.css',
  'layout/header.css',
  'layout/footer.css',

  // Component layer (UI components)
  'components/navigation.css',
  'components/button.css',
  'components/card.css',
  'components/hero.css',
  'components/gallery.css',

  // Utility layer (helper classes)
  'utilities/accessibility.css',
  'utilities/responsive.css'
];

/**
 * Read CSS file content
 * @param {string} filePath - Path to CSS file
 * @returns {string} - CSS content
 */
function readCSSFile(filePath) {
  const fullPath = path.join(config.srcDir, filePath);

  if (!fs.existsSync(fullPath)) {
    console.warn(`⚠️  CSS file not found: ${filePath}`);
    return '';
  }

  try {
    const content = fs.readFileSync(fullPath, 'utf8');
    console.log(`✅ Loaded: ${filePath} (${content.length} chars)`);
    return `/* ${filePath} */\n${content}\n\n`;
  } catch (error) {
    console.error(`❌ Error reading ${filePath}:`, error.message);
    return '';
  }
}

/**
 * Concatenate all CSS files in proper order
 * @returns {string} - Combined CSS content
 */
function concatenateCSS() {
  console.log('📦 Concatenating CSS files...\n');

  let combinedCSS = `/* Donkey Website - CSS Bundle */
/* Generated: ${new Date().toISOString()} */
/* Build: Production */

`;

  // Process CSS files in order
  for (const filePath of cssOrder) {
    const cssContent = readCSSFile(filePath);
    combinedCSS += cssContent;
  }

  console.log(`\n📊 Total CSS size: ${combinedCSS.length} characters`);
  return combinedCSS;
}

/**
 * Minify CSS using clean-css
 * @param {string} css - CSS content to minify
 * @returns {Object} - Minification result
 */
function minifyCSS(css) {
  console.log('\n🗜️  Minifying CSS...');

  const cleanCSS = new CleanCSS({
    level: 2, // Advanced optimizations
    returnPromise: false,
    sourceMap: config.sourceMap,
    format: {
      breakWith: '\n'
    },
    compatibility: {
      colors: {
        opacity: true // Keep rgba() format
      },
      properties: {
        backgroundClipMerging: false, // Keep separate for browser compatibility
        backgroundOriginMerging: false,
        backgroundSizeMerging: false,
        colors: true,
        iePrefixHack: false,
        ieSuffixHack: false,
        merging: true,
        shorterLengthUnits: true,
        spaceAfterClosingBrace: false,
        urlQuotes: false,
        zeroUnits: true
      },
      selectors: {
        adjacentSpace: false,
        ie7Hack: false,
        mergeablePseudoClasses: [':focus', ':hover'],
        mergeablePseudoElements: ['::before', '::after'],
        mergeLimit: 8191,
        multiplePseudoMerging: true
      }
    }
  });

  const result = cleanCSS.minify(css);

  if (result.errors && result.errors.length > 0) {
    console.error('❌ Minification errors:');
    result.errors.forEach(error => console.error(`   ${error}`));
  }

  if (result.warnings && result.warnings.length > 0) {
    console.warn('⚠️  Minification warnings:');
    result.warnings.forEach(warning => console.warn(`   ${warning}`));
  }

  const originalSize = css.length;
  const minifiedSize = result.styles.length;
  const reduction = ((originalSize - minifiedSize) / originalSize * 100).toFixed(1);

  console.log(`📉 Original size: ${originalSize} characters`);
  console.log(`📉 Minified size: ${minifiedSize} characters`);
  console.log(`📉 Size reduction: ${reduction}%`);

  return result;
}

/**
 * Write CSS bundle to output file
 * @param {string} css - CSS content
 * @param {string} sourceMap - Source map content (optional)
 */
function writeCSSBundle(css, sourceMap = null) {
  console.log('\n💾 Writing CSS bundle...');

  // Ensure output directory exists
  mkdirp.sync(config.distDir);

  const outputPath = path.join(config.distDir, config.outputFile);

  try {
    // Write main CSS file
    fs.writeFileSync(outputPath, css, 'utf8');
    console.log(`✅ CSS bundle written: ${outputPath}`);

    // Write source map if available
    if (sourceMap && config.sourceMap) {
      const sourceMapPath = outputPath + '.map';
      fs.writeFileSync(sourceMapPath, sourceMap, 'utf8');
      console.log(`✅ Source map written: ${sourceMapPath}`);
    }

    // Log final file size
    const stats = fs.statSync(outputPath);
    const fileSizeKB = (stats.size / 1024).toFixed(2);
    console.log(`📁 Final file size: ${fileSizeKB} KB`);

  } catch (error) {
    console.error('❌ Error writing CSS bundle:', error.message);
    process.exit(1);
  }
}

/**
 * Generate CSS stats for analysis
 * @param {string} css - CSS content
 */
function generateStats(css) {
  const lines = css.split('\n').length;
  const rules = (css.match(/\{[^}]*\}/g) || []).length;
  const selectors = (css.match(/[^{}]+\{/g) || []).length;
  const mediaQueries = (css.match(/@media[^{]+\{/g) || []).length;
  const customProperties = (css.match(/--[a-zA-Z-]+:/g) || []).length;

  console.log('\n📊 CSS Statistics:');
  console.log(`   Lines: ${lines}`);
  console.log(`   Rules: ${rules}`);
  console.log(`   Selectors: ${selectors}`);
  console.log(`   Media queries: ${mediaQueries}`);
  console.log(`   CSS custom properties: ${customProperties}`);
}

/**
 * Main build function
 */
function buildCSS() {
  console.log('🚀 Starting CSS build process...\n');
  const startTime = Date.now();

  try {
    // Step 1: Concatenate CSS files
    const combinedCSS = concatenateCSS();

    if (!combinedCSS.trim()) {
      console.error('❌ No CSS content found. Check file paths.');
      process.exit(1);
    }

    // Step 2: Minify if enabled
    let finalCSS = combinedCSS;
    let sourceMap = null;

    if (config.minify) {
      const result = minifyCSS(combinedCSS);
      finalCSS = result.styles;
      sourceMap = result.sourceMap?.toString();
    } else {
      console.log('\n⏭️  Skipping minification (disabled)');
    }

    // Step 3: Write output files
    writeCSSBundle(finalCSS, sourceMap);

    // Step 4: Generate statistics
    generateStats(finalCSS);

    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;

    console.log(`\n🎉 CSS build completed successfully in ${duration}s`);

  } catch (error) {
    console.error('\n❌ CSS build failed:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run build if called directly
if (require.main === module) {
  buildCSS();
}

module.exports = { buildCSS, concatenateCSS, minifyCSS };