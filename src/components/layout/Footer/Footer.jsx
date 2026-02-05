import React from 'react';
import styles from './Footer.module.css';

const Footer = ({
  children,
  className = '',
  ...props
}) => {
  const footerClass = `
    ${styles.footer}
    ${className}
  `.trim();

  return (
    <footer className={footerClass} {...props}>
      <div className={styles.container}>
        {children || (
          <div className={styles.content}>
            <div className={styles.section}>
              <h3 className={styles.title}>Company</h3>
              <ul className={styles.links}>
                <li><a href="/about">About Us</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </div>

            <div className={styles.section}>
              <h3 className={styles.title}>Customer Service</h3>
              <ul className={styles.links}>
                <li><a href="/shipping">Shipping Info</a></li>
                <li><a href="/returns">Returns</a></li>
              </ul>
            </div>

            <div className={styles.section}>
              <h3 className={styles.title}>Follow Us</h3>
              <ul className={styles.links}>
                <li><a href="/social">Social Media</a></li>
              </ul>
            </div>
          </div>
        )}

        <div className={styles.bottom}>
          <p>&copy; 2026 Lingerie Website. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;