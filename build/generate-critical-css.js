const fs = require('fs').promises;
const path = require('path');
const puppeteer = require('puppeteer');

const VIEWPORTS = {
  mobile: { width: 375, height: 667 },
  desktop: { width: 1300, height: 900 }
};

const CRITICAL_CSS_LIMIT = 14 * 1024; // 14KB limit for critical CSS

async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }
}

async function extractCriticalCSS(htmlFilePath, cssFilePath, viewport) {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport(viewport);

    // Read the HTML and CSS content
    const htmlContent = await fs.readFile(htmlFilePath, 'utf-8');
    const cssContent = await fs.readFile(cssFilePath, 'utf-8');

    // Set the HTML content
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    // Inject all CSS and extract critical styles
    const criticalCSS = await page.evaluate((css) => {
      // Create a style element with all CSS
      const style = document.createElement('style');
      style.textContent = css;
      document.head.appendChild(style);

      // Get all elements in the viewport
      const viewportHeight = window.innerHeight;
      const elements = Array.from(document.querySelectorAll('*'));

      const criticalElements = elements.filter(element => {
        const rect = element.getBoundingClientRect();
        // Element is considered critical if any part is above the fold
        return rect.top < viewportHeight && rect.bottom > 0;
      });

      // Get all CSS rules
      const allRules = [];
      for (const sheet of document.styleSheets) {
        try {
          for (const rule of sheet.cssRules) {
            allRules.push(rule);
          }
        } catch (e) {
          // Cross-origin stylesheet or other access issue
          console.warn('Could not access stylesheet rules:', e.message);
        }
      }

      // Find rules that apply to critical elements
      const criticalRules = new Set();

      criticalElements.forEach(element => {
        allRules.forEach(rule => {
          if (rule.type === CSSRule.STYLE_RULE) {
            try {
              if (element.matches(rule.selectorText)) {
                criticalRules.add(rule.cssText);
              }
            } catch (e) {
              // Invalid selector or other matching issue
            }
          } else if (rule.type === CSSRule.MEDIA_RULE) {
            // Include media queries that might affect layout
            if (window.matchMedia(rule.conditionText || '').matches) {
              Array.from(rule.cssRules).forEach(nestedRule => {
                if (nestedRule.type === CSSRule.STYLE_RULE) {
                  try {
                    if (element.matches(nestedRule.selectorText)) {
                      criticalRules.add(rule.cssText);
                    }
                  } catch (e) {
                    // Invalid selector
                  }
                }
              });
            }
          }
        });
      });

      // Also include some universal rules
      allRules.forEach(rule => {
        if (rule.type === CSSRule.STYLE_RULE) {
          const selector = rule.selectorText;
          // Include reset styles, base typography, and universal selectors
          if (selector.includes('*') ||
              selector.includes('html') ||
              selector.includes('body') ||
              selector.includes(':root') ||
              selector.includes('h1') ||
              selector.includes('h2') ||
              selector.includes('h3') ||
              selector.includes('p') ||
              selector.includes('a')) {
            criticalRules.add(rule.cssText);
          }
        }
      });

      return Array.from(criticalRules).join('\n');
    }, cssContent);

    await browser.close();
    return criticalCSS;

  } catch (error) {
    if (browser) {
      await browser.close();
    }
    throw error;
  }
}

