import React from 'react';
import styles from './ProductGrid.module.css';
import ProductCard from '../ProductCard/ProductCard';

const ProductGrid = ({
  products = [],
  className = '',
  loading = false,
  loadingCount = 8,
  onProductClick,
  columns = 'auto',
  gap = 'medium',
  ...props
}) => {
  const gridClass = `
    ${styles.grid}
    ${styles[`gap-${gap}`]}
    ${styles[`columns-${columns}`]}
    ${className}
  `.trim();

  // Show skeleton cards when loading
  if (loading || products.length === 0) {
    return (
      <div className={gridClass} {...props}>
        {Array.from({ length: loadingCount }).map((_, index) => (
          <ProductCard
            key={`skeleton-${index}`}
            product={null}
            className={styles.skeletonCard}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={gridClass} {...props}>
      {products.map((product) => (
        <ProductCard
          key={product.id || product.slug}
          product={product}
          onClick={onProductClick}
          className={styles.productCard}
        />
      ))}
    </div>
  );
};

export default ProductGrid;