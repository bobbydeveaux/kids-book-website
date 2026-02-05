import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Link from '../Link';

// Helper to render component with router context
const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Link Component', () => {
  test('renders internal link using React Router Link', () => {
    renderWithRouter(
      <Link to="/about">About Us</Link>
    );

    const link = screen.getByRole('link', { name: /about us/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/about');
  });

  test('renders external link with security attributes', () => {
    render(
      <Link href="https://example.com">External Link</Link>
    );

    const link = screen.getByRole('link', { name: /external link/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('applies default variant class', () => {
    renderWithRouter(
      <Link to="/home">Home</Link>
    );

    const link = screen.getByRole('link', { name: /home/i });
    expect(link).toHaveClass('link--default');
  });

  test('applies button variant class', () => {
    renderWithRouter(
      <Link to="/signup" variant="button">Sign Up</Link>
    );

    const link = screen.getByRole('link', { name: /sign up/i });
    expect(link).toHaveClass('link--button');
  });

  test('applies nav variant class', () => {
    renderWithRouter(
      <Link to="/products" variant="nav">Products</Link>
    );

    const link = screen.getByRole('link', { name: /products/i });
    expect(link).toHaveClass('link--nav');
  });

  test('supports additional className', () => {
    renderWithRouter(
      <Link to="/contact" className="custom-class">Contact</Link>
    );

    const link = screen.getByRole('link', { name: /contact/i });
    expect(link).toHaveClass('custom-class');
  });

  test('detects mailto links as external', () => {
    render(
      <Link href="mailto:test@example.com">Email Us</Link>
    );

    const link = screen.getByRole('link', { name: /email us/i });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('detects tel links as external', () => {
    render(
      <Link href="tel:+1234567890">Call Us</Link>
    );

    const link = screen.getByRole('link', { name: /call us/i });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('passes additional props to underlying element', () => {
    renderWithRouter(
      <Link to="/help" aria-label="Get help">Help</Link>
    );

    const link = screen.getByRole('link', { name: /get help/i });
    expect(link).toBeInTheDocument();
  });
});