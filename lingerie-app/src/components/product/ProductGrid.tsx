import React from 'react';
import ProductCard from './ProductCard';
import type { Product } from '../../types';
import styles from './ProductGrid.module.css';

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  if (products.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p className={styles.emptyMessage}>No products available.</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
