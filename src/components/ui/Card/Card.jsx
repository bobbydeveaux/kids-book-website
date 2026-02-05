import React from 'react';
import styles from './Card.module.css';

const Card = ({
  children,
  className = '',
  padding = 'medium',
  shadow = true,
  ...props
}) => {
  const cardClass = `
    ${styles.card}
    ${styles[padding]}
    ${shadow ? styles.shadow : ''}
    ${className}
  `.trim();

  return (
    <div className={cardClass} {...props}>
      {children}
    </div>
  );
};

export default Card;