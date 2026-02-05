import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Button from './components/ui/Button/Button.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Lingerie Website</h1>
        <p>Testing Button Component:</p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', margin: '2rem 0' }}>
          <Button variant="primary" size="small">Small Primary</Button>
          <Button variant="primary" size="medium">Medium Primary</Button>
          <Button variant="primary" size="large">Large Primary</Button>
        </div>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', margin: '2rem 0' }}>
          <Button variant="secondary" size="medium">Secondary</Button>
          <Button variant="outline" size="medium">Outline</Button>
        </div>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', margin: '2rem 0' }}>
          <Button variant="primary" size="medium" disabled>Disabled</Button>
          <Button variant="primary" size="medium" onClick={() => alert('Clicked!')}>
            Click me!
          </Button>
        </div>

        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;