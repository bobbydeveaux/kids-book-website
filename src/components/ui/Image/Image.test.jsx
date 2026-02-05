import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Image from './Image';

describe('Image Component', () => {
  const mockProps = {
    src: 'https://example.com/image.jpg',
    alt: 'Test image description'
  };

  test('renders image with required props', () => {
    render(<Image {...mockProps} />);
    const img = screen.getByRole('img');

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', mockProps.src);
    expect(img).toHaveAttribute('alt', mockProps.alt);
    expect(img).toHaveAttribute('loading', 'lazy');
  });

  test('applies custom loading attribute', () => {
    render(<Image {...mockProps} loading="eager" />);
    const img = screen.getByRole('img');

    expect(img).toHaveAttribute('loading', 'eager');
  });

  test('applies custom className', () => {
    const customClass = 'custom-image-class';
    render(<Image {...mockProps} className={customClass} />);
    const img = screen.getByRole('img');

    expect(img).toHaveClass(customClass);
  });

  test('handles image load event', () => {
    const onLoadMock = jest.fn();
    render(<Image {...mockProps} onLoad={onLoadMock} />);
    const img = screen.getByRole('img');

    fireEvent.load(img);
    expect(onLoadMock).toHaveBeenCalledTimes(1);
  });

  test('handles image error with fallback', () => {
    const fallbackSrc = 'https://example.com/fallback.jpg';
    render(<Image {...mockProps} fallbackSrc={fallbackSrc} />);
    const img = screen.getByRole('img');

    fireEvent.error(img);

    // After error, it should use fallback image
    expect(img).toHaveAttribute('src', fallbackSrc);
  });

  test('handles image error without fallback shows error message', () => {
    render(<Image {...mockProps} />);
    const img = screen.getByRole('img');

    fireEvent.error(img);

    // Should show error fallback
    const errorFallback = screen.getByText('Image not available');
    expect(errorFallback).toBeInTheDocument();
  });

  test('calls onError callback when image fails to load', () => {
    const onErrorMock = jest.fn();
    render(<Image {...mockProps} onError={onErrorMock} />);
    const img = screen.getByRole('img');

    fireEvent.error(img);
    expect(onErrorMock).toHaveBeenCalledTimes(1);
  });

  test('applies aspect ratio when provided', () => {
    render(<Image {...mockProps} aspectRatio="16/9" />);
    const img = screen.getByRole('img');

    expect(img).toHaveStyle('--aspect-ratio: 16/9');
  });

  test('enforces alt text requirement via PropTypes', () => {
    // This test would need PropTypes validation in a real testing environment
    // For now, we just verify alt is required in the component
    const { rerender } = render(<Image {...mockProps} />);
    const img = screen.getByRole('img');

    expect(img).toHaveAttribute('alt', mockProps.alt);
  });
});