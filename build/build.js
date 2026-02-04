const fs = require('fs').promises;
const path = require('path');
const { compileMarkdown } = require('./compile-markdown');
const { optimizeImages } = require('./optimize-images');
const { bundleCSS } = require('./bundle-css');
const { generateCriticalCSS } = require('./generate-critical-css');

async function cleanDist() {
  const distDir = path.join(__dirname, '../dist');

  try {
    console.log('🧹 Cleaning dist directory...');
    await fs.rm(distDir, { recursive: true, force: true });
    await fs.mkdir(distDir, { recursive: true });
    console.log('✓ Dist directory cleaned');
  } catch (error) {
    console.error('Error cleaning dist directory:', error.message);
    throw error;
  }
}

async function copyStaticFiles() {
  console.log('📁 Copying static files...');

  try {
    // Copy any static files from src/ that don't need processing
    // For now, this is a placeholder for future static assets
    const staticSourceDirs = [
      path.join(__dirname, '../src/templates')
    ];

    for (const sourceDir of staticSourceDirs) {
      try {
        const files = await fs.readdir(sourceDir, { withFileTypes: true });
        if (files.length > 0) {
          const distTemplatesDir = path.join(__dirname, '../dist/templates');
          await fs.mkdir(distTemplatesDir, { recursive: true });

          for (const file of files) {
            if (file.isFile()) {
              const srcPath = path.join(sourceDir, file.name);
              const destPath = path.join(distTemplatesDir, file.name);
              await fs.copyFile(srcPath, destPath);
              console.log(`  ✓ Copied: ${file.name}`);
            }
          }
        }
      } catch (error) {
        // Directory doesn't exist or is empty, which is fine
        console.log(`  - No files to copy from ${path.basename(sourceDir)}`);
      }
    }

    console.log('✓ Static files copied');
  } catch (error) {
    console.error('Error copying static files:', error.message);
    throw error;
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

async function getDirSize(dirPath) {
  let size = 0;

  try {
    const files = await fs.readdir(dirPath, { withFileTypes: true });

    for (const file of files) {
      const filePath = path.join(dirPath, file.name);

      if (file.isDirectory()) {
        size += await getDirSize(filePath);
      } else {
        const stats = await fs.stat(filePath);
        size += stats.size;
      }
    }
  } catch (error) {
    // Directory might not exist, return 0
    return 0;
  }

  return size;
}

async function generateBuildStats() {
  console.log('📊 Generating build statistics...');

  try {
    const distDir = path.join(__dirname, '../dist');
    const stats = {
      timestamp: new Date().toISOString(),
      totalSize: 0,
      breakdown: {}
    };

    // Calculate sizes for each subdirectory
    const subdirs = ['content', 'images', 'styles', 'templates'];

    for (const subdir of subdirs) {
      const subdirPath = path.join(distDir, subdir);
      const size = await getDirSize(subdirPath);
      stats.breakdown[subdir] = {
        size: size,
        formatted: formatBytes(size)
      };
      stats.totalSize += size;
    }

    stats.totalSizeFormatted = formatBytes(stats.totalSize);

    // Write stats to file
    const statsPath = path.join(distDir, 'build-stats.json');
    await fs.writeFile(statsPath, JSON.stringify(stats, null, 2), 'utf-8');

    console.log('✓ Build statistics generated:');
    console.log(`  Total size: ${stats.totalSizeFormatted}`);
    Object.entries(stats.breakdown).forEach(([dir, data]) => {
      if (data.size > 0) {
        console.log(`  ${dir}: ${data.formatted}`);
      }
    });

  } catch (error) {
    console.error('Error generating build stats:', error.message);
    // Don't fail the build for stats generation issues
  }
}

async function main() {
  const startTime = Date.now();

  try {
    console.log('🚀 Starting build process...\n');

    // Step 1: Clean output directory
    await cleanDist();

    // Step 2: Copy static files
    await copyStaticFiles();

    console.log('\n📦 Processing content and assets...');

    // Step 3: Run content and image tasks in parallel (they don't depend on each other)
    const parallelTasks = [
      compileMarkdown(),
      optimizeImages()
    ];

    await Promise.all(parallelTasks.map(async (task, index) => {
      try {
        await task;
      } catch (error) {
        const taskNames = ['Markdown compilation', 'Image optimization'];
        console.error(`✗ ${taskNames[index]} failed:`, error.message);
        throw error;
      }
    }));

    console.log('\n🎨 Processing styles...');

    // Step 4: Bundle CSS (depends on CSS source files)
    await bundleCSS();

    // Step 5: Generate critical CSS (depends on bundled CSS and compiled content)
    await generateCriticalCSS();

    // Step 6: Generate build statistics
    await generateBuildStats();

    const endTime = Date.now();
    const buildTime = ((endTime - startTime) / 1000).toFixed(2);

    console.log(`\n🎉 Build completed successfully in ${buildTime}s`);

  } catch (error) {
    const endTime = Date.now();
    const buildTime = ((endTime - startTime) / 1000).toFixed(2);

    console.error(`\n💥 Build failed after ${buildTime}s:`, error.message);
    console.error('\nStack trace:');
    console.error(error.stack);

    process.exit(1);
  }
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

if (require.main === module) {
  main();
}