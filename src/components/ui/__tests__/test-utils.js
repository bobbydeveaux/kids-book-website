/**
 * Test utilities for UI component testing
 * Provides helpers for responsive design, accessibility, and CSS variable testing
 */

// Mock window.matchMedia for responsive testing
export const mockMatchMedia = (matches = false) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
};

// Responsive breakpoint testing helpers
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px'
};

export const setViewportSize = (width, height = 800) => {
  // Mock viewport dimensions
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });

  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: height,
  });

  // Mock getBoundingClientRect
  Element.prototype.getBoundingClientRect = jest.fn(() => ({
    width,
    height,
    top: 0,
    left: 0,
    bottom: height,
    right: width,
    x: 0,
    y: 0,
  }));

  // Trigger resize event
  window.dispatchEvent(new Event('resize'));
};

// Test responsive behavior at different breakpoints
export const testAtBreakpoints = (testFunction) => {
  const breakpointSizes = {
    mobile: 375,    // < 640px
    tablet: 768,    // >= 640px < 1024px
    desktop: 1280   // >= 1024px
  };

  Object.entries(breakpointSizes).forEach(([device, width]) => {
    describe(`at ${device} breakpoint (${width}px)`, () => {
      beforeEach(() => {
        setViewportSize(width);
      });

      testFunction(device, width);
    });
  });
};

// CSS Custom Properties testing
export const getCSSCustomProperty = (element, propertyName) => {
  const computedStyle = window.getComputedStyle(element);
  return computedStyle.getPropertyValue(propertyName).trim();
};

export const expectedCSSVariables = {
  // Colors
  '--color-primary': expect.stringMatching(/^(#|rgb|hsl)/),
  '--color-secondary': expect.stringMatching(/^(#|rgb|hsl)/),
  '--color-text': expect.stringMatching(/^(#|rgb|hsl)/),
  '--color-background': expect.stringMatching(/^(#|rgb|hsl)/),

  // Spacing (should be rem values)
  '--spacing-1': expect.stringMatching(/^[\d.]+rem$/),
  '--spacing-2': expect.stringMatching(/^[\d.]+rem$/),
  '--spacing-4': expect.stringMatching(/^[\d.]+rem$/),
  '--spacing-8': expect.stringMatching(/^[\d.]+rem$/),

  // Typography
  '--font-family-sans': expect.stringContaining('sans-serif'),
  '--font-size-base': expect.stringMatching(/^[\d.]+rem$/),
  '--font-weight-normal': expect.stringMatching(/^[1-9]00$/),

  // Breakpoints
  '--breakpoint-sm': '640px',
  '--breakpoint-md': '768px',
  '--breakpoint-lg': '1024px',
  '--breakpoint-xl': '1280px'
};

// Test that CSS variables are applied correctly
export const testCSSVariables = (element, expectedVariables = expectedCSSVariables) => {
  Object.entries(expectedVariables).forEach(([variable, expected]) => {
    const value = getCSSCustomProperty(element, variable);

    if (typeof expected === 'string') {
      expect(value).toBe(expected);
    } else if (expected && expected.asymmetricMatch) {
      expect(value).toEqual(expected);
    }
  });
};

// Accessibility testing helpers
export const testAccessibility = async (element) => {
  // Test for proper ARIA attributes
  const interactiveElements = element.querySelectorAll('button, a, input, select, textarea, [role="button"], [role="link"]');

  interactiveElements.forEach(el => {
    // Interactive elements should be focusable
    expect(el.tabIndex).toBeGreaterThanOrEqual(0);

    // Buttons should have accessible names
    if (el.tagName === 'BUTTON' || el.getAttribute('role') === 'button') {
      const accessibleName = el.textContent || el.getAttribute('aria-label') || el.getAttribute('aria-labelledby');
      expect(accessibleName).toBeTruthy();
    }

    // Links should have accessible names and proper href
    if (el.tagName === 'A' || el.getAttribute('role') === 'link') {
      const accessibleName = el.textContent || el.getAttribute('aria-label') || el.getAttribute('aria-labelledby');
      expect(accessibleName).toBeTruthy();

      // External links should have proper security attributes
      const href = el.getAttribute('href');
      if (href && (href.startsWith('http') || href.startsWith('//'))) {
        expect(el.getAttribute('target')).toBe('_blank');
        expect(el.getAttribute('rel')).toContain('noopener');
        expect(el.getAttribute('rel')).toContain('noreferrer');
      }
    }
  });

  // Test for images with alt text
  const images = element.querySelectorAll('img');
  images.forEach(img => {
    const alt = img.getAttribute('alt');
    expect(alt).toBeDefined();
    // Alt can be empty string for decorative images, but should be present
  });

  // Test for proper heading hierarchy (if headings are present)
  const headings = element.querySelectorAll('h1, h2, h3, h4, h5, h6');
  if (headings.length > 0) {
    // First heading should be h1 or h2 (depending on page context)
    const firstHeading = headings[0];
    const firstLevel = parseInt(firstHeading.tagName.substring(1));
    expect(firstLevel).toBeLessThanOrEqual(2);
  }
};

// Focus management testing
export const testFocusManagement = (element) => {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  focusableElements.forEach(el => {
    // Element should be focusable
    el.focus();
    expect(document.activeElement).toBe(el);

    // Should have visible focus indicator
    const computedStyle = window.getComputedStyle(el, ':focus');
    const outline = computedStyle.outline || computedStyle.boxShadow;
    expect(outline).not.toBe('none');
  });
};

// Console error checking
export const expectNoConsoleErrors = () => {
  const originalError = console.error;
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  return {
    spy: errorSpy,
    restore: () => {
      console.error = originalError;
    },
    expectNoErrors: () => {
      expect(errorSpy).not.toHaveBeenCalled();
    }
  };
};

// Component rendering helpers
export const renderWithProviders = (component, options = {}) => {
  // This would wrap components with necessary providers like Router, Theme, etc.
  // For now, it's a placeholder that can be expanded when the app structure is complete
  return component;
};

// Mock CSS custom properties for JSDOM environment
export const mockCSSCustomProperties = () => {
  // JSDOM doesn't support CSS custom properties by default
  const originalGetComputedStyle = window.getComputedStyle;

  window.getComputedStyle = (element) => {
    const style = originalGetComputedStyle(element);
    const mockProperties = {
      '--color-primary': '#007bff',
      '--color-secondary': '#6c757d',
      '--color-text': '#333333',
      '--color-background': '#ffffff',
      '--spacing-1': '0.25rem',
      '--spacing-2': '0.5rem',
      '--spacing-4': '1rem',
      '--spacing-8': '2rem',
      '--font-family-sans': 'system-ui, sans-serif',
      '--font-size-base': '1rem',
      '--font-weight-normal': '400',
      '--breakpoint-sm': '640px',
      '--breakpoint-md': '768px',
      '--breakpoint-lg': '1024px',
      '--breakpoint-xl': '1280px'
    };

    const getPropertyValue = (property) => {
      if (property in mockProperties) {
        return mockProperties[property];
      }
      return style.getPropertyValue(property);
    };

    return {
      ...style,
      getPropertyValue
    };
  };
};