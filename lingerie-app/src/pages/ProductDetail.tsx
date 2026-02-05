import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getProductBySlug } from '../services/dataService';

const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return <Navigate to="/" replace />;
  }

  const product = getProductBySlug(slug);

  if (!product) {
    return <Navigate to="/not-found" replace />;
  }

  return (
    <div className="container">
      <div
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}
      >
        <div>
          <img
            src={product.images.main}
            alt={product.name}
            style={{ width: '100%', borderRadius: '8px' }}
          />
        </div>
        <div>
          <h1>{product.name}</h1>
          <p
            style={{
              fontSize: '1.125rem',
              color: '#666',
              marginBottom: '1rem',
            }}
          >
            {product.description}
          </p>

          {product.price && (
            <p
              style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginBottom: '1rem',
              }}
            >
              {product.price.display}
            </p>
          )}

          <div style={{ marginBottom: '2rem' }}>
            <h3>Features</h3>
            <ul>
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Specifications</h3>
            <dl>
              {product.specifications.map((spec, index) => (
                <div key={index} style={{ marginBottom: '0.5rem' }}>
                  <dt style={{ fontWeight: 'bold', display: 'inline' }}>
                    {spec.key}:
                  </dt>
                  <dd style={{ display: 'inline', marginLeft: '0.5rem' }}>
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
