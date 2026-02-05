import { Link } from 'react-router-dom'

function Header() {
  return (
    <header
      style={{
        padding: '1rem',
        borderBottom: '1px solid #ccc',
        background: '#f8f9fa',
      }}
    >
      <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <Link
          to="/"
          style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            textDecoration: 'none',
            color: '#333',
          }}
        >
          Lingerie Boutique
        </Link>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/" style={{ textDecoration: 'none', color: '#007bff' }}>
            Home
          </Link>
          <Link to="/products" style={{ textDecoration: 'none', color: '#007bff' }}>
            Products
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Header
