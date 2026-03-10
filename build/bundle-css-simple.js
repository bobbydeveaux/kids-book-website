#!/usr/bin/env node

/**
 * Simple CSS Bundle Script for Donkey Website (No Dependencies)
 * Concatenates CSS files in proper order without external packages
 */

const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  srcDir: path.join(__dirname, '..', 'src', 'styles'),
  distDir: path.join(__dirname, '..', 'dist', 'css'),
  outputFile: 'styles.css'
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
 * Ensure directory exists
 * @param {string} dirPath - Directory path to create
 */
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`📁 Created directory: ${dirPath}`);
  }
}

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
/* Build: Development */

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
 * Basic CSS minification (remove extra whitespace and comments)
 * @param {string} css - CSS content to minify
 * @returns {string} - Minified CSS
 */
function basicMinifyCSS(css) {
  console.log('\n🗜️  Basic CSS minification...');

  const originalSize = css.length;

  // Remove multi-line comments
  let minified = css.replace(/\/\*[\s\S]*?\*\//g, '');

  // Remove extra whitespace and line breaks
  minified = minified
    .replace(/\s+/g, ' ')
    .replace(/;\s*}/g, '}')
    .replace(/{\s*/g, '{')
    .replace(/;\s*/g, ';')
    .replace(/,\s*/g, ',')
    .replace(/:\s*/g, ':')
    .trim();

  const minifiedSize = minified.length;
  const reduction = ((originalSize - minifiedSize) / originalSize * 100).toFixed(1);

  console.log(`📉 Original size: ${originalSize} characters`);
  console.log(`📉 Minified size: ${minifiedSize} characters`);
  console.log(`📉 Size reduction: ${reduction}%`);

  return minified;
}

/**
 * Write CSS bundle to output file
 * @param {string} css - CSS content
 */
function writeCSSBundle(css) {
  console.log('\n💾 Writing CSS bundle...');

  // Ensure output directory exists
  ensureDir(config.distDir);

  const outputPath = path.join(config.distDir, config.outputFile);

  try {
    fs.writeFileSync(outputPath, css, 'utf8');
    console.log(`✅ CSS bundle written: ${outputPath}`);

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
  console.log('🚀 Starting CSS build process (simple version)...\n');
  const startTime = Date.now();

  try {
    // Step 1: Concatenate CSS files
    const combinedCSS = concatenateCSS();

    if (!combinedCSS.trim()) {
      console.error('❌ No CSS content found. Check file paths.');
      process.exit(1);
    }

    // Step 2: Basic minification
    const minifiedCSS = basicMinifyCSS(combinedCSS);

    // Step 3: Write output files
    writeCSSBundle(minifiedCSS);

    // Step 4: Generate statistics
    generateStats(minifiedCSS);

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

module.exports = { buildCSS, concatenateCSS };