import React, { useState } from 'react';
import styles from './Image.module.css';

const Image = ({
  src,
  alt,
  className = '',
  loading = 'lazy',
  objectFit = 'cover',
  aspectRatio,
  placeholder = '/placeholder-image.jpg',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const imageClass = `
    ${styles.image}
    ${styles[objectFit]}
    ${isLoaded ? styles.loaded : ''}
    ${className}
  `.trim();

  const containerStyle = aspectRatio
    ? { aspectRatio: aspectRatio }
    : {};

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  return (
    <div className={styles.container} style={containerStyle}>
      <img
        src={hasError ? placeholder : src}
        alt={alt}
        className={imageClass}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
      {!isLoaded && (
        <div className={styles.placeholder}>
          <div className={styles.skeleton}></div>
        </div>
      )}
    </div>
  );
};

export default Image;