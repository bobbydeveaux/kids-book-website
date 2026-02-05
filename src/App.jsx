import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '@/pages/Home'
import ProductsPage from '@/pages/ProductsPage'
import ProductDetailPage from '@/pages/ProductDetailPage'
import NotFoundPage from '@/pages/NotFoundPage'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import TestComponent from '@/components/TestComponent'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <main style={{ flex: 1, padding: '2rem' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/test" element={<TestComponent />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
