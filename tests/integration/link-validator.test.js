import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import fs from 'fs/promises';
import path from 'path';
import { extractLinks, isInternalLink, resolveLink } from '../../build/compile-markdown.js';

describe('Internal Link Validation', () => {
  let htmlFiles = [];

  beforeAll(async () => {
    // Ensure dist directory exists with test files
    await fs.mkdir('dist', { recursive: true });
    await fs.mkdir('dist/breeds', { recursive: true });
    await fs.mkdir('dist/care', { recursive: true });

    // Create test HTML files with various link patterns
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
    <nav>
      <a href="/">Home</a>
      <a href="/breeds/">Breeds</a>
      <a href="/care/">Care</a>
      <a href="/facts.html">Facts</a>
    </nav>
  </header>
  <main>
    <h1>Welcome</h1>
    <a href="/breeds/miniature-mediterranean.html">Miniature Mediterranean</a>
    <a href="https://example.com">External Link</a>
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
    <nav>
      <a href="/">Home</a>
      <a href="/breeds/">Breeds</a>
    </nav>
  </header>
  <main>
    <h1>Donkey Breeds</h1>
    <a href="/breeds/miniature-mediterranean.html">Miniature Mediterranean</a>
    <a href="/breeds/standard-donkey.html">Standard Donkey</a>
    <a href="../">Back to Home</a>
  </main>
  <footer></footer>
</body>
</html>`,

      'dist/breeds/miniature-mediterranean.html': `<!DOCTYPE html>
<html lang="en">
<head><title>Miniature Mediterranean</title></head>
<body>
  <nav>
    <a href="/">Home</a>
    <a href="/breeds/">Breeds</a>
  </nav>
  <main>
    <h1>Miniature Mediterranean Donkey</h1>
    <a href="/breeds/">Back to Breeds</a>
    <a href="../care/feeding.html">Feeding Guide</a>
  </main>
</body>
</html>`,

      'dist/breeds/standard-donkey.html': `<!DOCTYPE html>
<html lang="en">
<head><title>Standard Donkey</title></head>
<body>
  <nav>
    <a href="/">Home</a>
    <a href="/breeds/">Breeds</a>
  </nav>
  <main>
    <h1>Standard Donkey</h1>
    <a href="/breeds/">Back to Breeds</a>
  </main>
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
    <nav>
      <a href="/">Home</a>
      <a href="/care/">Care</a>
    </nav>
  </header>
  <main>
    <h1>Care Guides</h1>
    <a href="/care/feeding.html">Feeding</a>
    <a href="./grooming.html">Grooming</a>
  </main>
  <footer></footer>
</body>
</html>`,

      'dist/care/feeding.html': `<!DOCTYPE html>
<html lang="en">
<head><title>Feeding Guide</title></head>
<body>
  <nav>
    <a href="/">Home</a>
    <a href="/care/">Care</a>
  </nav>
  <main>
    <h1>Feeding Guide</h1>
    <a href="/care/">Back to Care</a>
  </main>
</body>
</html>`,

      'dist/care/grooming.html': `<!DOCTYPE html>
<html lang="en">
<head><title>Grooming Guide</title></head>
<body>
  <nav>
    <a href="/">Home</a>
    <a href="/care/">Care</a>
  </nav>
  <main>
    <h1>Grooming Guide</h1>
    <a href="../">Back to Home</a>
    <a href="index.html">Back to Care</a>
  </main>
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
    <nav>
      <a href="/">Home</a>
      <a href="/facts.html">Facts</a>
    </nav>
  </header>
  <main>
    <h1>Fun Facts</h1>
    <a href="/">Back to Home</a>
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
    <nav>
      <a href="/">Home</a>
    </nav>
  </header>
  <main>
    <h1>Page Not Found</h1>
    <a href="/">Go Home</a>
  </main>
  <footer></footer>
</body>
</html>`,

      // Test file with broken links
      'dist/broken-links-test.html': `<!DOCTYPE html>
<html lang="en">
<head><title>Broken Links Test</title></head>
<body>
  <a href="/non-existent-page.html">Broken Link 1</a>
  <a href="/breeds/non-existent-breed.html">Broken Link 2</a>
  <a href="../non-existent.html">Broken Link 3</a>
</body>
</html>`
    };

    // Write all test files
    for (const [filePath, content] of Object.entries(testFiles)) {
      await fs.writeFile(filePath, content);
    }

    // Find all HTML files in dist
    htmlFiles = await findHtmlFiles('dist');
  }, 10000);

  afterAll(async () => {
    // Clean up test files
    try {
      await fs.rm('dist', { recursive: true, force: true });
    } catch (error) {
      // Ignore cleanup errors
    }
  });

  it('should have no broken internal links in main pages', async () => {
    const brokenLinks = [];
    const mainPages = htmlFiles.filter(file => !file.includes('broken-links-test.html'));

    for (const file of mainPages) {
      const content = await fs.readFile(file, 'utf-8');
      const links = extractLinks(content);

      for (const link of links) {
        if (isInternalLink(link)) {
          const targetPath = resolveLink(file, link);
          const exists = await fileExists(targetPath);

          if (!exists) {
            brokenLinks.push({ file, link, targetPath });
          }
        }
      }
    }

    if (brokenLinks.length > 0) {
      console.error('Broken internal links found:', brokenLinks);
    }

    expect(brokenLinks).toHaveLength(0);
  });

  it('should detect broken links in test file', async () => {
    const brokenLinks = [];
    const testFile = 'dist/broken-links-test.html';

    if (await fileExists(testFile)) {
      const content = await fs.readFile(testFile, 'utf-8');
      const links = extractLinks(content);

      for (const link of links) {
        if (isInternalLink(link)) {
          const targetPath = resolveLink(testFile, link);
          const exists = await fileExists(targetPath);

          if (!exists) {
            brokenLinks.push({ file: testFile, link, targetPath });
          }
        }
      }
    }

    // Should find broken links in the test file
    expect(brokenLinks.length).toBeGreaterThan(0);
  });

  it('should correctly resolve absolute internal links', async () => {
    const testFile = 'dist/breeds/index.html';
    const link = '/facts.html';

    const resolved = resolveLink(testFile, link);
    expect(resolved).toBe('dist/facts.html');

    const exists = await fileExists(resolved);
    expect(exists).toBe(true);
  });

  it('should correctly resolve relative internal links', async () => {
    const testFile = 'dist/breeds/miniature-mediterranean.html';
    const link = '../care/feeding.html';

    const resolved = resolveLink(testFile, link);
    expect(resolved).toBe(path.resolve('dist/care/feeding.html'));

    const exists = await fileExists(resolved);
    expect(exists).toBe(true);
  });

  it('should skip external links', async () => {
    const content = await fs.readFile('dist/index.html', 'utf-8');
    const links = extractLinks(content);

    const externalLinks = links.filter(link => !isInternalLink(link));
    expect(externalLinks).toContain('https://example.com');
  });

  it('should handle directory links (trailing slash)', async () => {
    const testFile = 'dist/index.html';
    const link = '/breeds/';

    const resolved = resolveLink(testFile, link);
    const indexPath = path.join(resolved, 'index.html');

    // Should be able to find either the directory or index.html
    const dirExists = await fileExists(resolved);
    const indexExists = await fileExists(indexPath);

    expect(dirExists || indexExists).toBe(true);
  });

  // Helper functions
  async function findHtmlFiles(dir) {
    const files = [];

    async function search(currentDir) {
      const entries = await fs.readdir(currentDir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(currentDir, entry.name);

        if (entry.isDirectory()) {
          await search(fullPath);
        } else if (entry.name.endsWith('.html')) {
          files.push(fullPath);
        }
      }
    }

    await search(dir);
    return files;
  }

  async function fileExists(filePath) {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      // If it's a directory link, check for index.html
      if (filePath.endsWith('/') || !path.extname(filePath)) {
        try {
          const indexPath = filePath.endsWith('/')
            ? path.join(filePath, 'index.html')
            : path.join(filePath, 'index.html');
          await fs.access(indexPath);
          return true;
        } catch {
          return false;
        }
      }
      return false;
    }
  }
});