import React from 'react'
import ReactDOM from 'react-dom/client'

// Import CSS files in correct order: variables first, then global styles
import './styles/variables.css'
import './styles/global.css'

// Import the main App component (to be created in future tasks)
// import App from './App.jsx'

// Temporary App component for testing CSS integration
function App() {
  return (
    <div style={{ padding: 'var(--spacing-lg)' }}>
      <h1>Lingerie Website</h1>
      <p>Global styles and CSS variables are now integrated!</p>
      <div style={{
        backgroundColor: 'var(--color-primary-light)',
        padding: 'var(--spacing-md)',
        borderRadius: 'var(--border-radius-md)',
        marginTop: 'var(--spacing-md)'
      }}>
        <p style={{ color: 'var(--color-primary-dark)', margin: 0 }}>
          This box demonstrates that CSS custom properties are working correctly.
        </p>
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)