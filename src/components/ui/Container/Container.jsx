import React from 'react';
import styles from './Container.module.css';

const Container = ({
  children,
  className = '',
  size = 'default',
  padding = true,
  center = true,
  ...props
}) => {
  const containerClass = `
    ${styles.container}
    ${styles[size]}
    ${padding ? styles.padding : ''}
    ${center ? styles.center : ''}
    ${className}
  `.trim();

  return (
    <div className={containerClass} {...props}>
      {children}
    </div>
  );
};

export default Container;