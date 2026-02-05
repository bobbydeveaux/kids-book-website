/**
 * NotFound (404) Page Component
 *
 * Displays when users navigate to non-existent routes.
 * Provides helpful navigation back to main content.
 */

import { useNavigate } from 'react-router-dom';

/**
 * 404 Not Found page component
 * @returns {JSX.Element} 404 page content
 */
function NotFound() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      padding: '2rem',
      textAlign: 'center'
    }}>
      {/* Large 404 text */}
      <div style={{
        fontSize: '6rem',
        fontWeight: 'bold',
        color: '#ddd',
        lineHeight: 1,
        marginBottom: '1rem'
      }}>
        404
      </div>

      {/* Error message */}
      <h1 style={{
        fontSize: '2rem',
        marginBottom: '1rem',
        color: '#333'
      }}>
        Page Not Found
      </h1>

      <p style={{
        fontSize: '1.1rem',
        color: '#666',
        marginBottom: '2rem',
        maxWidth: '500px',
        lineHeight: 1.6
      }}>
        Sorry, the page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
      </p>

      {/* Action buttons */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        <button
          onClick={handleGoHome}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
        >
          Go to Home
        </button>

        <button
          onClick={handleGoBack}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: 'transparent',
            color: '#007bff',
            border: '2px solid #007bff',
            borderRadius: '6px',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#007bff';
            e.target.style.color = 'white';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = '#007bff';
          }}
        >
          Go Back
        </button>
      </div>

      {/* Helpful links */}
      <div style={{
        marginTop: '3rem',
        color: '#666'
      }}>
        <p style={{ marginBottom: '1rem' }}>You might be looking for:</p>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <a
            href="/"
            style={{
              color: '#007bff',
              textDecoration: 'none',
              borderBottom: '1px solid transparent',
              transition: 'border-color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.borderColor = '#007bff'}
            onMouseOut={(e) => e.target.style.borderColor = 'transparent'}
          >
            Featured Products
          </a>
          <a
            href="/products/classic-lace-bralette"
            style={{
              color: '#007bff',
              textDecoration: 'none',
              borderBottom: '1px solid transparent',
              transition: 'border-color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.borderColor = '#007bff'}
            onMouseOut={(e) => e.target.style.borderColor = 'transparent'}
          >
            Sample Product
          </a>
        </div>
      </div>
    </div>
  );
}

export default NotFound;