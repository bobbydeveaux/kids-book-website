import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/" style={{ color: '#007bff', textDecoration: 'underline' }}>
        Return to Home
      </Link>
    </div>
  )
}

export default NotFoundPage
