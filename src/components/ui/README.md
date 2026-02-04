# UI Component Library

A collection of reusable UI components for the lingerie website built with React and CSS Modules.

## Design System

All components use CSS custom properties defined in `src/styles/variables.css` for consistent theming:

### Colors
- `--color-primary`: Main brand color
- `--color-secondary`: Secondary brand color
- `--color-text`: Default text color
- `--color-background`: Background color

### Spacing
- Uses a consistent spacing scale based on `--spacing-unit` (0.25rem increments)
- Available as `--spacing-1` through `--spacing-16`

### Typography
- `--font-family-sans`: Default sans-serif font stack
- `--font-size-*`: Responsive font sizes (xs, sm, base, lg, xl, 2xl, 3xl)
- `--font-weight-*`: Font weights (normal, medium, semibold, bold)

### Breakpoints
- `--breakpoint-sm`: 640px
- `--breakpoint-md`: 768px
- `--breakpoint-lg`: 1024px
- `--breakpoint-xl`: 1280px

## Components

### Container

A responsive container component that centers content with consistent max-widths.

```jsx
import { Container } from './Container/Container';

// Basic usage
<Container>
  <p>Your content here</p>
</Container>

// With size variants
<Container size="sm">Small container (640px max)</Container>
<Container size="md">Medium container (768px max)</Container>
<Container size="lg">Large container (1024px max)</Container>
<Container size="xl">Extra large container (1280px max)</Container>
<Container size="full">Full width container</Container>
```

**Props:**
- `size`: `'sm' | 'md' | 'lg' | 'xl' | 'full'` - Container max-width
- `className`: Additional CSS classes
- `children`: React nodes

### Grid

A flexible CSS Grid component with responsive column layout.

```jsx
import { Grid } from './Grid/Grid';

// Basic usage
<Grid>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Grid>

// With column configuration
<Grid cols={3} gap="lg">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Grid>

// Responsive columns
<Grid cols={{ sm: 1, md: 2, lg: 3 }}>
  <div>Responsive item</div>
</Grid>
```

**Props:**
- `cols`: `number | { sm?: number, md?: number, lg?: number, xl?: number }` - Number of columns
- `gap`: `'xs' | 'sm' | 'md' | 'lg' | 'xl'` - Grid gap size
- `className`: Additional CSS classes
- `children`: React nodes

### Card

A versatile card component with optional hover effects.

```jsx
import { Card } from './Card/Card';

// Basic usage
<Card>
  <h3>Card Title</h3>
  <p>Card content goes here.</p>
</Card>

// With hover effects
<Card hover>
  <h3>Interactive Card</h3>
  <p>This card has hover effects.</p>
</Card>

// As a link
<Card as="a" href="/product/1" hover>
  <h3>Product Card</h3>
  <p>Click to view product details.</p>
</Card>
```

**Props:**
- `as`: `'div' | 'article' | 'a'` - HTML element to render as
- `hover`: `boolean` - Enable hover effects
- `className`: Additional CSS classes
- `children`: React nodes
- `...props`: Additional props passed to the underlying element

### Image

An optimized image component with lazy loading and error handling.

```jsx
import { Image } from './Image/Image';

// Basic usage
<Image
  src="/images/product-1.jpg"
  alt="Product image"
  width={400}
  height={300}
/>

// With object-fit
<Image
  src="/images/hero.jpg"
  alt="Hero image"
  width={800}
  height={400}
  objectFit="cover"
/>

// With fallback
<Image
  src="/images/product.jpg"
  alt="Product image"
  fallbackSrc="/images/placeholder.jpg"
/>
```

**Props:**
- `src`: `string` - Image source URL (required)
- `alt`: `string` - Alt text (required for accessibility)
- `width`: `number` - Image width
- `height`: `number` - Image height
- `objectFit`: `'cover' | 'contain' | 'fill'` - CSS object-fit property
- `fallbackSrc`: `string` - Fallback image if main image fails to load
- `loading`: `'lazy' | 'eager'` - Image loading strategy (default: 'lazy')
- `className`: Additional CSS classes

### Button

A flexible button component with multiple variants and states.

```jsx
import { Button } from './Button/Button';

// Basic usage
<Button>Click me</Button>

// With variants
<Button variant="primary">Primary Button</Button>
<Button variant="secondary">Secondary Button</Button>
<Button variant="outline">Outline Button</Button>

// With sizes
<Button size="sm">Small Button</Button>
<Button size="md">Medium Button</Button>
<Button size="lg">Large Button</Button>

// States
<Button disabled>Disabled Button</Button>
<Button loading>Loading...</Button>

// As a link
<Button as="a" href="/products">Browse Products</Button>
```

**Props:**
- `variant`: `'primary' | 'secondary' | 'outline'` - Button style variant
- `size`: `'sm' | 'md' | 'lg'` - Button size
- `disabled`: `boolean` - Disable the button
- `loading`: `boolean` - Show loading state
- `type`: `'button' | 'submit' | 'reset'` - Button type (default: 'button')
- `as`: `'button' | 'a'` - Render as button or anchor
- `className`: Additional CSS classes
- `children`: React nodes
- `...props`: Additional props passed to the underlying element

### Link

A smart link component that handles internal navigation with React Router and external links.

```jsx
import { Link } from './Link/Link';

// Internal navigation (uses React Router)
<Link to="/products">View Products</Link>

// External link (opens in new tab)
<Link href="https://example.com">External Site</Link>

// With variants
<Link to="/about" variant="primary">Learn More</Link>
<Link to="/contact" variant="secondary">Contact Us</Link>

// Disabled state
<Link to="/coming-soon" disabled>Coming Soon</Link>
```

**Props:**
- `to`: `string` - Internal route (uses React Router Link)
- `href`: `string` - External URL (uses anchor tag)
- `variant`: `'primary' | 'secondary' | 'muted'` - Link style variant
- `disabled`: `boolean` - Disable the link
- `className`: Additional CSS classes
- `children`: React nodes
- `...props`: Additional props passed to the underlying element

## Accessibility

All components follow accessibility best practices:

- **Semantic HTML**: Components use appropriate HTML elements
- **ARIA attributes**: Proper ARIA labels and roles where needed
- **Focus management**: Visible focus indicators and logical tab order
- **Screen reader support**: Descriptive text and proper labeling
- **Keyboard navigation**: All interactive elements are keyboard accessible

## Testing

Components are tested with:

- **Unit tests**: Individual component behavior and props
- **Integration tests**: Component interaction and design system consistency
- **Accessibility tests**: ARIA compliance and keyboard navigation
- **Visual regression**: Ensuring consistent appearance across breakpoints

Run tests with:
```bash
npm test
```

Run integration tests specifically:
```bash
npm test -- --testPathPattern=integration
```

## CSS Architecture

- **CSS Modules**: Scoped component styles prevent conflicts
- **BEM Methodology**: Consistent naming convention for CSS classes
- **CSS Custom Properties**: Design tokens for consistent theming
- **Mobile-first**: Responsive design starting from mobile breakpoints

## Usage Guidelines

1. **Import components individually** to enable tree shaking
2. **Use CSS custom properties** instead of hardcoded values
3. **Follow responsive design patterns** with mobile-first approach
4. **Include required accessibility props** like `alt` text for images
5. **Compose components** to build complex UI patterns

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## Contributing

When adding new components:

1. Create component in appropriate folder with `.jsx` and `.module.css` files
2. Add PropTypes validation for all props
3. Include comprehensive documentation with examples
4. Write unit tests for all functionality
5. Update this README with component documentation
6. Ensure accessibility compliance