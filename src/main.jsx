import React from 'react'
import ReactDOM from 'react-dom/client'

// Import global styles
import './styles/global.css'

// Main App component (placeholder)
function App() {
  return (
    <div className="container">
      <h1>Lingerie Website</h1>
      <p>Welcome to our lingerie website. This is a placeholder for the main application.</p>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)