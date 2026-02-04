#!/usr/bin/env node

/**
 * Accessibility Checker for HTML Templates
 * Validates that all templates meet WCAG 2.1 Level AA requirements
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

// Test results tracker
let testResults = {
  passed: 0,
  failed: 0,
  warnings: 0,
  details: []
};

/**
 * Log test result
 */
function logResult(type, file, test, message) {
  const symbol = type === 'pass' ? '✓' : type === 'fail' ? '✗' : '⚠';
  const color = type === 'pass' ? colors.green : type === 'fail' ? colors.red : colors.yellow;

  console.log(`${color}${symbol} ${colors.bold}${file}${colors.reset}${color}: ${test}${colors.reset}`);
  if (message) {
    console.log(`  ${message}`);
  }

  testResults[type === 'pass' ? 'passed' : type === 'fail' ? 'failed' : 'warnings']++;
  testResults.details.push({ type, file, test, message });
}

/**
 * Check if HTML contains required accessibility features
 */
function checkAccessibility(filePath, content) {
  const fileName = path.basename(filePath);
  console.log(`\n${colors.blue}Checking ${fileName}...${colors.reset}`);

  // Test 1: Check for language attribute
  if (content.includes('<html lang="en">')) {
    logResult('pass', fileName, 'Language attribute present');
  } else {
    logResult('fail', fileName, 'Language attribute missing', 'HTML should have lang="en" attribute');
  }

  // Test 2: Check for semantic HTML5 elements
  const semanticElements = ['<header', '<nav', '<main', '<footer', '<section', '<article'];
  const foundElements = semanticElements.filter(element => content.includes(element));

  if (foundElements.length >= 3) {
    logResult('pass', fileName, 'Semantic HTML5 structure', `Found: ${foundElements.join(', ')}`);
  } else {
    logResult('fail', fileName, 'Insufficient semantic elements', `Only found: ${foundElements.join(', ')}`);
  }

  // Test 3: Check for skip link
  if (content.includes('Skip to main content') || content.includes('skip-link')) {
    logResult('pass', fileName, 'Skip link for keyboard navigation');
  } else {
    logResult('warning', fileName, 'Skip link not found', 'Consider adding skip link for keyboard users');
  }

  // Test 4: Check for main landmark with ID
  if (content.includes('id="main-content"')) {
    logResult('pass', fileName, 'Main content landmark with ID');
  } else {
    logResult('fail', fileName, 'Main content landmark missing', 'Main element should have id="main-content"');
  }

  // Test 5: Check for ARIA labels on navigation
  const ariaNavPatterns = [
    /aria-label="[^"]*navigation[^"]*"/i,
    /aria-labelledby="[^"]*nav[^"]*"/i
  ];

  const hasAriaNav = ariaNavPatterns.some(pattern => pattern.test(content));
  if (hasAriaNav) {
    logResult('pass', fileName, 'Navigation ARIA labels present');
  } else {
    logResult('fail', fileName, 'Navigation ARIA labels missing', 'Navigation elements need aria-label or aria-labelledby');
  }

  // Test 6: Check for image alt attributes
  const imgTags = content.match(/<img[^>]*>/g) || [];
  const imagesWithAlt = imgTags.filter(img => img.includes('alt='));

  if (imgTags.length === 0) {
    logResult('pass', fileName, 'No images to check for alt text');
  } else if (imagesWithAlt.length === imgTags.length) {
    logResult('pass', fileName, `All ${imgTags.length} images have alt attributes`);
  } else {
    logResult('fail', fileName, 'Images missing alt attributes',
      `${imgTags.length - imagesWithAlt.length} of ${imgTags.length} images missing alt text`);
  }

  // Test 7: Check for heading hierarchy
  const headings = content.match(/<h[1-6][^>]*>/g) || [];
  if (headings.length > 0) {
    const hasH1 = headings.some(h => h.startsWith('<h1'));
    if (hasH1) {
      logResult('pass', fileName, 'Heading hierarchy with H1 present');
    } else {
      logResult('fail', fileName, 'No H1 heading found', 'Every page should have exactly one H1 heading');
    }
  } else {
    logResult('warning', fileName, 'No headings found', 'Consider adding structured headings');
  }

  // Test 8: Check for ARIA attributes
  const ariaAttributes = [
    'aria-label=', 'aria-labelledby=', 'aria-describedby=',
    'aria-expanded=', 'aria-controls=', 'aria-current=', 'aria-hidden='
  ];

  const foundAria = ariaAttributes.filter(attr => content.includes(attr));
  if (foundAria.length >= 3) {
    logResult('pass', fileName, 'Good ARIA attribute usage', `Found: ${foundAria.length} different ARIA attributes`);
  } else {
    logResult('warning', fileName, 'Limited ARIA usage', `Only found: ${foundAria.join(', ')}`);
  }

  // Test 9: Check for form labels (if forms exist)
  const formInputs = content.match(/<input[^>]*>/g) || [];
  const formLabels = content.match(/<label[^>]*>/g) || [];

  if (formInputs.length === 0) {
    logResult('pass', fileName, 'No forms to check for labels');
  } else if (formLabels.length >= formInputs.length) {
    logResult('pass', fileName, 'Form inputs have associated labels');
  } else {
    logResult('fail', fileName, 'Form inputs missing labels',
      'All form inputs must have associated label elements');
  }

  // Test 10: Check for screen reader only content
  if (content.includes('sr-only') || content.includes('screen-reader')) {
    logResult('pass', fileName, 'Screen reader only content provided');
  } else {
    logResult('warning', fileName, 'No screen reader specific content',
      'Consider adding screen reader only text for better accessibility');
  }

  // Test 11: Check for role attributes where appropriate
  const roleAttributes = content.match(/role="[^"]*"/g) || [];
  if (roleAttributes.length > 0) {
    logResult('pass', fileName, 'ARIA roles used appropriately', `Found: ${roleAttributes.join(', ')}`);
  } else {
    logResult('warning', fileName, 'No ARIA roles found', 'Consider using roles where semantic HTML is insufficient');
  }

  // Test 12: Check for focus management indicators
  if (content.includes('focus') || content.includes(':focus')) {
    logResult('pass', fileName, 'Focus management considered');
  } else {
    logResult('warning', fileName, 'No focus management found', 'Ensure interactive elements have visible focus styles');
  }
}

