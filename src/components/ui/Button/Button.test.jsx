import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from './Button.jsx';
import styles from './Button.module.css';

describe('Button', () => {
  it('renders button with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('applies default variant and size classes', () => {
    render(<Button>Default Button</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain(styles.button);
    expect(button.className).toContain(styles.primary);
    expect(button.className).toContain(styles.medium);
  });

  it('applies custom variant and size', () => {
    render(<Button variant="secondary" size="large">Secondary Large</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain(styles.button);
    expect(button.className).toContain(styles.secondary);
    expect(button.className).toContain(styles.large);
  });

  it('applies outline variant', () => {
    render(<Button variant="outline">Outline Button</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain(styles.outline);
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies disabled state', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick} disabled>Disabled Button</Button>);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button.className).toContain(styles.disabled);

    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('applies loading state', () => {
    render(<Button loading>Loading Button</Button>);

    const button = screen.getByRole('button');
    expect(button.className).toContain(styles.loading);
    expect(button).toHaveAttribute('aria-busy', 'true');
  });

  it('renders as anchor when as="a" prop is provided', () => {
    render(<Button as="a" href="/test">Link Button</Button>);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/test');
    expect(link).toHaveTextContent('Link Button');
  });

  it('applies custom className', () => {
    render(<Button className="custom-class">Custom Button</Button>);

    const button = screen.getByRole('button');
    expect(button.className).toContain(styles.button);
    expect(button.className).toContain(styles.primary);
    expect(button.className).toContain(styles.medium);
    expect(button.className).toContain('custom-class');
  });

  it('spreads additional props to button element', () => {
    render(<Button data-testid="custom-button" aria-label="Custom button">Button</Button>);

    const button = screen.getByTestId('custom-button');
    expect(button).toHaveAttribute('aria-label', 'Custom button');
  });

  it('applies correct button type', () => {
    render(<Button type="submit">Submit Button</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('applies small size', () => {
    render(<Button size="small">Small Button</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain(styles.small);
  });

  it('prevents click when loading', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick} loading>Loading Button</Button>);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });
});