const fs = require('fs').promises;
const path = require('path');
const MarkdownIt = require('markdown-it');
const matter = require('gray-matter');

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: false
});

async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }
}

async function compileMarkdown(inputDir, outputDir) {
  console.log(`Compiling Markdown files from ${inputDir} to ${outputDir}`);

  try {
    await ensureDir(outputDir);

    const files = await fs.readdir(inputDir, { withFileTypes: true });
    let processedCount = 0;

    for (const file of files) {
      const inputPath = path.join(inputDir, file.name);

      if (file.isDirectory()) {
        // Recursively process subdirectories
        const subOutputDir = path.join(outputDir, file.name);
        await compileMarkdown(inputPath, subOutputDir);
      } else if (file.name.endsWith('.md')) {
        try {
          const content = await fs.readFile(inputPath, 'utf-8');
          const { data: frontmatter, content: markdown } = matter(content);

          // Convert markdown to HTML
          const html = md.render(markdown);

          // Create output object with metadata and content
          const output = {
            metadata: frontmatter,
            html: html,
            slug: path.basename(file.name, '.md')
          };

          // Write HTML fragment
          const htmlOutputPath = path.join(outputDir, file.name.replace('.md', '.html'));
          await fs.writeFile(htmlOutputPath, html, 'utf-8');

          // Write metadata JSON
          const jsonOutputPath = path.join(outputDir, file.name.replace('.md', '.json'));
          await fs.writeFile(jsonOutputPath, JSON.stringify(output, null, 2), 'utf-8');

          processedCount++;
          console.log(`✓ Compiled: ${file.name}`);
        } catch (error) {
          console.error(`✗ Error compiling ${file.name}:`, error.message);
          throw error;
        }
      }
    }

    console.log(`✓ Compiled ${processedCount} Markdown files`);
  } catch (error) {
    console.error(`Error processing directory ${inputDir}:`, error.message);
    throw error;
  }
}

async function main() {
  const srcContentDir = path.join(__dirname, '../src/content');
  const distContentDir = path.join(__dirname, '../dist/content');

  try {
    await compileMarkdown(srcContentDir, distContentDir);
    console.log('✓ Markdown compilation completed successfully');
  } catch (error) {
    console.error('✗ Markdown compilation failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { compileMarkdown };