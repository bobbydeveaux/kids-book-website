import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import {
  parseMarkdownFile,
  validateContent,
  renderTemplate,
  validateHtmlStructure,
  extractLinks,
  isInternalLink
} from '../../build/compile-markdown.js';
import fs from 'fs/promises';
import path from 'path';

describe('compile-markdown', () => {
  describe('parseMarkdownFile', () => {
    beforeEach(async () => {
      // Create test fixtures directory
      await fs.mkdir('tests/fixtures', { recursive: true });

      // Create valid breed markdown file
      await fs.writeFile('tests/fixtures/valid-breed.md', `---
id: test-breed
name: Test Breed
slug: test-breed
height: 36 inches
weight: 400 lbs
origin: Test Country
temperament: Gentle
---

# Test Breed

This is a test breed description.

## Characteristics

Test characteristics here.
`);

      // Create invalid frontmatter file
      await fs.writeFile('tests/fixtures/invalid-frontmatter.md', `---
id: test-breed
name: Test Breed
invalid-yaml: [unclosed list
---

Content here.
`);

      // Create file without frontmatter
      await fs.writeFile('tests/fixtures/no-frontmatter.md', `# Just Markdown

This file has no frontmatter.
`);
    });

    afterEach(async () => {
      // Clean up test fixtures
      try {
        await fs.rm('tests/fixtures', { recursive: true, force: true });
      } catch (error) {
        // Ignore cleanup errors
      }
    });

    it('should parse valid markdown file with frontmatter', async () => {
      const testFile = 'tests/fixtures/valid-breed.md';
      const result = await parseMarkdownFile(testFile);

      expect(result.frontmatter).toHaveProperty('id');
      expect(result.frontmatter).toHaveProperty('name');
      expect(result.body).toBeTruthy();
      expect(result.html).toContain('<h1>');
    });

    it('should throw error for invalid YAML frontmatter', async () => {
      const testFile = 'tests/fixtures/invalid-frontmatter.md';
      await expect(parseMarkdownFile(testFile)).rejects.toThrow();
    });

    it('should handle markdown with no frontmatter', async () => {
      const testFile = 'tests/fixtures/no-frontmatter.md';
      const result = await parseMarkdownFile(testFile);

      expect(result.frontmatter).toEqual({});
      expect(result.html).toBeTruthy();
    });

    it('should throw error for non-existent file', async () => {
      const testFile = 'tests/fixtures/non-existent.md';
      await expect(parseMarkdownFile(testFile)).rejects.toThrow();
    });
  });

  describe('validateContent', () => {
    it('should pass validation for valid breed content', () => {
      const content = {
        frontmatter: {
          id: 'test-breed',
          name: 'Test Breed',
          slug: 'test-breed',
          height: '36 inches',
          weight: '400 lbs',
        },
      };

      expect(() => validateContent(content, 'breed')).not.toThrow();
    });

    it('should throw ValidationError for missing required field', () => {
      const content = {
        frontmatter: {
          id: 'test-breed',
          // Missing 'name' field
          slug: 'test-breed',
        },
      };

      expect(() => validateContent(content, 'breed')).toThrow('Required field is missing');
    });

    it('should validate image file references exist', () => {
      const content = {
        frontmatter: {
          id: 'test-breed',
          name: 'Test Breed',
          slug: 'test-breed',
          height: '36 inches',
          weight: '400 lbs',
          images: ['non-existent-image.jpg'],
        },
      };

      expect(() => validateContent(content, 'breed')).toThrow('Referenced image file does not exist');
    });

    it('should pass validation for valid care content', () => {
      const content = {
        frontmatter: {
          id: 'test-care',
          title: 'Test Care Guide',
          slug: 'test-care',
          category: 'feeding',
        },
      };

      expect(() => validateContent(content, 'care')).not.toThrow();
    });

    it('should pass validation for valid fact content', () => {
      const content = {
        frontmatter: {
          id: 'test-fact',
          title: 'Test Fact',
          slug: 'test-fact',
        },
      };

      expect(() => validateContent(content, 'fact')).not.toThrow();
    });

    it('should throw error for unknown content type', () => {
      const content = { frontmatter: {} };
      expect(() => validateContent(content, 'unknown')).toThrow('Unknown content type');
    });
  });

  describe('renderTemplate', () => {
    it('should inject content data into template', () => {
      const template = '<h1>{{title}}</h1><p>{{description}}</p>';
      const data = { title: 'Test Title', description: 'Test description' };

      const result = renderTemplate(template, data);

      expect(result).toContain('<h1>Test Title</h1>');
      expect(result).toContain('<p>Test description</p>');
    });

    it('should handle missing data gracefully', () => {
      const template = '<h1>{{title}}</h1>';
      const data = {}; // Missing title

      const result = renderTemplate(template, data);

      expect(result).toContain('<h1></h1>');
    });

    it('should preserve non-template content', () => {
      const template = '<div class="test">{{content}}</div>';
      const data = { content: 'Test content' };

      const result = renderTemplate(template, data);

      expect(result).toBe('<div class="test">Test content</div>');
    });
  });

  describe('validateHtmlStructure', () => {
    it('should pass validation for valid HTML', () => {
      const html = `<!DOCTYPE html>
<html lang="en">
<head><title>Test</title></head>
<body>
  <header></header>
  <main></main>
  <footer></footer>
</body>
</html>`;

      const result = validateHtmlStructure(html);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should detect missing DOCTYPE', () => {
      const html = '<html><head><title>Test</title></head><body></body></html>';

      const result = validateHtmlStructure(html);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Missing DOCTYPE declaration');
    });

    it('should detect missing lang attribute', () => {
      const html = '<!DOCTYPE html><html><head><title>Test</title></head><body></body></html>';

      const result = validateHtmlStructure(html);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Missing or invalid lang attribute on html element');
    });

    it('should detect missing title', () => {
      const html = '<!DOCTYPE html><html lang="en"><head></head><body></body></html>';

      const result = validateHtmlStructure(html);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Missing title element');
    });

    it('should warn about missing semantic elements', () => {
      const html = '<!DOCTYPE html><html lang="en"><head><title>Test</title></head><body></body></html>';

      const result = validateHtmlStructure(html);
      expect(result.warnings).toContain('Missing semantic element: header');
      expect(result.warnings).toContain('Missing semantic element: main');
      expect(result.warnings).toContain('Missing semantic element: footer');
    });
  });

  describe('extractLinks', () => {
    it('should extract all href links from HTML', () => {
      const html = `
        <a href="/home">Home</a>
        <a href="./about.html">About</a>
        <a href="https://example.com">External</a>
        <link rel="stylesheet" href="/css/styles.css">
      `;

      const links = extractLinks(html);
      expect(links).toContain('/home');
      expect(links).toContain('./about.html');
      expect(links).toContain('https://example.com');
      expect(links).toContain('/css/styles.css');
    });

    it('should return empty array for HTML with no links', () => {
      const html = '<p>No links here</p>';
      const links = extractLinks(html);
      expect(links).toEqual([]);
    });
  });

  describe('isInternalLink', () => {
    it('should identify absolute internal links', () => {
      expect(isInternalLink('/home')).toBe(true);
      expect(isInternalLink('/breeds/miniature')).toBe(true);
    });

    it('should identify relative internal links', () => {
      expect(isInternalLink('./about.html')).toBe(true);
      expect(isInternalLink('../care.html')).toBe(true);
    });

    it('should identify external links', () => {
      expect(isInternalLink('https://example.com')).toBe(false);
      expect(isInternalLink('http://test.com')).toBe(false);
      expect(isInternalLink('mailto:test@example.com')).toBe(false);
    });
  });
});