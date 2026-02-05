# Card Component

A reusable Card component with hover states and smooth transitions for the lingerie website.

## Features

- ✅ Clean, modern design with rounded corners and subtle shadows
- ✅ Smooth hover animations with `translateY` and enhanced shadows
- ✅ Responsive design with mobile-first approach
- ✅ Accessibility support with focus states
- ✅ Multiple variants (default, elevated, minimal)
- ✅ CSS Modules for scoped styling
- ✅ PropTypes validation
- ✅ Flexible content support via children prop

## Usage

```jsx
import Card from './components/ui/Card';

// Basic usage
<Card>
  <h3>Card Title</h3>
  <p>Card content goes here...</p>
</Card>

// With custom className
<Card className="elevated">
  <p>This card has elevated styling</p>
</Card>

// With click handler
<Card onClick={() => console.log('Clicked!')}>
  <p>Clickable card</p>
</Card>
```

## Props

| Prop        | Type     | Default | Description                           |
|-------------|----------|---------|---------------------------------------|
| `children`  | `node`   | -       | **Required.** Content to display     |
| `className` | `string` | `''`    | Additional CSS classes to apply       |
| `...props`  | `any`    | -       | Additional props passed to div element|

## CSS Variants

### Default
Standard card with subtle shadow and hover effects.

### Elevated (.elevated)
More prominent shadows for important content.

```jsx
<Card className="elevated">Content</Card>
```

### Minimal (.minimal)
Clean design with minimal shadows.

```jsx
<Card className="minimal">Content</Card>
```

## Hover Effects

- **Transform**: Moves card up by 4px on hover (`translateY(-4px)`)
- **Shadow**: Enhances shadow from `0 2px 4px` to `0 8px 16px`
- **Transition**: Smooth 0.2s ease-in-out animation
- **Accessibility**: Focus outline for keyboard navigation

## Responsive Behavior

- **Mobile** (≤640px): Reduced padding and hover effects
- **Tablet** (641px-1024px): Medium padding and effects
- **Desktop** (≥1025px): Full padding and hover effects

## Browser Support

- Modern browsers with CSS Grid and Flexbox support
- CSS transitions and transforms
- CSS custom properties (CSS variables)

## File Structure

```
Card/
├── Card.jsx           # Main component
├── Card.module.css    # Scoped styles
├── index.js          # Export barrel
├── Card.demo.jsx     # Demo component
├── verify.js         # Verification script
└── README.md         # This documentation
```

## Implementation Details

The Card component follows the specifications outlined in the LLD document:

- Uses CSS Modules for scoped styling
- Implements hover states with `transform` and `box-shadow` animations
- Supports responsive design with mobile-first approach
- Provides accessibility features with focus states
- Follows React best practices with PropTypes validation

## Testing

Run the verification script to check component structure:

```bash
cd src/components/ui/Card
node verify.js
```

## Integration with ProductCard

This Card component is designed to be used by the ProductCard component:

```jsx
import Card from '../../ui/Card/Card';

function ProductCard({ product }) {
  return (
    <Card className={styles.productCard}>
      {/* Product content */}
    </Card>
  );
}
```