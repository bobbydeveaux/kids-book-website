import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Link from './components/ui/Link';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <h1>Link Component Demo</h1>

          <div className="link-examples">
            <h2>Link Variants</h2>

            <div className="link-group">
              <h3>Default Links</h3>
              <Link to="/about">About (Internal)</Link>
              <Link href="https://react.dev" target="_blank">React Docs (External)</Link>
              <Link href="mailto:test@example.com">Email Us</Link>
            </div>

            <div className="link-group">
              <h3>Button Links</h3>
              <Link to="/signup" variant="button">Sign Up (Internal)</Link>
              <Link href="https://github.com" variant="button">GitHub (External)</Link>
            </div>

            <div className="link-group">
              <h3>Navigation Links</h3>
              <Link to="/home" variant="nav">Home</Link>
              <Link to="/products" variant="nav">Products</Link>
              <Link to="/contact" variant="nav">Contact</Link>
            </div>
          </div>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<div>Home Page</div>} />
            <Route path="/about" element={<div>About Page</div>} />
            <Route path="/signup" element={<div>Sign Up Page</div>} />
            <Route path="/home" element={<div>Home Page</div>} />
            <Route path="/products" element={<div>Products Page</div>} />
            <Route path="/contact" element={<div>Contact Page</div>} />
            <Route path="*" element={<div>404 - Page Not Found</div>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;