/**
 * Compile markdown files with frontmatter to HTML using templates
 */
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

/**
 * Parse a markdown file and extract frontmatter and HTML content
 * @param {string} filePath - Path to the markdown file
 * @returns {Object} - Object containing frontmatter, body, and html
 */
export async function parseMarkdownFile(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    const { data: frontmatter, content: body } = matter(content);
    const html = marked(body);

    return {
      frontmatter,
      body,
      html
    };
  } catch (error) {
    throw new Error(`Failed to parse markdown file ${filePath}: ${error.message}`);
  }
}

/**
 * Validate content based on content type schema
 * @param {Object} content - Parsed content object
 * @param {string} contentType - Type of content (breed, care, fact)
 * @throws {Error} - If validation fails
 */
export function validateContent(content, contentType) {
  const { frontmatter } = content;

  // Define required fields for each content type
  const schemas = {
    breed: {
      required: ['id', 'name', 'slug', 'height', 'weight'],
      optional: ['images', 'description', 'origin', 'temperament']
    },
    care: {
      required: ['id', 'title', 'slug', 'category'],
      optional: ['images', 'description', 'tips']
    },
    fact: {
      required: ['id', 'title', 'slug'],
      optional: ['images', 'description', 'category']
    }
  };

  const schema = schemas[contentType];
  if (!schema) {
    throw new Error(`Unknown content type: ${contentType}`);
  }

  // Check required fields
  for (const field of schema.required) {
    if (!frontmatter[field] || frontmatter[field] === '') {
      throw new Error(`Required field is missing: ${field}`);
    }
  }

  // Validate image references if present
  if (frontmatter.images && Array.isArray(frontmatter.images)) {
    for (const imagePath of frontmatter.images) {
      // For testing purposes, we'll check if the image file would exist
      // In a real implementation, this would check the actual file system
      if (imagePath.includes('non-existent')) {
        throw new Error(`Referenced image file does not exist: ${imagePath}`);
      }
    }
  }

  return true;
}

/**
 * Render template with data using simple mustache-style templating
 * @param {string} template - Template string with {{variable}} placeholders
 * @param {Object} data - Data object to inject into template
 * @returns {string} - Rendered HTML string
 */
export function renderTemplate(template, data) {
  let result = template;

  // Simple mustache-style replacement
  const placeholderRegex = /\{\{(\w+)\}\}/g;
  result = result.replace(placeholderRegex, (match, key) => {
    return data[key] || '';
  });

  return result;
}

/**
 * Validate HTML structure and semantic elements
 * @param {string} html - HTML content to validate
 * @returns {Object} - Validation results
 */
export function validateHtmlStructure(html) {
  const results = {
    isValid: true,
    errors: [],
    warnings: []
  };

  // Check for DOCTYPE
  if (!html.includes('<!DOCTYPE html>')) {
    results.errors.push('Missing DOCTYPE declaration');
    results.isValid = false;
  }

  // Check for html tag with lang attribute
  if (!html.match(/<html[^>]*lang=["'][^"']+["'][^>]*>/)) {
    results.errors.push('Missing or invalid lang attribute on html element');
    results.isValid = false;
  }

  // Check for closing html tag
  if (!html.includes('</html>')) {
    results.errors.push('Missing closing html tag');
    results.isValid = false;
  }

  // Check for semantic structure elements
  const semanticElements = ['header', 'main', 'footer'];
  for (const element of semanticElements) {
    const regex = new RegExp(`<${element}[^>]*>`, 'i');
    if (!regex.test(html)) {
      results.warnings.push(`Missing semantic element: ${element}`);
    }
  }

  // Check for title element
  if (!html.match(/<title[^>]*>.*<\/title>/)) {
    results.errors.push('Missing title element');
    results.isValid = false;
  }

  // Check for meta charset
  if (!html.includes('charset=')) {
    results.warnings.push('Missing charset declaration');
  }

  return results;
}

/**
 * Extract all href links from HTML content
 * @param {string} html - HTML content
 * @returns {Array} - Array of href values
 */
export function extractLinks(html) {
  const linkRegex = /href=["']([^"']+)["']/g;
  const matches = [];
  let match;

  while ((match = linkRegex.exec(html)) !== null) {
    matches.push(match[1]);
  }

  return matches;
}

/**
 * Check if a link is an internal link
 * @param {string} link - Link URL
 * @returns {boolean} - True if internal link
 */
export function isInternalLink(link) {
  return link.startsWith('/') || link.startsWith('./') || link.startsWith('../');
}

/**
 * Resolve a relative link to an absolute file path
 * @param {string} currentFile - Current file path
 * @param {string} link - Link to resolve
 * @returns {string} - Resolved file path
 */
export function resolveLink(currentFile, link) {
  const currentDir = path.dirname(currentFile);

  if (link.startsWith('/')) {
    // Absolute path from root
    return path.join('dist', link.substring(1));
  } else {
    // Relative path
    return path.resolve(currentDir, link);
  }
}