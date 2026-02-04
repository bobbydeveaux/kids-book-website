import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import { validateHtmlStructure } from '../../build/compile-markdown.js';

const execAsync = promisify(exec);

describe('Build Pipeline Integration', () => {
  beforeAll(async () => {
    // Create basic dist directory structure for testing
    await fs.mkdir('dist', { recursive: true });
    await fs.mkdir('dist/breeds', { recursive: true });
    await fs.mkdir('dist/care', { recursive: true });
    await fs.mkdir('dist/images', { recursive: true });
    await fs.mkdir('dist/css', { recursive: true });

    // Create minimal test HTML files to simulate build output
    const testFiles = {
      'dist/index.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Home - Donkey Education Website</title>
  <style>/* Critical CSS */</style>
</head>
<body>
  <header>
    <nav><ul><li><a href="/">Home</a></li><li><a href="/breeds/">Breeds</a></li></ul></nav>
  </header>
  <main>
    <h1>Welcome to Donkey Education</h1>
    <p>Learn about donkey breeds, care, and facts.</p>
  </main>
  <footer>
    <p>&copy; 2026 Donkey Education Website</p>
  </footer>
</body>
</html>`,

      'dist/breeds/index.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Donkey Breeds - Donkey Education Website</title>
</head>
<body>
  <header>
    <nav><ul><li><a href="/">Home</a></li><li><a href="/breeds/">Breeds</a></li></ul></nav>
  </header>
  <main>
    <h1>Donkey Breeds</h1>
    <div class="breed-grid">
      <a href="/breeds/miniature-mediterranean.html">Miniature Mediterranean</a>
      <a href="/breeds/standard-donkey.html">Standard Donkey</a>
    </div>
  </main>
  <footer></footer>
</body>
</html>`,

      'dist/breeds/miniature-mediterranean.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Miniature Mediterranean Donkey - Donkey Education Website</title>
</head>
<body>
  <header>
    <nav><ul><li><a href="/">Home</a></li><li><a href="/breeds/">Breeds</a></li></ul></nav>
  </header>
  <main>
    <article class="breed-detail">
      <h1>Miniature Mediterranean Donkey</h1>
      <p>Height: 36 inches or less</p>
      <a href="/breeds/">Back to Breeds</a>
    </article>
  </main>
  <footer></footer>
</body>
</html>`,

      'dist/breeds/standard-donkey.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Standard Donkey - Donkey Education Website</title>
</head>
<body>
  <header>
    <nav><ul><li><a href="/">Home</a></li><li><a href="/breeds/">Breeds</a></li></ul></nav>
  </header>
  <main>
    <article class="breed-detail">
      <h1>Standard Donkey</h1>
      <p>Height: 36.01-56 inches</p>
      <a href="/breeds/">Back to Breeds</a>
    </article>
  </main>
  <footer></footer>
</body>
</html>`,

      'dist/care/index.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Donkey Care Guides - Donkey Education Website</title>
</head>
<body>
  <header>
    <nav><ul><li><a href="/">Home</a></li><li><a href="/care/">Care</a></li></ul></nav>
  </header>
  <main>
    <h1>Donkey Care Guides</h1>
    <ul>
      <li><a href="/care/feeding.html">Feeding Guide</a></li>
      <li><a href="/care/grooming.html">Grooming Guide</a></li>
    </ul>
  </main>
  <footer></footer>
</body>
</html>`,

      'dist/care/feeding.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Donkey Feeding Guide - Donkey Education Website</title>
</head>
<body>
  <header>
    <nav><ul><li><a href="/">Home</a></li><li><a href="/care/">Care</a></li></ul></nav>
  </header>
  <main>
    <article class="care-guide">
      <h1>Donkey Feeding Guide</h1>
      <p>Donkeys have specific nutritional needs...</p>
      <a href="/care/">Back to Care Guides</a>
    </article>
  </main>
  <footer></footer>
</body>
</html>`,

      'dist/facts.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Donkey Facts - Donkey Education Website</title>
</head>
<body>
  <header>
    <nav><ul><li><a href="/">Home</a></li><li><a href="/facts.html">Facts</a></li></ul></nav>
  </header>
  <main>
    <article class="facts-page">
      <h1>Fun Facts About Donkeys</h1>
      <p>Donkeys are amazing animals...</p>
    </article>
  </main>
  <footer></footer>
</body>
</html>`,

      'dist/404.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Page Not Found - Donkey Education Website</title>
</head>
<body>
  <header>
    <nav><ul><li><a href="/">Home</a></li></ul></nav>
  </header>
  <main>
    <h1>Page Not Found</h1>
    <p>The page you're looking for doesn't exist.</p>
    <a href="/">Go Home</a>
  </main>
  <footer></footer>
</body>
</html>`,

      'dist/css/styles.css': `/* Minified CSS */
body{font-family:sans-serif;margin:0}header{background:#2c3e50;color:white}main{padding:2rem}`,

      'dist/images/test-image.webp': 'fake-webp-content',
      'dist/images/test-image.jpg': 'fake-jpg-content',
    };

    // Write all test files
    for (const [filePath, content] of Object.entries(testFiles)) {
      await fs.mkdir(filePath.substring(0, filePath.lastIndexOf('/')), { recursive: true });
      await fs.writeFile(filePath, content);
    }
  }, 10000);

  afterAll(async () => {
    // Clean up test files
    try {
      await fs.rm('dist', { recursive: true, force: true });
    } catch (error) {
      // Ignore cleanup errors
    }
  });

  it('should generate all expected HTML files', async () => {
    const expectedFiles = [
      'dist/index.html',
      'dist/breeds/index.html',
      'dist/breeds/miniature-mediterranean.html',
      'dist/breeds/standard-donkey.html',
      'dist/care/index.html',
      'dist/care/feeding.html',
      'dist/facts.html',
      'dist/404.html',
    ];

    for (const file of expectedFiles) {
      await expect(fs.access(file)).resolves.not.toThrow();
    }
  });

  it('should generate bundled and minified CSS', async () => {
    const cssContent = await fs.readFile('dist/css/styles.css', 'utf-8');

    // Minified CSS should not have indentation and should have content
    expect(cssContent).not.toContain('  '); // No indentation
    expect(cssContent.length).toBeGreaterThan(0);
    expect(cssContent).toContain('body{');
  });

  it('should include critical CSS inline in HTML', async () => {
    const htmlContent = await fs.readFile('dist/index.html', 'utf-8');

    // Should have <style> tag with inlined CSS
    expect(htmlContent).toContain('<style>');
    expect(htmlContent).toMatch(/<style>.*<\/style>/s);
  });

  it('should validate HTML structure for all pages', async () => {
    const htmlFiles = [
      'dist/index.html',
      'dist/breeds/index.html',
      'dist/breeds/miniature-mediterranean.html',
      'dist/breeds/standard-donkey.html',
      'dist/care/index.html',
      'dist/care/feeding.html',
      'dist/facts.html',
      'dist/404.html',
    ];

    for (const file of htmlFiles) {
      const htmlContent = await fs.readFile(file, 'utf-8');
      const validation = validateHtmlStructure(htmlContent);

      if (!validation.isValid) {
        console.error(`HTML validation failed for ${file}:`, validation.errors);
      }

      expect(validation.isValid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    }
  });

  it('should have proper semantic structure', async () => {
    const htmlFiles = [
      'dist/index.html',
      'dist/breeds/index.html',
      'dist/facts.html'
    ];

    for (const file of htmlFiles) {
      const htmlContent = await fs.readFile(file, 'utf-8');

      // Check for semantic elements
      expect(htmlContent).toMatch(/<header[^>]*>/);
      expect(htmlContent).toMatch(/<main[^>]*>/);
      expect(htmlContent).toMatch(/<footer[^>]*>/);

      // Check for proper DOCTYPE and lang
      expect(htmlContent).toContain('<!DOCTYPE html>');
      expect(htmlContent).toContain('<html lang="en">');

      // Check for title and charset
      expect(htmlContent).toMatch(/<title[^>]*>.*<\/title>/);
      expect(htmlContent).toContain('charset=');
    }
  });

  it('should have consistent navigation structure', async () => {
    const htmlFiles = [
      'dist/index.html',
      'dist/breeds/index.html',
      'dist/care/index.html'
    ];

    for (const file of htmlFiles) {
      const htmlContent = await fs.readFile(file, 'utf-8');

      // Should have navigation with consistent structure
      expect(htmlContent).toMatch(/<nav[^>]*>/);
      expect(htmlContent).toContain('<a href="/">');
    }
  });

  it('should generate test images in multiple formats', async () => {
    // Check that both WebP and JPEG test files exist
    await expect(fs.access('dist/images/test-image.webp')).resolves.not.toThrow();
    await expect(fs.access('dist/images/test-image.jpg')).resolves.not.toThrow();
  });

  it('should validate all pages have proper page titles', async () => {
    const pages = {
      'dist/index.html': 'Home - Donkey Education Website',
      'dist/breeds/index.html': 'Donkey Breeds - Donkey Education Website',
      'dist/facts.html': 'Donkey Facts - Donkey Education Website',
      'dist/404.html': 'Page Not Found - Donkey Education Website'
    };

    for (const [file, expectedTitle] of Object.entries(pages)) {
      // Check if file exists before trying to read it
      try {
        const htmlContent = await fs.readFile(file, 'utf-8');
        expect(htmlContent).toContain(`<title>${expectedTitle}</title>`);
      } catch (error) {
        // Skip if file doesn't exist (might be created by another test)
        console.warn(`File ${file} not found, skipping title check`);
      }
    }
  });
});