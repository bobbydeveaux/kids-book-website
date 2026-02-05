import React, { useState } from 'react';
import styles from './Navigation.module.css';

const Navigation = ({
  className = '',
  items = [],
  children,
  ...props
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navClass = `
    ${styles.navigation}
    ${className}
  `.trim();

  const menuClass = `
    ${styles.menu}
    ${isMobileMenuOpen ? styles.open : ''}
  `.trim();

  const defaultItems = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  const navigationItems = items.length > 0 ? items : defaultItems;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={navClass} {...props}>
      {/* Mobile menu button */}
      <button
        className={styles.mobileToggle}
        onClick={toggleMobileMenu}
        aria-label="Toggle navigation menu"
      >
        <span className={styles.hamburger}>
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>

      {/* Navigation menu */}
      <ul className={menuClass}>
        {navigationItems.map((item, index) => (
          <li key={index} className={styles.item}>
            <a
              href={item.href}
              className={styles.link}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      {children}
    </nav>
  );
};

export default Navigation;