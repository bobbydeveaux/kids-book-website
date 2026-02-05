/**
 * Product Detail Page Component
 *
 * Displays detailed information about a single product including
 * images, description, features, and specifications.
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

/**
 * Product detail page component
 * @returns {JSX.Element} Product detail page content
 */
function ProductDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // TODO: Fetch product data from service using slug
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        // Simulating API call with placeholder data
        setTimeout(() => {
          if (slug === 'classic-lace-bralette') {
            setProduct({
              id: '1',
              name: 'Classic Lace Bralette',
              slug: 'classic-lace-bralette',
              price: '$29.99',
              description: 'A timeless piece crafted with delicate lace and designed for all-day comfort. This bralette combines elegance with everyday wearability.',
              images: {
                main: '/images/products/placeholder.jpg',
                gallery: [
                  '/images/products/placeholder.jpg',
                  '/images/products/placeholder.jpg'
                ]
              },
              features: [
                'Soft, breathable lace fabric',
                'Wire-free for comfort',
                'Adjustable straps',
                'Available in multiple colors'
              ],
              specifications: {
                material: '85% Nylon, 15% Spandex',
                care: 'Hand wash cold, lay flat to dry',
                sizes: ['XS', 'S', 'M', 'L', 'XL'],
                colors: ['Black', 'White', 'Nude', 'Burgundy']
              }
            });
          } else {
            setError('Product not found');
          }
          setLoading(false);
        }, 500);
      } catch (err) {
        console.error('Error loading product:', err);
        setError('Failed to load product');
        setLoading(false);
      }
    };

    if (slug) {
      loadProduct();
    }
  }, [slug]);

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Loading product...</h2>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Product Not Found</h2>
        <p>{error || 'The requested product could not be found.'}</p>
        <button
          onClick={() => navigate('/')}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Breadcrumb */}
      <nav style={{ marginBottom: '2rem', color: '#666' }}>
        <a href="/" style={{ color: '#007bff', textDecoration: 'none' }}>Home</a>
        <span style={{ margin: '0 0.5rem' }}> / </span>
        <span>{product.name}</span>
      </nav>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginBottom: '3rem' }}>
        {/* Product Images */}
        <div>
          <img
            src={product.images.main}
            alt={product.name}
            style={{
              width: '100%',
              height: '400px',
              objectFit: 'cover',
              borderRadius: '8px',
              marginBottom: '1rem'
            }}
            onError={(e) => {
              e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"%3E%3Crect fill="%23f0f0f0"/%3E%3Ctext y="50%25" font-size="20" text-anchor="middle" dy=".3em"%3EProduct Image%3C/text%3E%3C/svg%3E';
            }}
          />

          {/* Image Gallery */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {product.images.gallery.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.name} view ${index + 1}`}
                style={{
                  width: '80px',
                  height: '80px',
                  objectFit: 'cover',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                  cursor: 'pointer'
                }}
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"%3E%3Crect fill="%23f0f0f0"/%3E%3C/svg%3E';
                }}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 style={{ marginBottom: '0.5rem' }}>{product.name}</h1>
          <p style={{ fontSize: '1.5rem', color: '#007bff', fontWeight: 'bold', marginBottom: '1rem' }}>
            {product.price}
          </p>
          <p style={{ lineHeight: 1.6, marginBottom: '2rem', color: '#555' }}>
            {product.description}
          </p>

          {/* Features */}
          <div style={{ marginBottom: '2rem' }}>
            <h3>Features</h3>
            <ul style={{ paddingLeft: '1.5rem' }}>
              {product.features.map((feature, index) => (
                <li key={index} style={{ marginBottom: '0.5rem' }}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Specifications */}
      <section style={{ borderTop: '1px solid #eee', paddingTop: '2rem' }}>
        <h3>Specifications</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div>
            <h4>Material</h4>
            <p>{product.specifications.material}</p>
          </div>
          <div>
            <h4>Care Instructions</h4>
            <p>{product.specifications.care}</p>
          </div>
          <div>
            <h4>Available Sizes</h4>
            <p>{product.specifications.sizes.join(', ')}</p>
          </div>
          <div>
            <h4>Available Colors</h4>
            <p>{product.specifications.colors.join(', ')}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductDetailPage;