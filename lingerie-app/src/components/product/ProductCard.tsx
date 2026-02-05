import React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../../types';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className={styles.card}>
      <Link to={`/products/${product.slug}`}>
        <div className={styles.imageContainer}>
          <img
            src={product.images.thumbnail}
            alt={product.name}
            className={styles.image}
          />
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>{product.name}</h3>
          <p className={styles.description}>{product.shortDescription}</p>
          {product.price && (
            <p className={styles.price}>{product.price.display}</p>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
