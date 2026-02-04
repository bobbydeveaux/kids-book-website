const fs = require('fs').promises;
const path = require('path');
const CleanCSS = require('clean-css');

// Define the CSS file order for concatenation
const CSS_FILE_ORDER = [
  'base/reset.css',
  'base/typography.css',
  'base/base.css',
  'layout/grid.css',
  'layout/header.css',
  'layout/footer.css',
  'layout/main.css',
  'components/buttons.css',
  'components/cards.css',
  'components/navigation.css',
  'components/lightbox.css',
  'pages/homepage.css',
  'pages/breeds.css',
  'pages/care.css',
  'pages/facts.css',
  'utilities/helpers.css',
  'utilities/responsive.css'
];

async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function collectCSSFiles(stylesDir) {
  const cssContent = [];
  let foundFiles = 0;

  console.log('Collecting CSS files in dependency order...');

  // First, add files in the specified order
  for (const relativePath of CSS_FILE_ORDER) {
    const filePath = path.join(stylesDir, relativePath);

    if (await fileExists(filePath)) {
      try {
        const content = await fs.readFile(filePath, 'utf-8');
        cssContent.push({
          path: relativePath,
          content: content
        });
        foundFiles++;
        console.log(`  ✓ Added: ${relativePath}`);
      } catch (error) {
        console.warn(`  ⚠ Could not read ${relativePath}: ${error.message}`);
      }
    } else {
      console.log(`  - Skipped (not found): ${relativePath}`);
    }
  }

  // Then, recursively find any CSS files not in the order list
  async function findAdditionalCSSFiles(dir, relativePath = '') {
    try {
      const files = await fs.readdir(dir, { withFileTypes: true });

      for (const file of files) {
        const fullPath = path.join(dir, file.name);
        const relativeFilePath = path.join(relativePath, file.name);

        if (file.isDirectory()) {
          await findAdditionalCSSFiles(fullPath, relativeFilePath);
        } else if (file.name.endsWith('.css')) {
          const normalizedPath = relativeFilePath.replace(/\\/g, '/');

          // Skip if already included in the ordered list
          if (!CSS_FILE_ORDER.includes(normalizedPath)) {
            try {
              const content = await fs.readFile(fullPath, 'utf-8');
              cssContent.push({
                path: normalizedPath,
                content: content
              });
              foundFiles++;
              console.log(`  ✓ Added (additional): ${normalizedPath}`);
            } catch (error) {
              console.warn(`  ⚠ Could not read ${normalizedPath}: ${error.message}`);
            }
          }
        }
      }
    } catch (error) {
      console.warn(`Warning: Could not read directory ${dir}: ${error.message}`);
    }
  }

  await findAdditionalCSSFiles(stylesDir);

  console.log(`✓ Collected ${foundFiles} CSS files`);
  return cssContent;
}

async function bundleCSS(stylesDir, outputDir) {
  console.log(`Bundling CSS from ${stylesDir} to ${outputDir}`);

  try {
    await ensureDir(outputDir);

    // Collect all CSS files
    const cssFiles = await collectCSSFiles(stylesDir);

    if (cssFiles.length === 0) {
      console.warn('⚠ No CSS files found to bundle');
      return;
    }

    // Concatenate CSS content
    const concatenatedCSS = cssFiles
      .map(file => `/* ${file.path} */\n${file.content}`)
      .join('\n\n');

    // Write unminified bundle
    const unminifiedPath = path.join(outputDir, 'styles.css');
    await fs.writeFile(unminifiedPath, concatenatedCSS, 'utf-8');

    // Minify CSS
    const cleanCSS = new CleanCSS({
      level: 2, // Advanced optimizations
      sourceMap: true,
      sourceMapInlineSources: true,
      returnPromise: false
    });

    console.log('Minifying CSS...');
    const minified = cleanCSS.minify(concatenatedCSS);

    if (minified.errors && minified.errors.length > 0) {
      console.error('CSS minification errors:');
      minified.errors.forEach(error => console.error(`  ✗ ${error}`));
      throw new Error('CSS minification failed');
    }

    if (minified.warnings && minified.warnings.length > 0) {
      console.warn('CSS minification warnings:');
      minified.warnings.forEach(warning => console.warn(`  ⚠ ${warning}`));
    }

    // Write minified bundle
    const minifiedPath = path.join(outputDir, 'styles.min.css');
    await fs.writeFile(minifiedPath, minified.styles, 'utf-8');

    // Write source map
    if (minified.sourceMap) {
      const sourceMapPath = path.join(outputDir, 'styles.min.css.map');
      await fs.writeFile(sourceMapPath, minified.sourceMap.toString(), 'utf-8');
    }

    const originalSize = Buffer.byteLength(concatenatedCSS, 'utf-8');
    const minifiedSize = Buffer.byteLength(minified.styles, 'utf-8');
    const compressionRatio = ((originalSize - minifiedSize) / originalSize * 100).toFixed(1);

    console.log(`✓ CSS bundle created:`);
    console.log(`  Original: ${(originalSize / 1024).toFixed(1)}KB`);
    console.log(`  Minified: ${(minifiedSize / 1024).toFixed(1)}KB`);
    console.log(`  Compression: ${compressionRatio}%`);

  } catch (error) {
    console.error(`Error bundling CSS:`, error.message);
    throw error;
  }
}

async function main() {
  const stylesDir = path.join(__dirname, '../src/styles');
  const outputDir = path.join(__dirname, '../dist/styles');

  try {
    await bundleCSS(stylesDir, outputDir);
    console.log('✓ CSS bundling completed successfully');
  } catch (error) {
    console.error('✗ CSS bundling failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { bundleCSS };