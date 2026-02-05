import React from 'react';
import { render, screen } from '@testing-library/react';
import Grid from './Grid';

// Mock CSS modules
jest.mock('./Grid.module.css', () => ({
  grid: 'grid',
  'gap-small': 'gap-small',
  'gap-medium': 'gap-medium',
  'gap-large': 'gap-large',
}));

describe('Grid Component', () => {
  const TestChild = ({ children }) => <div data-testid="grid-item">{children}</div>;

  it('renders children correctly', () => {
    render(
      <Grid>
        <TestChild>Item 1</TestChild>
        <TestChild>Item 2</TestChild>
      </Grid>
    );

    expect(screen.getByTestId('grid-item')).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('applies default column configuration', () => {
    const { container } = render(
      <Grid>
        <TestChild>Item 1</TestChild>
      </Grid>
    );

    const gridElement = container.firstChild;
    expect(gridElement).toHaveStyle({
      '--grid-cols-mobile': '1',
      '--grid-cols-tablet': '2',
      '--grid-cols-desktop': '3',
    });
  });

  it('applies custom column configuration', () => {
    const columns = { mobile: 2, tablet: 3, desktop: 4 };
    const { container } = render(
      <Grid columns={columns}>
        <TestChild>Item 1</TestChild>
      </Grid>
    );

    const gridElement = container.firstChild;
    expect(gridElement).toHaveStyle({
      '--grid-cols-mobile': '2',
      '--grid-cols-tablet': '3',
      '--grid-cols-desktop': '4',
    });
  });

  it('clamps column values to 1-4 range', () => {
    const columns = { mobile: 0, tablet: 5, desktop: -1 };
    const { container } = render(
      <Grid columns={columns}>
        <TestChild>Item 1</TestChild>
      </Grid>
    );

    const gridElement = container.firstChild;
    expect(gridElement).toHaveStyle({
      '--grid-cols-mobile': '1', // clamped from 0 to 1
      '--grid-cols-tablet': '4',  // clamped from 5 to 4
      '--grid-cols-desktop': '1', // clamped from -1 to 1
    });
  });

  it('handles partial column configuration', () => {
    const columns = { tablet: 3 }; // mobile and desktop not specified
    const { container } = render(
      <Grid columns={columns}>
        <TestChild>Item 1</TestChild>
      </Grid>
    );

    const gridElement = container.firstChild;
    expect(gridElement).toHaveStyle({
      '--grid-cols-mobile': '1', // default fallback
      '--grid-cols-tablet': '3',
      '--grid-cols-desktop': '3', // fallback to default
    });
  });

  it('applies default gap class', () => {
    const { container } = render(
      <Grid>
        <TestChild>Item 1</TestChild>
      </Grid>
    );

    expect(container.firstChild).toHaveClass('gap-medium');
  });

  it('applies custom gap class', () => {
    const { container } = render(
      <Grid gap="large">
        <TestChild>Item 1</TestChild>
      </Grid>
    );

    expect(container.firstChild).toHaveClass('gap-large');
  });

  it('applies all gap classes correctly', () => {
    ['small', 'medium', 'large'].forEach(gap => {
      const { container } = render(
        <Grid gap={gap}>
          <TestChild>Item 1</TestChild>
        </Grid>
      );

      expect(container.firstChild).toHaveClass(`gap-${gap}`);
    });
  });

  it('applies custom className', () => {
    const customClass = 'custom-grid-class';
    const { container } = render(
      <Grid className={customClass}>
        <TestChild>Item 1</TestChild>
      </Grid>
    );

    expect(container.firstChild).toHaveClass(customClass);
  });

  it('applies base grid class', () => {
    const { container } = render(
      <Grid>
        <TestChild>Item 1</TestChild>
      </Grid>
    );

    expect(container.firstChild).toHaveClass('grid');
  });

  it('combines all classes correctly', () => {
    const { container } = render(
      <Grid gap="small" className="custom-class">
        <TestChild>Item 1</TestChild>
      </Grid>
    );

    const gridElement = container.firstChild;
    expect(gridElement).toHaveClass('grid');
    expect(gridElement).toHaveClass('gap-small');
    expect(gridElement).toHaveClass('custom-class');
  });

  it('renders with 1 column configuration', () => {
    const columns = { mobile: 1, tablet: 1, desktop: 1 };
    const { container } = render(
      <Grid columns={columns}>
        <TestChild>Item 1</TestChild>
      </Grid>
    );

    const gridElement = container.firstChild;
    expect(gridElement).toHaveStyle({
      '--grid-cols-mobile': '1',
      '--grid-cols-tablet': '1',
      '--grid-cols-desktop': '1',
    });
  });

  it('renders with 4 column configuration', () => {
    const columns = { mobile: 4, tablet: 4, desktop: 4 };
    const { container } = render(
      <Grid columns={columns}>
        <TestChild>Item 1</TestChild>
      </Grid>
    );

    const gridElement = container.firstChild;
    expect(gridElement).toHaveStyle({
      '--grid-cols-mobile': '4',
      '--grid-cols-tablet': '4',
      '--grid-cols-desktop': '4',
    });
  });
});