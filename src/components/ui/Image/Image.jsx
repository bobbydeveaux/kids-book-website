import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './Image.module.css';

const Image = ({
  src,
  alt,
  loading = 'lazy',
  className = '',
  aspectRatio,
  fallbackSrc,
  onError,
  onLoad,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleError = useCallback((event) => {
    setHasError(true);
    if (onError) {
      onError(event);
    }
  }, [onError]);

  const handleLoad = useCallback((event) => {
    setIsLoaded(true);
    if (onLoad) {
      onLoad(event);
    }
  }, [onLoad]);

  const combinedClassName = [
    styles.image,
    className,
    isLoaded ? styles.loaded : styles.loading,
    hasError ? styles.error : ''
  ].filter(Boolean).join(' ');

  const containerStyle = aspectRatio
    ? { '--aspect-ratio': aspectRatio, ...props.style }
    : props.style;

  if (hasError && fallbackSrc) {
    return (
      <img
        {...props}
        src={fallbackSrc}
        alt={alt}
        loading={loading}
        className={combinedClassName}
        style={containerStyle}
        onLoad={handleLoad}
      />
    );
  }

  if (hasError) {
    return (
      <div
        className={`${styles.errorFallback} ${className}`}
        style={containerStyle}
        role="img"
        aria-label={alt}
      >
        <span className={styles.errorText}>Image not available</span>
      </div>
    );
  }

  return (
    <img
      {...props}
      src={src}
      alt={alt}
      loading={loading}
      className={combinedClassName}
      style={containerStyle}
      onError={handleError}
      onLoad={handleLoad}
    />
  );
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  loading: PropTypes.oneOf(['lazy', 'eager']),
  className: PropTypes.string,
  aspectRatio: PropTypes.string,
  fallbackSrc: PropTypes.string,
  onError: PropTypes.func,
  onLoad: PropTypes.func
};

export default Image;