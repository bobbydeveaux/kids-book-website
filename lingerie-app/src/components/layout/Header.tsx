import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.logo}>
          Lingerie Collection
        </Link>
        {/* TODO: Add navigation menu */}
      </nav>
    </header>
  );
};

export default Header;