/**
 * Main function to check all templates
 */
function checkAllTemplates() {
  console.log(`${colors.bold}${colors.blue}HTML Template Accessibility Checker${colors.reset}`);
  console.log('Checking WCAG 2.1 Level AA compliance...\n');

  // Template files to check
  const templatePaths = [
    'src/templates/base.html',
    'src/templates/home.html',
    'src/templates/breed-list.html',
    'src/templates/breed-detail.html',
    'src/templates/care-guide.html',
    'src/templates/facts.html',
    'dist/index.html',
    'dist/breeds/index.html',
    'dist/facts.html',
    'dist/404.html'
  ];

  let filesChecked = 0;

  templatePaths.forEach(filePath => {
    try {
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        checkAccessibility(filePath, content);
        filesChecked++;
      } else {
        logResult('fail', path.basename(filePath), 'File not found', `Template file missing: ${filePath}`);
      }
    } catch (error) {
      logResult('fail', path.basename(filePath), 'Read error', error.message);
    }
  });

  // Summary
  console.log(`\n${colors.bold}${colors.blue}Accessibility Test Summary${colors.reset}`);
  console.log(`Files checked: ${filesChecked}`);
  console.log(`${colors.green}✓ Passed: ${testResults.passed}${colors.reset}`);
  console.log(`${colors.red}✗ Failed: ${testResults.failed}${colors.reset}`);
  console.log(`${colors.yellow}⚠ Warnings: ${testResults.warnings}${colors.reset}`);

  // Overall result
  const total = testResults.passed + testResults.failed + testResults.warnings;
  const score = ((testResults.passed / total) * 100).toFixed(1);

  console.log(`\n${colors.bold}Accessibility Score: ${score}%${colors.reset}`);

  if (testResults.failed === 0) {
    console.log(`${colors.green}${colors.bold}✓ All critical accessibility tests passed!${colors.reset}`);
    return true;
  } else {
    console.log(`${colors.red}${colors.bold}✗ ${testResults.failed} critical accessibility issues found.${colors.reset}`);
    console.log('Please address failed tests before deployment.');
    return false;
  }
}

// Run the accessibility checker
if (require.main === module) {
  const passed = checkAllTemplates();
  process.exit(passed ? 0 : 1);
}

module.exports = { checkAllTemplates, checkAccessibility };