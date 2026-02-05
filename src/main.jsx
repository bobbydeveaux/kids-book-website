import React from 'react'
import ReactDOM from 'react-dom/client'

// Import global styles in correct order
import './styles/variables.css'  // Variables must be imported first
import './styles/global.css'     // Global styles that use the variables

import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)