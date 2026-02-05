import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

// Simple sample component for testing React Testing Library setup
const SampleButton = ({ onClick, children, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      data-testid="sample-button"
    >
      {children}
    </button>
  )
}

const SampleCard = ({ title, description, featured = false }) => {
  return (
    <div
      data-testid="sample-card"
      className={featured ? 'featured' : 'regular'}
    >
      <h2>{title}</h2>
      <p>{description}</p>
      {featured && <span data-testid="featured-badge">Featured</span>}
    </div>
  )
}

describe('React Testing Library Setup', () => {
  describe('SampleButton Component', () => {
    it('should render button with text', () => {
      render(<SampleButton>Click me</SampleButton>)

      expect(screen.getByRole('button')).toBeInTheDocument()
      expect(screen.getByText('Click me')).toBeInTheDocument()
    })

    it('should handle disabled state', () => {
      render(<SampleButton disabled>Disabled Button</SampleButton>)

      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
    })

    it('should be accessible via test id', () => {
      render(<SampleButton>Test Button</SampleButton>)

      expect(screen.getByTestId('sample-button')).toBeInTheDocument()
    })
  })

  describe('SampleCard Component', () => {
    it('should render card with title and description', () => {
      render(
        <SampleCard
          title="Sample Title"
          description="Sample description text"
        />
      )

      expect(screen.getByText('Sample Title')).toBeInTheDocument()
      expect(screen.getByText('Sample description text')).toBeInTheDocument()
    })

    it('should show featured badge when featured is true', () => {
      render(
        <SampleCard
          title="Featured Card"
          description="This is featured"
          featured={true}
        />
      )

      expect(screen.getByTestId('featured-badge')).toBeInTheDocument()
      expect(screen.getByText('Featured')).toBeInTheDocument()
    })

    it('should not show featured badge when featured is false', () => {
      render(
        <SampleCard
          title="Regular Card"
          description="This is not featured"
          featured={false}
        />
      )

      expect(screen.queryByTestId('featured-badge')).not.toBeInTheDocument()
    })

    it('should have correct CSS class based on featured state', () => {
      const { rerender } = render(
        <SampleCard
          title="Test Card"
          description="Test description"
          featured={true}
        />
      )

      expect(screen.getByTestId('sample-card')).toHaveClass('featured')

      rerender(
        <SampleCard
          title="Test Card"
          description="Test description"
          featured={false}
        />
      )

      expect(screen.getByTestId('sample-card')).toHaveClass('regular')
    })
  })
})