# Lingerie Website

A modern lingerie website built with React and Vite.

## Features

- ⚛️ React 19 with hooks and functional components
- ⚡ Vite 7 for fast development and optimized builds
- 🎯 TypeScript support ready
- 🔧 ESLint configured with React, accessibility, and refresh plugins
- 💅 Prettier for consistent code formatting
- 🛣️ React Router for client-side routing
- 📱 Mobile-first responsive design ready

## Getting Started

### Prerequisites

- Node.js 18+ LTS
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Available Scripts

- `npm run dev` - Start development server with hot reloading
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check for code quality issues
- `npm run lint:fix` - Automatically fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check if code is formatted correctly

## Code Quality

This project uses ESLint and Prettier to maintain code quality and consistency:

### ESLint Configuration

- **Base**: ESLint recommended rules
- **React**: React best practices and hooks rules
- **Accessibility**: jsx-a11y for accessibility compliance
- **Prettier**: Integration with Prettier for formatting

### Prettier Configuration

- Single quotes for JSX
- Semicolons enabled
- 2-space indentation
- 80 character line width
- Trailing commas in ES5 contexts

## Project Structure

```
lingerie-website/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Route page components
│   ├── data/           # Static JSON data
│   ├── App.jsx         # Main app component
│   ├── App.css         # Global styles
│   ├── main.jsx        # React app entry point
│   └── index.css       # Base CSS styles
├── public/             # Static assets
├── dist/               # Production build output
├── docs/               # Project documentation
├── eslint.config.js    # ESLint configuration
├── .prettierrc         # Prettier configuration
├── .prettierignore     # Prettier ignore patterns
├── vite.config.js      # Vite configuration
└── package.json        # Project dependencies and scripts
```

## Technology Stack

- **React 19** - UI framework
- **Vite 7** - Build tool and dev server
- **React Router 7** - Client-side routing
- **ESLint 9** - Code linting with flat config
- **Prettier 3** - Code formatting
- **CSS Modules** - Component-scoped styling (ready to use)

## Development Guidelines

1. **Code Quality**: All code must pass ESLint rules and Prettier formatting
2. **Accessibility**: Follow WCAG guidelines, enforced by jsx-a11y plugin
3. **React Best Practices**: Use functional components and hooks
4. **File Organization**: Follow the established directory structure
5. **Responsive Design**: Mobile-first approach for all components

## Deployment

The project builds to static files that can be deployed to any static hosting service:

```bash
npm run build
```

The `dist/` directory contains all files needed for deployment.

### Recommended Hosting

- **Netlify** - Automatic deployments from Git
- **Vercel** - Optimized for React applications
- **GitHub Pages** - Free hosting for public repositories
- **AWS S3 + CloudFront** - Scalable cloud hosting

## Contributing

1. Run `npm run lint` before committing
2. Run `npm run format` to ensure consistent formatting
3. Follow the established component patterns
4. Test your changes across different viewport sizes

## License

ISC