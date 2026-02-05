/**
 * Main App Component
 *
 * Root component that sets up routing and global application structure.
 * Uses React Router for client-side navigation between pages.
 */

import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import pages - Home page loaded eagerly as it's the landing page
import Home from './pages/Home.jsx';

// Lazy load other pages for better performance
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

/**
 * Loading component for Suspense fallback
 * @returns {JSX.Element} Loading indicator
 */
function LoadingFallback() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '50vh',
      fontSize: '1.2rem',
      color: '#666'
    }}>
      Loading...
    </div>
  );
}

/**
 * Error Boundary component for handling JavaScript errors
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Application error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '2rem',
          textAlign: 'center',
          minHeight: '50vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <h2>Something went wrong</h2>
          <p style={{ color: '#666', marginBottom: '1rem' }}>
            An unexpected error occurred. Please refresh the page or try again later.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Main App component
 * @returns {JSX.Element} Application with routing
 */
function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
          {/* Simple header */}
          <header style={{
            backgroundColor: '#fff',
            borderBottom: '1px solid #eee',
            padding: '1rem 2rem',
            position: 'sticky',
            top: 0,
            zIndex: 100
          }}>
            <nav style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center' }}>
              <a
                href="/"
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#333',
                  textDecoration: 'none'
                }}
              >
                Elegant Lingerie
              </a>
            </nav>
          </header>

          {/* Main content area */}
          <main style={{ flex: 1 }}>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                {/* Home page - main landing page */}
                <Route path="/" element={<Home />} />

                {/* Product detail page - /products/:slug */}
                <Route path="/products/:slug" element={<ProductDetailPage />} />

                {/* 404 Not Found - catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>

          {/* Simple footer */}
          <footer style={{
            backgroundColor: '#f8f9fa',
            borderTop: '1px solid #eee',
            padding: '2rem',
            textAlign: 'center',
            color: '#666'
          }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <p>&copy; 2024 Elegant Lingerie. All rights reserved.</p>
              <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                Premium intimate apparel designed for comfort and elegance.
              </p>
            </div>
          </footer>
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;