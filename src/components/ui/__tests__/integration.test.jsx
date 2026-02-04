/**
 * Integration tests for UI Component Library
 * Tests component interaction, design system consistency, and accessibility
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Import test utilities
import {
  mockMatchMedia,
  mockCSSCustomProperties,
  testAtBreakpoints,
  testCSSVariables,
  testAccessibility,
  testFocusManagement,
  expectNoConsoleErrors,
  expectedCSSVariables
} from './test-utils';

// Import components (these will be available once dependency tasks are completed)
// For now, we'll create mock components to test the framework
const MockContainer = ({ children, size = 'lg', className = '', ...props }) => (
  <div
    className={`container container--${size} ${className}`}
    data-testid="container"
    {...props}
  >
    {children}
  </div>
);

const MockGrid = ({ children, cols = 1, gap = 'md', className = '', ...props }) => (
  <div
    className={`grid grid--cols-${cols} grid--gap-${gap} ${className}`}
    data-testid="grid"
    style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gap: `var(--spacing-${gap === 'sm' ? '2' : gap === 'lg' ? '8' : '4'})`
    }}
    {...props}
  >
    {children}
  </div>
);

const MockCard = ({ children, hover = false, as = 'div', className = '', ...props }) => {
  const Component = as;
  return (
    <Component
      className={`card ${hover ? 'card--hover' : ''} ${className}`}
      data-testid="card"
      {...props}
    >
      {children}
    </Component>
  );
};

const MockImage = ({
  src,
  alt,
  width,
  height,
  objectFit = 'cover',
  loading = 'lazy',
  fallbackSrc,
  className = '',
  ...props
}) => (
  <img
    src={src}
    alt={alt}
    width={width}
    height={height}
    loading={loading}
    className={`image image--${objectFit} ${className}`}
    data-testid="image"
    style={{ objectFit }}
    onError={(e) => {
      if (fallbackSrc && e.target.src !== fallbackSrc) {
        e.target.src = fallbackSrc;
      }
    }}
    {...props}
  />
);

const MockButton = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  as = 'button',
  className = '',
  ...props
}) => {
  const Component = as;
  return (
    <Component
      className={`button button--${variant} button--${size} ${loading ? 'button--loading' : ''} ${className}`}
      disabled={disabled || loading}
      data-testid="button"
      {...props}
    >
      {loading ? 'Loading...' : children}
    </Component>
  );
};

const MockLink = ({
  children,
  to,
  href,
  variant = 'primary',
  disabled = false,
  className = '',
  ...props
}) => {
  const isExternal = href && (href.startsWith('http') || href.startsWith('//'));

  if (to) {
    // Internal link (would use React Router Link)
    return (
      <a
        href={to}
        className={`link link--${variant} ${disabled ? 'link--disabled' : ''} ${className}`}
        data-testid="link"
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <a
      href={href}
      className={`link link--${variant} ${disabled ? 'link--disabled' : ''} ${className}`}
      data-testid="link"
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {children}
    </a>
  );
};

// Test component setup and teardown
describe('UI Component Library Integration Tests', () => {
  let consoleErrorChecker;

  beforeAll(() => {
    // Mock browser APIs for testing
    mockMatchMedia();
    mockCSSCustomProperties();
  });

  beforeEach(() => {
    // Set up console error checking
    consoleErrorChecker = expectNoConsoleErrors();
  });

  afterEach(() => {
    // Check for console errors after each test
    consoleErrorChecker.expectNoErrors();
    consoleErrorChecker.restore();
  });

  describe('Component Rendering', () => {
    it('renders all components without errors', () => {
      const { container } = render(
        <MockContainer>
          <MockGrid cols={2} gap="md">
            <MockCard hover>
              <MockImage
                src="/test-image.jpg"
                alt="Test image"
                width={300}
                height={200}
              />
              <h3>Card Title</h3>
              <p>Card content description</p>
              <MockButton variant="primary">Learn More</MockButton>
            </MockCard>
            <MockCard>
              <h3>Another Card</h3>
              <p>More content here</p>
              <MockLink to="/products" variant="secondary">
                View Products
              </MockLink>
            </MockCard>
          </MockGrid>
        </MockContainer>
      );

      // Verify all components are rendered
      expect(screen.getByTestId('container')).toBeInTheDocument();
      expect(screen.getByTestId('grid')).toBeInTheDocument();
      expect(screen.getAllByTestId('card')).toHaveLength(2);
      expect(screen.getByTestId('image')).toBeInTheDocument();
      expect(screen.getByTestId('button')).toBeInTheDocument();
      expect(screen.getByTestId('link')).toBeInTheDocument();

      // Verify no React warnings or errors in DOM
      expect(container.firstChild).toBeInTheDocument();
    });

    it('handles component composition correctly', () => {
      render(
        <MockContainer size="xl">
          <MockGrid cols={3}>
            {[1, 2, 3].map(i => (
              <MockCard key={i} hover as="article">
                <MockImage
                  src={`/image-${i}.jpg`}
                  alt={`Product ${i}`}
                  fallbackSrc="/placeholder.jpg"
                />
                <h3>Product {i}</h3>
                <MockButton size="sm" variant="outline">
                  Add to Cart
                </MockButton>
              </MockCard>
            ))}
          </MockGrid>
        </MockContainer>
      );

      // Verify correct composition
      const container = screen.getByTestId('container');
      const grid = screen.getByTestId('grid');
      const cards = screen.getAllByTestId('card');

      expect(container).toContainElement(grid);
      expect(grid).toContainElement(cards[0]);
      expect(cards).toHaveLength(3);

      // Verify semantic HTML
      cards.forEach(card => {
        expect(card.tagName).toBe('ARTICLE');
      });
    });
  });

  describe('CSS Variables Integration', () => {
    it('applies CSS custom properties correctly', () => {
      const { container } = render(
        <div style={{
          color: 'var(--color-text)',
          backgroundColor: 'var(--color-background)',
          padding: 'var(--spacing-4)',
          fontFamily: 'var(--font-family-sans)'
        }}>
          <MockButton variant="primary">Test Button</MockButton>
        </div>
      );

      // Test that CSS variables are available and have expected values
      testCSSVariables(container.firstChild, expectedCSSVariables);
    });

    it('uses spacing variables consistently', () => {
      const { container } = render(
        <MockGrid gap="lg">
          <div style={{ padding: 'var(--spacing-2)' }}>Item 1</div>
          <div style={{ margin: 'var(--spacing-4) var(--spacing-8)' }}>Item 2</div>
        </MockGrid>
      );

      const grid = screen.getByTestId('grid');

      // Verify grid uses spacing variables
      const gridStyle = window.getComputedStyle(grid);
      expect(gridStyle.gap).toContain('var(--spacing-8)');
    });

    it('applies color variables to components', () => {
      render(
        <div>
          <MockButton variant="primary" data-testid="primary-btn">Primary</MockButton>
          <MockButton variant="secondary" data-testid="secondary-btn">Secondary</MockButton>
          <MockLink variant="primary" to="/test">Primary Link</MockLink>
        </div>
      );

      // Components should have classes that use CSS variables
      const primaryBtn = screen.getByTestId('primary-btn');
      const secondaryBtn = screen.getByTestId('secondary-btn');

      expect(primaryBtn).toHaveClass('button--primary');
      expect(secondaryBtn).toHaveClass('button--secondary');
    });
  });

  describe('Responsive Behavior', () => {
    testAtBreakpoints((device, width) => {
      it(`renders correctly at ${device} breakpoint`, () => {
        const { container } = render(
          <MockContainer>
            <MockGrid cols={{ mobile: 1, tablet: 2, desktop: 3 }}>
              <MockCard>Card 1</MockCard>
              <MockCard>Card 2</MockCard>
              <MockCard>Card 3</MockCard>
            </MockGrid>
          </MockContainer>
        );

        const grid = screen.getByTestId('grid');

        // Verify responsive classes are applied
        if (device === 'mobile') {
          expect(grid).toHaveClass('grid--cols-1');
        } else if (device === 'tablet') {
          expect(grid).toHaveClass('grid--cols-2');
        } else {
          expect(grid).toHaveClass('grid--cols-3');
        }
      });

      it(`maintains component hierarchy at ${device}`, () => {
        render(
          <MockContainer size={device === 'mobile' ? 'sm' : 'lg'}>
            <MockCard>
              <MockImage src="/test.jpg" alt="Test" />
              <MockButton size={device === 'mobile' ? 'sm' : 'md'}>
                Button
              </MockButton>
            </MockCard>
          </MockContainer>
        );

        // Verify components are properly nested
        const container = screen.getByTestId('container');
        const card = screen.getByTestId('card');
        const button = screen.getByTestId('button');

        expect(container).toContainElement(card);
        expect(card).toContainElement(button);
      });
    });

    it('handles viewport changes gracefully', () => {
      const { rerender } = render(
        <MockGrid cols={{ mobile: 1, tablet: 2, desktop: 4 }}>
          <MockCard>Responsive Card</MockCard>
        </MockGrid>
      );

      // Component should re-render without errors after viewport changes
      rerender(
        <MockGrid cols={{ mobile: 1, tablet: 3, desktop: 6 }}>
          <MockCard>Updated Responsive Card</MockCard>
        </MockGrid>
      );

      expect(screen.getByTestId('grid')).toBeInTheDocument();
      expect(screen.getByText('Updated Responsive Card')).toBeInTheDocument();
    });
  });

  describe('Accessibility Compliance', () => {
    it('meets accessibility requirements for all components', async () => {
      const { container } = render(
        <MockContainer>
          <MockCard as="article">
            <MockImage
              src="/product.jpg"
              alt="Product showcase image"
              width={300}
              height={200}
            />
            <h2>Accessible Product Card</h2>
            <p>This is a description of the product with proper semantic structure.</p>
            <MockButton variant="primary">Add to Cart</MockButton>
            <MockLink to="/product/1">View Details</MockLink>
          </MockCard>
        </MockContainer>
      );

      // Test accessibility compliance
      await testAccessibility(container);
    });

    it('provides proper focus management', () => {
      const { container } = render(
        <div>
          <MockButton>First Button</MockButton>
          <MockLink to="/test">Test Link</MockLink>
          <MockButton disabled>Disabled Button</MockButton>
          <MockLink href="https://example.com">External Link</MockLink>
        </div>
      );

      testFocusManagement(container);
    });

    it('handles external links securely', () => {
      render(
        <div>
          <MockLink href="https://example.com">External Site</MockLink>
          <MockLink href="//other-domain.com">Protocol Relative</MockLink>
          <MockLink to="/internal">Internal Link</MockLink>
        </div>
      );

      const links = screen.getAllByTestId('link');
      const [external, protocolRelative, internal] = links;

      // External links should have security attributes
      expect(external).toHaveAttribute('target', '_blank');
      expect(external).toHaveAttribute('rel', 'noopener noreferrer');

      expect(protocolRelative).toHaveAttribute('target', '_blank');
      expect(protocolRelative).toHaveAttribute('rel', 'noopener noreferrer');

      // Internal links should not
      expect(internal).not.toHaveAttribute('target');
      expect(internal).not.toHaveAttribute('rel');
    });

    it('provides proper alt text for images', () => {
      render(
        <div>
          <MockImage src="/content.jpg" alt="Meaningful description" />
          <MockImage src="/decoration.jpg" alt="" /> {/* Decorative image */}
        </div>
      );

      const images = screen.getAllByTestId('image');
      const [contentImage, decorativeImage] = images;

      expect(contentImage).toHaveAttribute('alt', 'Meaningful description');
      expect(decorativeImage).toHaveAttribute('alt', '');
    });
  });

  describe('Component Variants and States', () => {
    it('renders all button variants correctly', () => {
      render(
        <div>
          <MockButton variant="primary" data-testid="primary">Primary</MockButton>
          <MockButton variant="secondary" data-testid="secondary">Secondary</MockButton>
          <MockButton variant="outline" data-testid="outline">Outline</MockButton>
        </div>
      );

      expect(screen.getByTestId('primary')).toHaveClass('button--primary');
      expect(screen.getByTestId('secondary')).toHaveClass('button--secondary');
      expect(screen.getByTestId('outline')).toHaveClass('button--outline');
    });

    it('handles button sizes correctly', () => {
      render(
        <div>
          <MockButton size="sm" data-testid="small">Small</MockButton>
          <MockButton size="md" data-testid="medium">Medium</MockButton>
          <MockButton size="lg" data-testid="large">Large</MockButton>
        </div>
      );

      expect(screen.getByTestId('small')).toHaveClass('button--sm');
      expect(screen.getByTestId('medium')).toHaveClass('button--md');
      expect(screen.getByTestId('large')).toHaveClass('button--lg');
    });

    it('handles disabled and loading states', () => {
      render(
        <div>
          <MockButton disabled data-testid="disabled">Disabled</MockButton>
          <MockButton loading data-testid="loading">Loading</MockButton>
        </div>
      );

      const disabledButton = screen.getByTestId('disabled');
      const loadingButton = screen.getByTestId('loading');

      expect(disabledButton).toBeDisabled();
      expect(loadingButton).toBeDisabled();
      expect(loadingButton).toHaveClass('button--loading');
      expect(loadingButton).toHaveTextContent('Loading...');
    });

    it('renders container sizes correctly', () => {
      render(
        <div>
          <MockContainer size="sm" data-testid="sm">Small</MockContainer>
          <MockContainer size="lg" data-testid="lg">Large</MockContainer>
          <MockContainer size="full" data-testid="full">Full</MockContainer>
        </div>
      );

      expect(screen.getByTestId('sm')).toHaveClass('container--sm');
      expect(screen.getByTestId('lg')).toHaveClass('container--lg');
      expect(screen.getByTestId('full')).toHaveClass('container--full');
    });
  });

  describe('Error Handling', () => {
    it('handles image load errors gracefully', () => {
      render(
        <MockImage
          src="/non-existent-image.jpg"
          alt="Test image"
          fallbackSrc="/fallback.jpg"
        />
      );

      const image = screen.getByTestId('image');

      // Simulate image load error
      const errorEvent = new Event('error');
      Object.defineProperty(errorEvent, 'target', {
        value: { src: '/non-existent-image.jpg' },
        enumerable: true
      });

      image.dispatchEvent(errorEvent);

      // Should still be in the document (error handling should work)
      expect(image).toBeInTheDocument();
    });

    it('handles missing props gracefully', () => {
      // Test components with minimal props
      const { container } = render(
        <div>
          <MockContainer>Basic container</MockContainer>
          <MockGrid>Basic grid</MockGrid>
          <MockCard>Basic card</MockCard>
          <MockButton>Basic button</MockButton>
        </div>
      );

      // Should render without errors
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('Performance Considerations', () => {
    it('applies lazy loading to images by default', () => {
      render(
        <MockImage src="/large-image.jpg" alt="Large image" />
      );

      const image = screen.getByTestId('image');
      expect(image).toHaveAttribute('loading', 'lazy');
    });

    it('allows eager loading when specified', () => {
      render(
        <MockImage
          src="/hero-image.jpg"
          alt="Hero image"
          loading="eager"
        />
      );

      const image = screen.getByTestId('image');
      expect(image).toHaveAttribute('loading', 'eager');
    });
  });

  describe('Design System Consistency', () => {
    it('maintains consistent spacing across components', () => {
      const { container } = render(
        <MockContainer>
          <MockGrid gap="md">
            <MockCard>
              <div style={{ padding: 'var(--spacing-4)' }}>
                Content with consistent spacing
              </div>
            </MockCard>
          </MockGrid>
        </MockContainer>
      );

      // All spacing should use the same variable system
      const elements = container.querySelectorAll('*');
      elements.forEach(el => {
        const style = window.getComputedStyle(el);
        // If the element uses custom properties, they should be from our system
        if (style.getPropertyValue('--spacing-4')) {
          expect(style.getPropertyValue('--spacing-4')).toBe('1rem');
        }
      });
    });

    it('uses consistent color palette', () => {
      render(
        <div>
          <MockButton variant="primary">Primary Action</MockButton>
          <MockLink variant="primary" to="/test">Primary Link</MockLink>
        </div>
      );

      // Components with same variant should use consistent color variables
      const button = screen.getByTestId('button');
      const link = screen.getByTestId('link');

      expect(button).toHaveClass('button--primary');
      expect(link).toHaveClass('link--primary');
    });
  });
});

// Additional test suite for component-specific integration scenarios
describe('Component Integration Scenarios', () => {
  beforeAll(() => {
    mockMatchMedia();
    mockCSSCustomProperties();
  });

  it('creates a complete product card layout', () => {
    render(
      <MockGrid cols={3} gap="lg">
        {[1, 2, 3].map(i => (
          <MockCard key={i} hover as="article">
            <MockImage
              src={`/product-${i}.jpg`}
              alt={`Product ${i} showcase`}
              width={300}
              height={300}
              objectFit="cover"
            />
            <div style={{ padding: 'var(--spacing-4)' }}>
              <h3>Product {i}</h3>
              <p>Beautiful lingerie piece with premium materials and comfortable fit.</p>
              <div style={{ marginTop: 'var(--spacing-4)' }}>
                <MockButton variant="primary" size="sm">
                  Quick View
                </MockButton>
                <MockButton variant="outline" size="sm" style={{ marginLeft: 'var(--spacing-2)' }}>
                  Add to Wishlist
                </MockButton>
              </div>
            </div>
          </MockCard>
        ))}
      </MockGrid>
    );

    // Verify complete layout renders
    expect(screen.getAllByTestId('card')).toHaveLength(3);
    expect(screen.getAllByTestId('image')).toHaveLength(3);
    expect(screen.getAllByTestId('button')).toHaveLength(6); // 2 buttons per card

    // Verify semantic structure
    const cards = screen.getAllByTestId('card');
    cards.forEach((card, index) => {
      expect(card.tagName).toBe('ARTICLE');
      expect(card).toHaveClass('card--hover');
    });
  });

  it('creates a navigation layout', () => {
    render(
      <MockContainer>
        <nav>
          <MockGrid cols={4} gap="md">
            <MockLink to="/" variant="primary">Home</MockLink>
            <MockLink to="/products" variant="primary">Products</MockLink>
            <MockLink to="/about" variant="primary">About</MockLink>
            <MockLink to="/contact" variant="primary">Contact</MockLink>
          </MockGrid>
        </nav>
      </MockContainer>
    );

    // Verify navigation structure
    const nav = screen.getByRole('navigation');
    const links = screen.getAllByTestId('link');

    expect(nav).toBeInTheDocument();
    expect(links).toHaveLength(4);
    links.forEach(link => {
      expect(link).toHaveClass('link--primary');
    });
  });

  it('handles complex nested layouts', () => {
    render(
      <MockContainer size="xl">
        <MockGrid cols={2} gap="xl">
          <MockCard>
            <h2>Featured Products</h2>
            <MockGrid cols={2} gap="md">
              <MockCard hover>
                <MockImage src="/featured-1.jpg" alt="Featured item 1" />
                <MockButton size="sm">View</MockButton>
              </MockCard>
              <MockCard hover>
                <MockImage src="/featured-2.jpg" alt="Featured item 2" />
                <MockButton size="sm">View</MockButton>
              </MockCard>
            </MockGrid>
          </MockCard>
          <MockCard>
            <h2>Customer Reviews</h2>
            <p>What our customers are saying...</p>
            <MockLink to="/reviews">Read All Reviews</MockLink>
          </MockCard>
        </MockGrid>
      </MockContainer>
    );

    // Verify complex nesting works correctly
    const container = screen.getByTestId('container');
    const grids = screen.getAllByTestId('grid');
    const cards = screen.getAllByTestId('card');

    expect(grids).toHaveLength(2); // Main grid + nested grid
    expect(cards).toHaveLength(4); // 2 main cards + 2 nested cards
    expect(container).toContainElement(grids[0]);
  });
});