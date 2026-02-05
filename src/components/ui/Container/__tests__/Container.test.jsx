import React from 'react';
import { render, screen } from '@testing-library/react';
import Container from '../Container';

describe('Container Component', () => {
  test('renders children correctly', () => {
    render(
      <Container>
        <div>Test content</div>
      </Container>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  test('applies default container styles', () => {
    render(
      <Container data-testid="container">
        <div>Content</div>
      </Container>
    );

    const container = screen.getByTestId('container');
    expect(container).toHaveClass('container');
    expect(container).not.toHaveClass('containerFluid');
  });

  test('applies fluid styles when fluid prop is true', () => {
    render(
      <Container fluid data-testid="container">
        <div>Content</div>
      </Container>
    );

    const container = screen.getByTestId('container');
    expect(container).toHaveClass('containerFluid');
    expect(container).not.toHaveClass('container');
  });

  test('applies custom className along with base styles', () => {
    render(
      <Container className="custom-class" data-testid="container">
        <div>Content</div>
      </Container>
    );

    const container = screen.getByTestId('container');
    expect(container).toHaveClass('container');
    expect(container).toHaveClass('custom-class');
  });

  test('spreads additional props to container div', () => {
    render(
      <Container id="test-id" role="main" data-testid="container">
        <div>Content</div>
      </Container>
    );

    const container = screen.getByTestId('container');
    expect(container).toHaveAttribute('id', 'test-id');
    expect(container).toHaveAttribute('role', 'main');
  });

  test('fluid prop defaults to false', () => {
    render(
      <Container data-testid="container">
        <div>Content</div>
      </Container>
    );

    const container = screen.getByTestId('container');
    expect(container).toHaveClass('container');
    expect(container).not.toHaveClass('containerFluid');
  });
});