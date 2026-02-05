import React from 'react';
import ProductGrid from '../components/product/ProductGrid';
import { getFeaturedProducts } from '../services/dataService';

const Home: React.FC = () => {
  const featuredProducts = getFeaturedProducts();

  return (
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1>Lingerie Collection</h1>
        <p>Welcome to our curated collection of the best lingerie.</p>
      </div>

      <section>
        <h2>Featured Products</h2>
        <ProductGrid products={featuredProducts} />
      </section>
    </div>
  );
};

export default Home;
