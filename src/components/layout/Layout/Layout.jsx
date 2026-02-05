import React from 'react';
import styles from './Layout.module.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Navigation from '../Navigation/Navigation';

const Layout = ({
  children,
  className = '',
  hideHeader = false,
  hideFooter = false,
  headerProps = {},
  footerProps = {},
  navigationItems = [],
  ...props
}) => {
  const layoutClass = `
    ${styles.layout}
    ${className}
  `.trim();

  return (
    <div className={layoutClass} {...props}>
      {!hideHeader && (
        <Header
          logo={<div className={styles.logo}>Lingerie Website</div>}
          navigation={<Navigation items={navigationItems} />}
          {...headerProps}
        />
      )}

      <main className={styles.main}>
        {children}
      </main>

      {!hideFooter && (
        <Footer {...footerProps} />
      )}
    </div>
  );
};

export default Layout;