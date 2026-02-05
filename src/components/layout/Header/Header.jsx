import React from 'react';
import styles from './Header.module.css';

const Header = ({
  children,
  className = '',
  logo,
  navigation,
  ...props
}) => {
  const headerClass = `
    ${styles.header}
    ${className}
  `.trim();

  return (
    <header className={headerClass} {...props}>
      <div className={styles.container}>
        {logo && (
          <div className={styles.logo}>
            {logo}
          </div>
        )}

        {navigation && (
          <div className={styles.navigation}>
            {navigation}
          </div>
        )}

        {children}
      </div>
    </header>
  );
};

export default Header;