async function generateCriticalCSS(distDir) {
  console.log('Generating critical CSS...');

  try {
    const stylesDir = path.join(distDir, 'styles');
    const cssFilePath = path.join(stylesDir, 'styles.min.css');

    // Check if CSS bundle exists
    try {
      await fs.access(cssFilePath);
    } catch (error) {
      console.warn('⚠ CSS bundle not found, skipping critical CSS generation');
      return;
    }

    // Look for HTML files to analyze
    const contentDir = path.join(distDir, 'content');
    let htmlFiles = [];

    try {
      const files = await fs.readdir(contentDir, { recursive: true });
      htmlFiles = files
        .filter(file => file.endsWith('.html'))
        .slice(0, 5); // Limit to first 5 HTML files for performance
    } catch (error) {
      console.warn('⚠ No HTML files found, creating fallback critical CSS');

      // Create a minimal critical CSS with just base styles
      const cssContent = await fs.readFile(cssFilePath, 'utf-8');
      const baseCriticalCSS = cssContent
        .split('\n')
        .filter(line => {
          const lowercaseLine = line.toLowerCase();
          return lowercaseLine.includes('html') ||
                 lowercaseLine.includes('body') ||
                 lowercaseLine.includes(':root') ||
                 lowercaseLine.includes('h1') ||
                 lowercaseLine.includes('h2') ||
                 lowercaseLine.includes('p') ||
                 lowercaseLine.includes('font') ||
                 lowercaseLine.includes('color');
        })
        .join('\n');

      const criticalPath = path.join(stylesDir, 'critical.css');
      await fs.writeFile(criticalPath, baseCriticalCSS.slice(0, CRITICAL_CSS_LIMIT), 'utf-8');

      console.log(`✓ Created fallback critical CSS (${(baseCriticalCSS.length / 1024).toFixed(1)}KB)`);
      return;
    }

    const allCriticalCSS = new Set();

    // Analyze each viewport size
    for (const [viewportName, viewport] of Object.entries(VIEWPORTS)) {
      console.log(`  Analyzing ${viewportName} viewport (${viewport.width}x${viewport.height})`);

      for (const htmlFile of htmlFiles.slice(0, 2)) { // Limit files per viewport
        try {
          const htmlPath = path.join(contentDir, htmlFile);

          // Create a temporary full HTML document
          const htmlFragment = await fs.readFile(htmlPath, 'utf-8');
          const fullHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Test Page</title>
</head>
<body>
  ${htmlFragment}
</body>
</html>`;

          const tempHtmlPath = path.join(distDir, 'temp-critical.html');
          await fs.writeFile(tempHtmlPath, fullHTML, 'utf-8');

          const criticalCSS = await extractCriticalCSS(tempHtmlPath, cssFilePath, viewport);

          criticalCSS.split('\n').forEach(rule => {
            if (rule.trim()) {
              allCriticalCSS.add(rule);
            }
          });

          // Clean up temp file
          await fs.unlink(tempHtmlPath);

          console.log(`    ✓ Analyzed: ${htmlFile}`);
        } catch (error) {
          console.warn(`    ⚠ Could not analyze ${htmlFile}: ${error.message}`);
        }
      }
    }

    // Combine and trim critical CSS
    let finalCriticalCSS = Array.from(allCriticalCSS).join('\n');

    // If critical CSS is too large, trim it
    if (Buffer.byteLength(finalCriticalCSS, 'utf-8') > CRITICAL_CSS_LIMIT) {
      console.warn(`⚠ Critical CSS too large (${(Buffer.byteLength(finalCriticalCSS, 'utf-8') / 1024).toFixed(1)}KB), trimming to ${CRITICAL_CSS_LIMIT / 1024}KB`);
      finalCriticalCSS = finalCriticalCSS.slice(0, CRITICAL_CSS_LIMIT);
    }

    // Write critical CSS
    const criticalPath = path.join(stylesDir, 'critical.css');
    await fs.writeFile(criticalPath, finalCriticalCSS, 'utf-8');

    const size = Buffer.byteLength(finalCriticalCSS, 'utf-8');
    console.log(`✓ Critical CSS generated: ${(size / 1024).toFixed(1)}KB`);

  } catch (error) {
    console.error(`Error generating critical CSS:`, error.message);
    console.warn('Falling back to full CSS bundle');

    // Fallback: copy the full minified CSS as critical CSS
    try {
      const stylesDir = path.join(distDir, 'styles');
      const cssFilePath = path.join(stylesDir, 'styles.min.css');
      const criticalPath = path.join(stylesDir, 'critical.css');

      const fullCSS = await fs.readFile(cssFilePath, 'utf-8');
      const truncatedCSS = fullCSS.slice(0, CRITICAL_CSS_LIMIT);
      await fs.writeFile(criticalPath, truncatedCSS, 'utf-8');

      console.log('✓ Created fallback critical CSS from full bundle');
    } catch (fallbackError) {
      console.error('✗ Could not create fallback critical CSS:', fallbackError.message);
      throw error;
    }
  }
}

async function main() {
  const distDir = path.join(__dirname, '../dist');

  try {
    await generateCriticalCSS(distDir);
    console.log('✓ Critical CSS generation completed successfully');
  } catch (error) {
    console.error('✗ Critical CSS generation failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { generateCriticalCSS };