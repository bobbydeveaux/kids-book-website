import React from 'react';
import Card from './Card';

/**
 * Demo component to showcase Card functionality
 * This file demonstrates the Card component in action
 */
function CardDemo() {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
      <h2>Card Component Demo</h2>

      <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>

        {/* Basic Card */}
        <Card>
          <h3>Basic Card</h3>
          <p>This is a basic card with default styling and hover effects.</p>
        </Card>

        {/* Card with custom className */}
        <Card className="elevated">
          <h3>Elevated Card</h3>
          <p>This card uses the elevated variant for more prominent shadows.</p>
        </Card>

        {/* Card with minimal styling */}
        <Card className="minimal">
          <h3>Minimal Card</h3>
          <p>This card uses the minimal variant with subtle styling.</p>
        </Card>

        {/* Card with complex content */}
        <Card>
          <img
            src="/api/placeholder/150/100"
            alt="Demo image"
            style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '4px', marginBottom: '10px' }}
          />
          <h3>Product Card</h3>
          <p>Example of a card that could be used for product display.</p>
          <div style={{ marginTop: 'auto', paddingTop: '10px' }}>
            <strong>$29.99</strong>
          </div>
        </Card>

        {/* Interactive Card */}
        <Card
          onClick={() => alert('Card clicked!')}
          style={{ cursor: 'pointer' }}
        >
          <h3>Interactive Card</h3>
          <p>Click me to see the interaction!</p>
          <small>This card demonstrates click handling.</small>
        </Card>

      </div>

      <div style={{ marginTop: '30px' }}>
        <h3>Usage Example</h3>
        <pre style={{ backgroundColor: '#f0f0f0', padding: '15px', borderRadius: '4px', overflow: 'auto' }}>
{`import Card from './components/ui/Card';

// Basic usage
<Card>
  <h3>Title</h3>
  <p>Content goes here</p>
</Card>

// With custom className
<Card className="elevated">
  Content
</Card>

// With additional props
<Card onClick={handleClick} data-testid="product-card">
  Interactive content
</Card>`}
        </pre>
      </div>
    </div>
  );
}

export default CardDemo;