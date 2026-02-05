import React, { useState } from 'react';
import styles from './ProductDetail.module.css';

const ProductDetail = ({
  product,
  className = '',
  ...props
}) => {
  const [selectedImage, setSelectedImage] = useState(0);

  const detailClass = `
    ${styles.detail}
    ${className}
  `.trim();

  if (!product) {
    return (
      <div className={`${styles.detail} ${styles.skeleton}`}>
        <div className={styles.images}>
          <div className={styles.imageSkeleton}></div>
        </div>
        <div className={styles.info}>
          <div className={styles.titleSkeleton}></div>
          <div className={styles.descriptionSkeleton}></div>
          <div className={styles.featuresSkeleton}></div>
        </div>
      </div>
    );
  }

  const {
    name,
    description,
    shortDescription,
    images,
    features = [],
    specifications = [],
    category = []
  } = product;

  // Prepare image gallery
  const imageGallery = [];
  if (images?.main) imageGallery.push(images.main);
  if (images?.gallery) imageGallery.push(...images.gallery);
  if (imageGallery.length === 0 && images?.thumbnail) {
    imageGallery.push(images.thumbnail);
  }

  return (
    <article className={detailClass} {...props}>
      {/* Image Gallery */}
      <div className={styles.images}>
        {imageGallery.length > 0 && (
          <>
            <div className={styles.mainImage}>
              <img
                src={imageGallery[selectedImage]}
                alt={name}
                className={styles.image}
              />
            </div>

            {imageGallery.length > 1 && (
              <div className={styles.thumbnails}>
                {imageGallery.map((image, index) => (
                  <button
                    key={index}
                    className={`
                      ${styles.thumbnail}
                      ${index === selectedImage ? styles.active : ''}
                    `.trim()}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img
                      src={image}
                      alt={`${name} - Image ${index + 1}`}
                      className={styles.thumbnailImage}
                    />
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Product Information */}
      <div className={styles.info}>
        <header className={styles.header}>
          <h1 className={styles.title}>{name}</h1>
          {category.length > 0 && (
            <div className={styles.categories}>
              {category.map((cat, index) => (
                <span key={index} className={styles.category}>
                  {cat}
                </span>
              ))}
            </div>
          )}
        </header>

        {shortDescription && (
          <p className={styles.shortDescription}>{shortDescription}</p>
        )}

        {description && (
          <div className={styles.description}>
            <h2 className={styles.sectionTitle}>Description</h2>
            <p>{description}</p>
          </div>
        )}

        {features.length > 0 && (
          <div className={styles.features}>
            <h2 className={styles.sectionTitle}>Features</h2>
            <ul className={styles.featureList}>
              {features.map((feature, index) => (
                <li key={index} className={styles.feature}>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        {specifications.length > 0 && (
          <div className={styles.specifications}>
            <h2 className={styles.sectionTitle}>Specifications</h2>
            <dl className={styles.specList}>
              {specifications.map((spec, index) => (
                <React.Fragment key={index}>
                  <dt className={styles.specKey}>{spec.key}</dt>
                  <dd className={styles.specValue}>{spec.value}</dd>
                </React.Fragment>
              ))}
            </dl>
          </div>
        )}
      </div>
    </article>
  );
};

export default ProductDetail;