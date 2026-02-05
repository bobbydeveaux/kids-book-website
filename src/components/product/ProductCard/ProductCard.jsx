import React from 'react';
import styles from './ProductCard.module.css';

const ProductCard = ({
  product,
  className = '',
  onClick,
  ...props
}) => {
  const cardClass = `
    ${styles.card}
    ${onClick ? styles.clickable : ''}
    ${className}
  `.trim();

  if (!product) {
    return (
      <div className={`${styles.card} ${styles.skeleton} ${className}`}>
        <div className={styles.imageSkeleton}></div>
        <div className={styles.content}>
          <div className={styles.titleSkeleton}></div>
          <div className={styles.descriptionSkeleton}></div>
        </div>
      </div>
    );
  }

  const { id, name, shortDescription, images, slug } = product;
  const imageUrl = images?.thumbnail || images?.main || '/placeholder-image.jpg';

  const handleClick = () => {
    if (onClick) {
      onClick(product);
    } else if (slug) {
      // Default behavior: navigate to product detail
      window.location.href = `/product/${slug}`;
    }
  };

  return (
    <article
      className={cardClass}
      onClick={handleClick}
      role={onClick ? 'button' : 'article'}
      tabIndex={onClick ? 0 : undefined}
      {...props}
    >
      <div className={styles.imageContainer}>
        <img
          src={imageUrl}
          alt={name}
          className={styles.image}
          loading="lazy"
        />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{name}</h3>
        {shortDescription && (
          <p className={styles.description}>{shortDescription}</p>
        )}
      </div>
    </article>
  );
};

export default ProductCard;