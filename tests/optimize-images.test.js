const { ImageOptimizer } = require('../build/optimize-images');
const fs = require('fs-extra');
const path = require('path');

describe('Image Optimization Script', () => {
  const testSrcDir = 'test-src-images';
  const testDistDir = 'test-dist-images';

  beforeEach(async () => {
    // Clean up test directories
    await fs.remove(testSrcDir);
    await fs.remove(testDistDir);
  });

  afterEach(async () => {
    // Clean up test directories
    await fs.remove(testSrcDir);
    await fs.remove(testDistDir);
  });

  test('should process JPG/PNG images and convert to WebP', async () => {
    const optimizer = new ImageOptimizer({
      srcDir: testSrcDir,
      distDir: testDistDir,
      responsiveWidths: [320, 640, 1024, 1920],
      webpQuality: 85
    });

    // Use existing test images
    await fs.copy('src/images', testSrcDir);

    const stats = await optimizer.optimize();

    // Check that images were processed
    expect(stats.processed).toBeGreaterThan(0);
    expect(stats.errors).toBe(0);

    // Check that WebP files were created
    const webpFiles = await fs.readdir(path.join(testDistDir, 'breeds'));
    expect(webpFiles.some(f => f.endsWith('.webp'))).toBe(true);
  });

  test('should generate responsive sizes', async () => {
    const optimizer = new ImageOptimizer({
      srcDir: testSrcDir,
      distDir: testDistDir,
      responsiveWidths: [320, 640],
      webpQuality: 85
    });

    // Use existing large test image
    await fs.ensureDir(testSrcDir);
    await fs.copy('src/images/heroes/hero-donkey.png', path.join(testSrcDir, 'hero-donkey.png'));

    await optimizer.optimize();

    // Check that responsive sizes were generated
    const files = await fs.readdir(testDistDir);
    expect(files.some(f => f.includes('-320w.webp'))).toBe(true);
    expect(files.some(f => f.includes('-640w.webp'))).toBe(true);
  });

  test('should copy SVG files without modification', async () => {
    const optimizer = new ImageOptimizer({
      srcDir: testSrcDir,
      distDir: testDistDir
    });

    // Copy SVG test file
    await fs.ensureDir(testSrcDir);
    await fs.copy('src/images/care/donkey-icon.svg', path.join(testSrcDir, 'icon.svg'));

    await optimizer.optimize();

    // Check that SVG was copied
    const svgExists = await fs.pathExists(path.join(testDistDir, 'icon.svg'));
    expect(svgExists).toBe(true);

    // Check that content is unchanged
    const originalContent = await fs.readFile(path.join(testSrcDir, 'icon.svg'), 'utf8');
    const copiedContent = await fs.readFile(path.join(testDistDir, 'icon.svg'), 'utf8');
    expect(copiedContent).toBe(originalContent);
  });

  test('should maintain directory structure', async () => {
    const optimizer = new ImageOptimizer({
      srcDir: testSrcDir,
      distDir: testDistDir
    });

    // Create nested directory structure
    await fs.ensureDir(path.join(testSrcDir, 'nested', 'folder'));
    await fs.copy('src/images/care/feeding-guide.jpg', path.join(testSrcDir, 'nested', 'folder', 'test.jpg'));

    await optimizer.optimize();

    // Check that nested structure is maintained
    const nestedFiles = await fs.readdir(path.join(testDistDir, 'nested', 'folder'));
    expect(nestedFiles.some(f => f.includes('test'))).toBe(true);
  });

  test('should handle errors gracefully for unsupported formats', async () => {
    const optimizer = new ImageOptimizer({
      srcDir: testSrcDir,
      distDir: testDistDir
    });

    // Create unsupported file
    await fs.ensureDir(testSrcDir);
    await fs.writeFile(path.join(testSrcDir, 'unsupported.txt'), 'test content');

    const stats = await optimizer.optimize();

    // Should skip unsupported files
    expect(stats.skipped).toBe(1);
    expect(stats.errors).toBe(0);
  });
});