/**
 * Home Page Component
 *
 * Landing page displaying featured products and site introduction.
 * This is the main entry point for users visiting the website.
 */

import { useState, useEffect } from 'react';

/**
 * Home page component
 * @returns {JSX.Element} Home page content
 */
function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch featured products from data service
    // For now, using placeholder data
    const loadFeaturedProducts = async () => {
      try {
        // Simulating API call
        setTimeout(() => {
          setFeaturedProducts([
            {
              id: '1',
              name: 'Classic Lace Bralette',
              slug: 'classic-lace-bralette',
              price: '$29.99',
              image: '/images/products/placeholder.jpg'
            },
            {
              id: '2',
              name: 'Silk Comfort Set',
              slug: 'silk-comfort-set',
              price: '$89.99',
              image: '/images/products/placeholder.jpg'
            }
          ]);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error loading featured products:', error);
        setLoading(false);
      }
    };

    loadFeaturedProducts();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1>Welcome to Elegant Lingerie</h1>
        <p style={{ fontSize: '1.2rem', color: '#666' }}>
          Discover our exquisite collection of premium intimate apparel
        </p>
      </header>

      <section>
        <h2>Featured Products</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginTop: '2rem'
        }}>
          {featuredProducts.map(product => (
            <div key={product.id} style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '1rem',
              textAlign: 'center'
            }}>
              <img
                src={product.image}
                alt={product.name}
                style={{ width: '100%', height: '200px', objectFit: 'cover', marginBottom: '1rem' }}
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"%3E%3Crect fill="%23f0f0f0"/%3E%3Ctext y="50%25" font-size="20" text-anchor="middle" dy=".3em"%3EImage%3C/text%3E%3C/svg%3E';
                }}
              />
              <h3>{product.name}</h3>
              <p style={{ color: '#888', margin: '0.5rem 0' }}>{product.price}</p>
              <a
                href={`/products/${product.slug}`}
                style={{
                  display: 'inline-block',
                  padding: '0.5rem 1rem',
                  backgroundColor: '#007bff',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '4px'
                }}
              >
                View Details
              </a>
            </div>
          ))}
        </div>
      </section>

      {featuredProducts.length === 0 && (
        <div style={{ textAlign: 'center', color: '#666', marginTop: '3rem' }}>
          <p>No featured products available at the moment.</p>
        </div>
      )}
    </div>
  );
}

export default Home;