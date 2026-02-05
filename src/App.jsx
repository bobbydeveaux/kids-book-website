import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '@/pages/Home'
import TestComponent from '@/components/TestComponent'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<TestComponent />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App