#!/usr/bin/env node

/**
 * Markdown Compilation Script for Donkey Website
 *
 * This script processes all .md files from src/content/ recursively,
 * parses frontmatter for metadata extraction, and converts markdown
 * to HTML with GitHub Flavored Markdown support.
 *
 * Requirements:
 * - Read all markdown files from src/content/ recursively
 * - Parse frontmatter and extract as JSON metadata
 * - Convert markdown to HTML with GFM support
 * - Output HTML fragments to dist/content/ preserving directory structure
 * - Log error messages for invalid markdown or missing frontmatter
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const MarkdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');

// Configure markdown-it with GitHub Flavored Markdown features
const md = new MarkdownIt({
  html: true,         // Enable HTML tags in source
  linkify: true,      // Autoconvert URL-like text to links
  typographer: true,  // Enable some language-neutral replacement + quotes beautification
  breaks: false       // Convert '\n' in paragraphs into <br>
})
.use(markdownItAnchor, {
  permalink: markdownItAnchor.permalink.headerLink(),
  level: [1, 2, 3, 4]
});

// Constants
const SRC_DIR = path.join(process.cwd(), 'src', 'content');
const DIST_DIR = path.join(process.cwd(), 'dist', 'content');

/**
 * Recursively find all markdown files in a directory
 * @param {string} dir - Directory to search
 * @returns {Array<string>} Array of markdown file paths
 */
function findMarkdownFiles(dir) {
  let markdownFiles = [];

  try {
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const itemPath = path.join(dir, item);
      const stat = fs.statSync(itemPath);

      if (stat.isDirectory()) {
        // Recursively search subdirectories
        markdownFiles = markdownFiles.concat(findMarkdownFiles(itemPath));
      } else if (stat.isFile() && path.extname(item).toLowerCase() === '.md') {
        markdownFiles.push(itemPath);
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error.message);
  }

  return markdownFiles;
}

/**
 * Ensure directory exists, creating it if necessary
 * @param {string} dirPath - Directory path to create
 */
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
}

/**
 * Process a single markdown file
 * @param {string} filePath - Path to markdown file
 * @returns {Object} Result object with success status and details
 */
function processMarkdownFile(filePath) {
  try {
    // Read the markdown file
    const fileContent = fs.readFileSync(filePath, 'utf8');

    // Parse frontmatter and content
    const parsed = matter(fileContent);
    const { data: frontmatter, content: markdownContent } = parsed;

    // Validate that frontmatter exists
    if (!frontmatter || Object.keys(frontmatter).length === 0) {
      console.warn(`Warning: No frontmatter found in ${filePath}`);
    }

    // Convert markdown to HTML
    const htmlContent = md.render(markdownContent);

    // Calculate output path (preserve directory structure)
    const relativePath = path.relative(SRC_DIR, filePath);
    const outputPath = path.join(DIST_DIR, relativePath.replace(/\.md$/, '.html'));

    // Ensure output directory exists
    const outputDir = path.dirname(outputPath);
    ensureDirectoryExists(outputDir);

    // Create HTML structure with metadata
    const htmlFragment = {
      metadata: frontmatter,
      content: htmlContent,
      generatedAt: new Date().toISOString(),
      sourceFile: relativePath
    };

    // Write HTML fragment to file
    fs.writeFileSync(outputPath, JSON.stringify(htmlFragment, null, 2));

    return {
      success: true,
      inputPath: filePath,
      outputPath: outputPath,
      metadata: frontmatter
    };

  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return {
      success: false,
      inputPath: filePath,
      error: error.message
    };
  }
}

/**
 * Main compilation function
 */
async function compileMarkdown() {
  console.log('Starting markdown compilation...');
  console.log(`Source directory: ${SRC_DIR}`);
  console.log(`Output directory: ${DIST_DIR}`);

  // Check if source directory exists
  if (!fs.existsSync(SRC_DIR)) {
    console.error(`Error: Source directory does not exist: ${SRC_DIR}`);
    console.log('Please create the src/content/ directory and add markdown files.');
    process.exit(1);
  }

  // Ensure output directory exists
  ensureDirectoryExists(DIST_DIR);

  // Find all markdown files
  const markdownFiles = findMarkdownFiles(SRC_DIR);

  if (markdownFiles.length === 0) {
    console.log('No markdown files found in src/content/');
    console.log('Create some .md files in src/content/ to get started.');
    return;
  }

  console.log(`Found ${markdownFiles.length} markdown file(s) to process:`);
  markdownFiles.forEach(file => {
    console.log(`  - ${path.relative(SRC_DIR, file)}`);
  });

  // Process each markdown file
  const results = [];
  let successCount = 0;
  let errorCount = 0;

  for (const filePath of markdownFiles) {
    console.log(`\\nProcessing: ${path.relative(SRC_DIR, filePath)}`);
    const result = processMarkdownFile(filePath);
    results.push(result);

    if (result.success) {
      successCount++;
      console.log(`  ✅ Successfully compiled to: ${path.relative(process.cwd(), result.outputPath)}`);
    } else {
      errorCount++;
      console.log(`  ❌ Failed to compile: ${result.error}`);
    }
  }

  // Summary
  console.log(`\\n📊 Compilation Summary:`);
  console.log(`  Total files: ${markdownFiles.length}`);
  console.log(`  Successful: ${successCount}`);
  console.log(`  Failed: ${errorCount}`);

  if (errorCount > 0) {
    console.log('\\n⚠️  Some files failed to compile. Please check the error messages above.');
    process.exit(1);
  } else {
    console.log('\\n🎉 All markdown files compiled successfully!');
  }
}

// Run the compilation
if (require.main === module) {
  compileMarkdown().catch(error => {
    console.error('Fatal error during compilation:', error);
    process.exit(1);
  });
}

module.exports = { compileMarkdown, processMarkdownFile, findMarkdownFiles };