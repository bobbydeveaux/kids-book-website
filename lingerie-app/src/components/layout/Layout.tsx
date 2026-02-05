import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout: React.FC = () => {
  return (
    <div
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      <Header />
      <main style={{ flex: 1, padding: '20px' }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
