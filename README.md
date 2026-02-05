# Lingerie Website

A modern, responsive React website showcasing premium lingerie collections. Built with Vite, React Router, and a comprehensive development setup including testing, linting, and formatting tools.

## 🚀 Quick Start

### Prerequisites

- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd lingerie-website
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
lingerie-website/
├── public/                  # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   └── layout/        # Layout components (Header, Footer)
│   ├── data/              # Static data and data utilities
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Page components
│   ├── services/          # API and external service utilities
│   ├── test/              # Test setup and utilities
│   ├── utils/             # General utility functions
│   ├── App.jsx            # Main application component
│   ├── App.css            # App-specific styles
│   ├── main.jsx           # Application entry point
│   └── index.css          # Global styles and CSS variables
├── tests/                 # E2E tests (Playwright)
├── .eslintrc.cjs         # ESLint configuration
├── .prettierrc           # Prettier configuration
├── playwright.config.js  # Playwright configuration
├── vitest.config.js      # Vitest configuration
├── vite.config.js        # Vite configuration
└── package.json          # Project dependencies and scripts
```

## 🛠 Available Scripts

### Development
- **`npm run dev`** - Start development server with hot reload
- **`npm run build`** - Build for production
- **`npm run preview`** - Preview production build locally

### Code Quality
- **`npm run lint`** - Run ESLint checks
- **`npm run lint:fix`** - Fix ESLint issues automatically
- **`npm run format`** - Format code with Prettier
- **`npm run format:check`** - Check code formatting

### Testing
- **`npm run test`** - Run unit tests in watch mode
- **`npm run test:run`** - Run unit tests once
- **`npm run test:ui`** - Run tests with UI
- **`npm run test:coverage`** - Run tests with coverage report
- **`npm run test:e2e`** - Run end-to-end tests
- **`npm run test:e2e:ui`** - Run E2E tests with UI
- **`npm run test:e2e:debug`** - Debug E2E tests
- **`npm run test:e2e:report`** - Show E2E test report

## 🧩 Tech Stack

### Core Framework
- **React 18** - UI library
- **Vite** - Build tool and development server
- **React Router** - Client-side routing

### Development Tools
- **ESLint** - Code linting and style enforcement
- **Prettier** - Code formatting
- **Vitest** - Unit testing framework
- **Playwright** - End-to-end testing
- **@testing-library/react** - React testing utilities

### Styling
- **CSS Custom Properties** - Design system with CSS variables
- **Responsive Design** - Mobile-first approach
- **CSS Grid & Flexbox** - Modern layout techniques

## 🎨 Design System

The project uses a comprehensive CSS custom properties system defined in `src/index.css`:

- **Colors:** Primary, secondary, text, and background colors
- **Typography:** Font families, sizes, and weights
- **Spacing:** Consistent spacing scale
- **Borders:** Border radius and shadow definitions

## 📱 Features

### Current Implementation
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Modern React Router setup with proper routing
- ✅ Page stubs for core functionality
- ✅ Component-based architecture
- ✅ Comprehensive development tooling
- ✅ Unit and E2E testing setup
- ✅ Code quality enforcement (ESLint + Prettier)

### Page Structure
- **Home Page** (`/`) - Landing page with welcome content
- **Products Page** (`/products`) - Product listing and browsing
- **Product Detail Page** (`/products/:id`) - Individual product details
- **404 Page** - Custom not found page

### Planned Features
- Product data integration
- Product filtering and search
- Image galleries
- Shopping cart (future enhancement)
- User authentication (future enhancement)

## 🧪 Testing

### Unit Tests
Unit tests are written using Vitest and React Testing Library. Test files should be placed alongside their corresponding source files with a `.test.jsx` extension.

**Example:**
```javascript
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import MyComponent from './MyComponent'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />)
    expect(document.body).toBeInTheDocument()
  })
})
```

### E2E Tests
End-to-end tests are written using Playwright and located in the `tests/` directory.

**Running E2E Tests:**
```bash
# Install browsers (first time only)
npx playwright install

# Run tests
npm run test:e2e
```

## 🔧 Configuration

### Path Aliases
The project uses path aliases for cleaner imports:

- `@/` → `./src`
- `@/components` → `./src/components`
- `@/pages` → `./src/pages`
- `@/data` → `./src/data`
- `@/services` → `./src/services`
- `@/utils` → `./src/utils`
- `@/hooks` → `./src/hooks`
- `@/styles` → `./src/styles`

**Example usage:**
```javascript
import Header from '@/components/layout/Header'
import { formatPrice } from '@/utils/formatters'
```

## 📦 Build and Deployment

### Production Build
```bash
npm run build
```

This creates an optimized build in the `dist/` directory with:
- Minified JavaScript and CSS
- Vendor chunk splitting for better caching
- Static asset optimization

### Preview Build
```bash
npm run preview
```

Preview the production build locally before deployment.

## 🤝 Development Guidelines

### Code Style
- Use functional components with hooks
- Follow the established file naming conventions
- Write meaningful component and function names
- Add JSDoc comments for complex functions
- Use CSS custom properties for consistent styling

### Commit Messages
Follow conventional commit format:
- `feat:` for new features
- `fix:` for bug fixes
- `refactor:` for code refactoring
- `test:` for test changes
- `docs:` for documentation
- `chore:` for maintenance tasks

### Before Committing
```bash
npm run format      # Format code
npm run lint        # Check for linting issues
npm run test:run    # Run unit tests
npm run build       # Ensure build works
```

## 🐛 Troubleshooting

### Common Issues

**1. Port 5173 already in use:**
```bash
# Kill the process using the port
lsof -ti:5173 | xargs kill -9
# Or run on different port
npm run dev -- --port 3000
```

**2. Module resolution errors:**
- Ensure all dependencies are installed: `npm install`
- Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`

**3. E2E tests failing:**
- Install browsers: `npx playwright install`
- Ensure dev server is running for tests that require it

## 📄 License

[Add your license information here]

## 🔗 Links

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [React Router Documentation](https://reactrouter.com)
- [Vitest Documentation](https://vitest.dev)
- [Playwright Documentation](https://playwright.dev)
