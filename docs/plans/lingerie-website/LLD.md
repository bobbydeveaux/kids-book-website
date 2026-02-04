# Low-Level Design: lingerie-website

**Created:** 2026-02-04T22:10:43Z
**Status:** Draft

## 1. Implementation Overview

<!-- AI: Brief summary of implementation approach -->

The lingerie website will be implemented as a React 18.3+ Single Page Application using Vite 5+ as the build tool. The implementation follows a component-based architecture with static JSON data storage.

**Implementation Phases:**
1. **Project Setup**: Initialize Vite + React project with routing and basic structure
2. **Data Layer**: Create product and category JSON files with data service module
3. **UI Components**: Build reusable components (Button, Card, Image, Grid)
4. **Layout Components**: Implement Header, Footer, Navigation, and page Layout wrapper
5. **Product Components**: Create ProductCard, ProductGrid, ProductDetail, ProductImage components
6. **Pages**: Implement Home, ProductDetail, and NotFound pages
7. **Routing**: Configure React Router with client-side navigation
8. **Styling**: Implement responsive CSS Modules for all components
9. **Optimization**: Add lazy loading, code splitting, and image optimization
10. **Testing**: Unit tests for components and integration tests for routing

**Key Implementation Decisions:**
- Functional components with React hooks (no class components)
- CSS Modules for scoped styling with BEM naming convention
- Mobile-first responsive design with breakpoints at 640px, 768px, 1024px, 1280px
- Route-based code splitting using React.lazy()
- PropTypes for runtime type checking (TypeScript optional for future)
- ESLint + Prettier for code quality

**Development Workflow:**
1. Local development with Vite dev server (HMR enabled)
2. Build production bundle with `npm run build`
3. Preview production build locally with `npm run preview`
4. Deploy `/dist` folder to static hosting (user handles CI/CD separately)

---

## 2. File Structure

<!-- AI: List all new and modified files with descriptions -->

```
lingerie-website/
├── public/
│   ├── images/
│   │   ├── products/              # Product images (organized by product ID)
│   │   │   ├── prod-001-thumb.jpg
│   │   │   ├── prod-001-main.jpg
│   │   │   ├── prod-001-1.jpg
│   │   │   └── prod-001-2.jpg
│   │   └── logo.svg               # Site logo
│   ├── favicon.ico
│   └── robots.txt
│
├── src/
│   ├── components/
│   │   ├── ui/                    # Reusable UI components
│   │   │   ├── Button/
│   │   │   │   ├── Button.jsx
│   │   │   │   └── Button.module.css
│   │   │   ├── Card/
│   │   │   │   ├── Card.jsx
│   │   │   │   └── Card.module.css
│   │   │   ├── Image/
│   │   │   │   ├── Image.jsx      # Optimized image with lazy loading
│   │   │   │   └── Image.module.css
│   │   │   ├── Grid/
│   │   │   │   ├── Grid.jsx       # Responsive grid container
│   │   │   │   └── Grid.module.css
│   │   │   ├── Container/
│   │   │   │   ├── Container.jsx  # Max-width content wrapper
│   │   │   │   └── Container.module.css
│   │   │   └── Link/
│   │   │       ├── Link.jsx       # Styled router link
│   │   │       └── Link.module.css
│   │   │
│   │   ├── layout/                # Layout components
│   │   │   ├── Header/
│   │   │   │   ├── Header.jsx
│   │   │   │   └── Header.module.css
│   │   │   ├── Footer/
│   │   │   │   ├── Footer.jsx
│   │   │   │   └── Footer.module.css
│   │   │   ├── Navigation/
│   │   │   │   ├── Navigation.jsx
│   │   │   │   └── Navigation.module.css
│   │   │   └── Layout/
│   │   │       ├── Layout.jsx     # Main layout wrapper
│   │   │       └── Layout.module.css
│   │   │
│   │   └── product/               # Product-specific components
│   │       ├── ProductCard/
│   │       │   ├── ProductCard.jsx
│   │       │   └── ProductCard.module.css
│   │       ├── ProductGrid/
│   │       │   ├── ProductGrid.jsx
│   │       │   └── ProductGrid.module.css
│   │       ├── ProductDetail/
│   │       │   ├── ProductDetail.jsx
│   │       │   └── ProductDetail.module.css
│   │       ├── ProductImage/
│   │       │   ├── ProductImage.jsx
│   │       │   └── ProductImage.module.css
│   │       ├── ProductFeatures/
│   │       │   ├── ProductFeatures.jsx
│   │       │   └── ProductFeatures.module.css
│   │       └── ProductSpecifications/
│   │           ├── ProductSpecifications.jsx
│   │           └── ProductSpecifications.module.css
│   │
│   ├── pages/                     # Page components (routes)
│   │   ├── Home/
│   │   │   ├── Home.jsx
│   │   │   └── Home.module.css
│   │   ├── ProductDetailPage/
│   │   │   ├── ProductDetailPage.jsx
│   │   │   └── ProductDetailPage.module.css
│   │   └── NotFound/
│   │       ├── NotFound.jsx
│   │       └── NotFound.module.css
│   │
│   ├── data/                      # Static data files
│   │   ├── products.json          # All product data
│   │   ├── categories.json        # Category definitions
│   │   └── featured.json          # Featured product IDs
│   │
│   ├── services/                  # Data access layer
│   │   └── productService.js      # Product data access functions
│   │
│   ├── utils/                     # Utility functions
│   │   ├── constants.js           # App constants (routes, breakpoints)
│   │   ├── helpers.js             # Helper functions (formatting, etc.)
│   │   └── validators.js          # Validation functions
│   │
│   ├── hooks/                     # Custom React hooks
│   │   ├── useProduct.js          # Hook for fetching product data
│   │   └── useScrollToTop.js      # Hook for scroll-to-top on route change
│   │
│   ├── styles/                    # Global styles
│   │   ├── global.css             # Global CSS reset and base styles
│   │   └── variables.css          # CSS custom properties (colors, spacing)
│   │
│   ├── App.jsx                    # Root component with router
│   ├── App.module.css             # App-level styles
│   ├── main.jsx                   # Entry point
│   └── ErrorBoundary.jsx          # Error boundary component
│
├── .eslintrc.cjs                  # ESLint configuration
├── .prettierrc                    # Prettier configuration
├── .gitignore                     # Git ignore rules
├── index.html                     # HTML entry point
├── package.json                   # NPM dependencies and scripts
├── vite.config.js                 # Vite configuration
├── README.md                      # Project documentation
└── _redirects                     # Netlify redirects for SPA routing

```

**New Files:** All files listed above (new project)

**Modified Files:** None (new project)

**Configuration Files:**
- `vite.config.js`: Build configuration, code splitting, performance budgets
- `package.json`: Dependencies, scripts, project metadata
- `.eslintrc.cjs`: Linting rules for React and accessibility
- `.prettierrc`: Code formatting rules
- `_redirects`: Netlify SPA routing configuration

---

## 3. Detailed Component Designs

<!-- AI: For each major component from HLD, provide detailed design -->

### 3.1 App Shell (App.jsx)

**Purpose:** Root component that sets up routing and global error handling.

**Implementation:**
```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layout from './components/layout/Layout/Layout';
import ErrorBoundary from './ErrorBoundary';
import Home from './pages/Home/Home';
import styles from './App.module.css';

// Lazy load product detail page
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage/ProductDetailPage'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className={styles.app}>
          <Layout>
            <Suspense fallback={<div className={styles.loading}>Loading...</div>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products/:slug" element={<ProductDetailPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </Layout>
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
```

**CSS Module (App.module.css):**
```css
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  font-size: 1.125rem;
  color: var(--color-text-secondary);
}
```

---

### 3.2 Layout Components

#### Header Component

**File:** `src/components/layout/Header/Header.jsx`

**Implementation:**
```jsx
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import Container from '../../ui/Container/Container';
import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.headerContent}>
          <Link to="/" className={styles.logo}>
            <img src="/images/logo.svg" alt="Lingerie Website" />
            <span className={styles.logoText}>Lingerie</span>
          </Link>
          <Navigation />
        </div>
      </Container>
    </header>
  );
}

export default Header;
```

**CSS Module (Header.module.css):**
```css
.header {
  background-color: var(--color-background);
  border-bottom: 1px solid var(--color-border);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.headerContent {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: var(--color-text-primary);
  font-size: 1.25rem;
  font-weight: 600;
}

.logo img {
  height: 2rem;
  width: auto;
}

@media (max-width: 640px) {
  .logoText {
    display: none;
  }
}
```

#### Navigation Component

**File:** `src/components/layout/Navigation/Navigation.jsx`

**Implementation:**
```jsx
import { Link } from 'react-router-dom';
import { getCategories } from '../../../services/productService';
import styles from './Navigation.module.css';

function Navigation() {
  const categories = getCategories();

  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li>
          <Link to="/" className={styles.navLink}>Home</Link>
        </li>
        {categories.slice(0, 4).map(category => (
          <li key={category.id}>
            <Link to={`/?category=${category.slug}`} className={styles.navLink}>
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
```

#### Footer Component

**File:** `src/components/layout/Footer/Footer.jsx`

**Implementation:**
```jsx
import Container from '../../ui/Container/Container';
import styles from './Footer.module.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.footerContent}>
          <p className={styles.copyright}>
            &copy; {currentYear} Lingerie Website. All rights reserved.
          </p>
          <div className={styles.links}>
            <a href="#" className={styles.link}>Privacy Policy</a>
            <a href="#" className={styles.link}>Terms of Service</a>
            <a href="#" className={styles.link}>Contact</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
```

#### Layout Wrapper

**File:** `src/components/layout/Layout/Layout.jsx`

**Implementation:**
```jsx
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import styles from './Layout.module.css';

function Layout({ children }) {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        {children}
      </main>
      <Footer />
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
```

---

### 3.3 Product Components

#### ProductCard Component

**File:** `src/components/product/ProductCard/ProductCard.jsx`

**Purpose:** Display product preview in grid/list views

**Implementation:**
```jsx
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Image from '../../ui/Image/Image';
import Card from '../../ui/Card/Card';
import styles from './ProductCard.module.css';

function ProductCard({ product }) {
  return (
    <Card className={styles.productCard}>
      <Link to={`/products/${product.slug}`} className={styles.link}>
        <div className={styles.imageWrapper}>
          <Image
            src={product.images.thumbnail}
            alt={product.name}
            className={styles.image}
            loading="lazy"
          />
        </div>
        <div className={styles.content}>
          <h3 className={styles.name}>{product.name}</h3>
          <p className={styles.description}>{product.shortDescription}</p>
          {product.price && (
            <p className={styles.price}>{product.price.display}</p>
          )}
        </div>
      </Link>
    </Card>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    shortDescription: PropTypes.string.isRequired,
    images: PropTypes.shape({
      thumbnail: PropTypes.string.isRequired,
    }).isRequired,
    price: PropTypes.shape({
      display: PropTypes.string,
    }),
  }).isRequired,
};

export default ProductCard;
```

**CSS Module (ProductCard.module.css):**
```css
.productCard {
  height: 100%;
  transition: transform 0.2s, box-shadow 0.2s;
}

.productCard:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.link {
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.imageWrapper {
  position: relative;
  width: 100%;
  padding-top: 133.33%; /* 3:4 aspect ratio */
  overflow: hidden;
  background-color: var(--color-background-secondary);
}

.image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.content {
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.name {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: var(--color-text-primary);
}

.description {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin: 0 0 0.75rem 0;
  flex: 1;
  line-height: 1.5;
}

.price {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-primary);
  margin: 0;
}
```

#### ProductGrid Component

**File:** `src/components/product/ProductGrid/ProductGrid.jsx`

**Implementation:**
```jsx
import PropTypes from 'prop-types';
import ProductCard from '../ProductCard/ProductCard';
import Grid from '../../ui/Grid/Grid';
import styles from './ProductGrid.module.css';

function ProductGrid({ products, columns = { mobile: 1, tablet: 2, desktop: 3 } }) {
  if (!products || products.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No products found.</p>
      </div>
    );
  }

  return (
    <Grid columns={columns} className={styles.grid}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Grid>
  );
}

ProductGrid.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.shape({
    mobile: PropTypes.number,
    tablet: PropTypes.number,
    desktop: PropTypes.number,
  }),
};

export default ProductGrid;
```

#### ProductDetail Component

**File:** `src/components/product/ProductDetail/ProductDetail.jsx`

**Implementation:**
```jsx
import PropTypes from 'prop-types';
import ProductImage from '../ProductImage/ProductImage';
import ProductFeatures from '../ProductFeatures/ProductFeatures';
import ProductSpecifications from '../ProductSpecifications/ProductSpecifications';
import Container from '../../ui/Container/Container';
import styles from './ProductDetail.module.css';

function ProductDetail({ product }) {
  return (
    <Container>
      <div className={styles.productDetail}>
        <div className={styles.imageSection}>
          <ProductImage images={product.images} alt={product.name} />
        </div>
        
        <div className={styles.infoSection}>
          <h1 className={styles.name}>{product.name}</h1>
          
          {product.price && (
            <p className={styles.price}>{product.price.display}</p>
          )}
          
          <div className={styles.description}>
            <p>{product.description}</p>
          </div>
          
          {product.features && product.features.length > 0 && (
            <ProductFeatures features={product.features} />
          )}
          
          {product.specifications && product.specifications.length > 0 && (
            <ProductSpecifications specifications={product.specifications} />
          )}
        </div>
      </div>
    </Container>
  );
}

ProductDetail.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    images: PropTypes.object.isRequired,
    features: PropTypes.arrayOf(PropTypes.string),
    specifications: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })),
    price: PropTypes.shape({
      display: PropTypes.string,
    }),
  }).isRequired,
};

export default ProductDetail;
```

**CSS Module (ProductDetail.module.css):**
```css
.productDetail {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  padding: 2rem 0;
}

@media (min-width: 768px) {
  .productDetail {
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }
}

@media (min-width: 1024px) {
  .productDetail {
    gap: 4rem;
  }
}

.imageSection {
  position: relative;
}

.infoSection {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.name {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  color: var(--color-text-primary);
}

.price {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-primary);
  margin: 0;
}

.description {
  line-height: 1.6;
  color: var(--color-text-secondary);
}
```

#### ProductImage Component

**File:** `src/components/product/ProductImage/ProductImage.jsx`

**Implementation:**
```jsx
import { useState } from 'react';
import PropTypes from 'prop-types';
import Image from '../../ui/Image/Image';
import styles from './ProductImage.module.css';

function ProductImage({ images, alt }) {
  const [currentImage, setCurrentImage] = useState(images.main);
  const gallery = [images.main, ...(images.gallery || [])];

  return (
    <div className={styles.productImage}>
      <div className={styles.mainImageWrapper}>
        <Image
          src={currentImage}
          alt={alt}
          className={styles.mainImage}
        />
      </div>
      
      {gallery.length > 1 && (
        <div className={styles.thumbnails}>
          {gallery.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(image)}
              className={`${styles.thumbnail} ${image === currentImage ? styles.active : ''}`}
              aria-label={`View image ${index + 1}`}
            >
              <Image src={image} alt={`${alt} - view ${index + 1}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

ProductImage.propTypes = {
  images: PropTypes.shape({
    main: PropTypes.string.isRequired,
    gallery: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  alt: PropTypes.string.isRequired,
};

export default ProductImage;
```

#### ProductFeatures Component

**File:** `src/components/product/ProductFeatures/ProductFeatures.jsx`

**Implementation:**
```jsx
import PropTypes from 'prop-types';
import styles from './ProductFeatures.module.css';

function ProductFeatures({ features }) {
  return (
    <div className={styles.features}>
      <h2 className={styles.heading}>Features</h2>
      <ul className={styles.list}>
        {features.map((feature, index) => (
          <li key={index} className={styles.item}>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}

ProductFeatures.propTypes = {
  features: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProductFeatures;
```

#### ProductSpecifications Component

**File:** `src/components/product/ProductSpecifications/ProductSpecifications.jsx`

**Implementation:**
```jsx
import PropTypes from 'prop-types';
import styles from './ProductSpecifications.module.css';

function ProductSpecifications({ specifications }) {
  return (
    <div className={styles.specifications}>
      <h2 className={styles.heading}>Specifications</h2>
      <dl className={styles.list}>
        {specifications.map((spec, index) => (
          <div key={index} className={styles.item}>
            <dt className={styles.key}>{spec.key}</dt>
            <dd className={styles.value}>{spec.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

ProductSpecifications.propTypes = {
  specifications: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ProductSpecifications;
```

---

### 3.4 UI Components

#### Button Component

**File:** `src/components/ui/Button/Button.jsx`

**Implementation:**
```jsx
import PropTypes from 'prop-types';
import styles from './Button.module.css';

function Button({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  onClick,
  disabled = false,
  type = 'button',
  className = '',
  ...props 
}) {
  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
};

export default Button;
```

#### Card Component

**File:** `src/components/ui/Card/Card.jsx`

**Implementation:**
```jsx
import PropTypes from 'prop-types';
import styles from './Card.module.css';

function Card({ children, className = '', ...props }) {
  return (
    <div className={`${styles.card} ${className}`} {...props}>
      {children}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Card;
```

#### Image Component

**File:** `src/components/ui/Image/Image.jsx`

**Implementation:**
```jsx
import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Image.module.css';

function Image({ 
  src, 
  alt, 
  className = '', 
  loading = 'lazy',
  onError,
  ...props 
}) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const handleError = (e) => {
    setError(true);
    if (onError) onError(e);
  };

  const handleLoad = () => {
    setLoaded(true);
  };

  if (error) {
    return (
      <div className={`${styles.placeholder} ${className}`}>
        <span className={styles.placeholderText}>Image not available</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      onError={handleError}
      onLoad={handleLoad}
      className={`${styles.image} ${loaded ? styles.loaded : ''} ${className}`}
      {...props}
    />
  );
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  loading: PropTypes.oneOf(['lazy', 'eager']),
  onError: PropTypes.func,
};

export default Image;
```

#### Grid Component

**File:** `src/components/ui/Grid/Grid.jsx`

**Implementation:**
```jsx
import PropTypes from 'prop-types';
import styles from './Grid.module.css';

function Grid({ 
  children, 
  columns = { mobile: 1, tablet: 2, desktop: 3 },
  gap = 'medium',
  className = '' 
}) {
  const gridStyle = {
    '--grid-cols-mobile': columns.mobile,
    '--grid-cols-tablet': columns.tablet,
    '--grid-cols-desktop': columns.desktop,
  };

  return (
    <div 
      className={`${styles.grid} ${styles[`gap-${gap}`]} ${className}`}
      style={gridStyle}
    >
      {children}
    </div>
  );
}

Grid.propTypes = {
  children: PropTypes.node.isRequired,
  columns: PropTypes.shape({
    mobile: PropTypes.number,
    tablet: PropTypes.number,
    desktop: PropTypes.number,
  }),
  gap: PropTypes.oneOf(['small', 'medium', 'large']),
  className: PropTypes.string,
};

export default Grid;
```

**CSS Module (Grid.module.css):**
```css
.grid {
  display: grid;
  grid-template-columns: repeat(var(--grid-cols-mobile, 1), 1fr);
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(var(--grid-cols-tablet, 2), 1fr);
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(var(--grid-cols-desktop, 3), 1fr);
  }
}

.gap-small {
  gap: 1rem;
}

.gap-medium {
  gap: 1.5rem;
}

.gap-large {
  gap: 2rem;
}
```

#### Container Component

**File:** `src/components/ui/Container/Container.jsx`

**Implementation:**
```jsx
import PropTypes from 'prop-types';
import styles from './Container.module.css';

function Container({ children, size = 'default', className = '' }) {
  return (
    <div className={`${styles.container} ${styles[size]} ${className}`}>
      {children}
    </div>
  );
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(['default', 'narrow', 'wide']),
  className: PropTypes.string,
};

export default Container;
```

---

### 3.5 Page Components

#### Home Page

**File:** `src/pages/Home/Home.jsx`

**Implementation:**
```jsx
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Container from '../../components/ui/Container/Container';
import ProductGrid from '../../components/product/ProductGrid/ProductGrid';
import { getProducts, getProductsByCategory, getFeaturedProducts } from '../../services/productService';
import styles from './Home.module.css';

function Home() {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');
  
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (categoryFilter) {
      setProducts(getProductsByCategory(categoryFilter));
    } else {
      setProducts(getFeaturedProducts());
    }
  }, [categoryFilter]);

  return (
    <div className={styles.home}>
      <Container>
        <section className={styles.hero}>
          <h1 className={styles.title}>
            {categoryFilter ? `${categoryFilter} Collection` : 'Featured Products'}
          </h1>
          <p className={styles.subtitle}>
            Discover our collection of elegant and comfortable lingerie
          </p>
        </section>

        <section className={styles.products}>
          <ProductGrid products={products} />
        </section>
      </Container>
    </div>
  );
}

export default Home;
```

#### Product Detail Page

**File:** `src/pages/ProductDetailPage/ProductDetailPage.jsx`

**Implementation:**
```jsx
import { useParams, Navigate } from 'react-router-dom';
import ProductDetail from '../../components/product/ProductDetail/ProductDetail';
import { useProduct } from '../../hooks/useProduct';
import { useScrollToTop } from '../../hooks/useScrollToTop';
import styles from './ProductDetailPage.module.css';

function ProductDetailPage() {
  const { slug } = useParams();
  const product = useProduct(slug);
  
  useScrollToTop();

  if (!product) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className={styles.productDetailPage}>
      <ProductDetail product={product} />
    </div>
  );
}

export default ProductDetailPage;
```

#### Not Found Page

**File:** `src/pages/NotFound/NotFound.jsx`

**Implementation:**
```jsx
import { Link } from 'react-router-dom';
import Container from '../../components/ui/Container/Container';
import Button from '../../components/ui/Button/Button';
import styles from './NotFound.module.css';

function NotFound() {
  return (
    <Container>
      <div className={styles.notFound}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.message}>Page not found</p>
        <p className={styles.description}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button>Return Home</Button>
        </Link>
      </div>
    </Container>
  );
}

export default NotFound;
```

---

### 3.6 Error Boundary

**File:** `src/ErrorBoundary.jsx`

**Implementation:**
```jsx
import { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '2rem', 
          textAlign: 'center',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <h1>Something went wrong</h1>
          <p>We're sorry for the inconvenience. Please try refreshing the page.</p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              marginTop: '1rem',
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
```

---

## 4. Database Schema Changes

<!-- AI: SQL/migration scripts for schema changes -->

**N/A - No Database**

This is a static site with no database. All data is stored in static JSON files.

---

## 5. API Implementation Details

<!-- AI: For each API endpoint, specify handler logic, validation, error handling -->

**N/A - No Backend API**

This is a fully client-side application. The "API" layer consists of internal data service functions.

### Product Service Module

**File:** `src/services/productService.js`

**Implementation:**
```javascript
import productsData from '../data/products.json';
import categoriesData from '../data/categories.json';
import featuredData from '../data/featured.json';

/**
 * Get all products
 * @returns {Array} Array of all product objects
 */
export function getProducts() {
  return productsData;
}

/**
 * Get a single product by ID
 * @param {string} id - Product ID
 * @returns {Object|undefined} Product object or undefined if not found
 */
export function getProductById(id) {
  return productsData.find(product => product.id === id);
}

/**
 * Get a single product by slug (for routing)
 * @param {string} slug - Product slug (URL-friendly identifier)
 * @returns {Object|undefined} Product object or undefined if not found
 */
export function getProductBySlug(slug) {
  return productsData.find(product => product.slug === slug);
}

/**
 * Get products filtered by category
 * @param {string} categorySlug - Category slug
 * @returns {Array} Array of products in the category
 */
export function getProductsByCategory(categorySlug) {
  return productsData.filter(product => {
    if (Array.isArray(product.category)) {
      return product.category.includes(categorySlug);
    }
    return product.category === categorySlug;
  }).sort((a, b) => (a.metadata?.order || 0) - (b.metadata?.order || 0));
}

/**
 * Get featured products
 * @returns {Array} Array of featured products sorted by order
 */
export function getFeaturedProducts() {
  const featuredIds = featuredData.featuredProductIds || [];
  
  if (featuredIds.length > 0) {
    return featuredIds
      .map(id => getProductById(id))
      .filter(Boolean);
  }
  
  // Fallback: get products marked as featured in metadata
  return productsData
    .filter(product => product.metadata?.featured === true)
    .sort((a, b) => (a.metadata?.order || 0) - (b.metadata?.order || 0));
}

/**
 * Get all categories
 * @returns {Array} Array of category objects sorted by order
 */
export function getCategories() {
  return categoriesData.sort((a, b) => (a.order || 0) - (b.order || 0));
}

/**
 * Get a single category by slug
 * @param {string} slug - Category slug
 * @returns {Object|undefined} Category object or undefined if not found
 */
export function getCategoryBySlug(slug) {
  return categoriesData.find(category => category.slug === slug);
}

/**
 * Search products by name or description
 * @param {string} query - Search query string
 * @returns {Array} Array of matching products
 */
export function searchProducts(query) {
  const lowerQuery = query.toLowerCase().trim();
  
  if (!lowerQuery) return [];
  
  return productsData.filter(product => {
    const nameMatch = product.name.toLowerCase().includes(lowerQuery);
    const descMatch = product.description.toLowerCase().includes(lowerQuery);
    const shortDescMatch = product.shortDescription.toLowerCase().includes(lowerQuery);
    
    return nameMatch || descMatch || shortDescMatch;
  });
}
```

**Validation Logic:**
- All functions return safe values (empty arrays instead of null)
- ID/slug lookups return `undefined` if not found (components handle gracefully)
- Category filtering handles both string and array category values
- Search sanitizes input with lowercase and trim

**Error Handling:**
- JSON parse errors caught at module import level
- Invalid IDs/slugs return undefined (components show 404)
- Missing data files would cause app initialization failure (intentional - data is required)

---

## 6. Function Signatures

<!-- AI: Key function/method signatures with parameters and return types -->

### Data Service Functions

```javascript
// Product Service (src/services/productService.js)

/**
 * @returns {Product[]}
 */
getProducts(): Product[]

/**
 * @param {string} id
 * @returns {Product | undefined}
 */
getProductById(id: string): Product | undefined

/**
 * @param {string} slug
 * @returns {Product | undefined}
 */
getProductBySlug(slug: string): Product | undefined

/**
 * @param {string} categorySlug
 * @returns {Product[]}
 */
getProductsByCategory(categorySlug: string): Product[]

/**
 * @returns {Product[]}
 */
getFeaturedProducts(): Product[]

/**
 * @returns {Category[]}
 */
getCategories(): Category[]

/**
 * @param {string} slug
 * @returns {Category | undefined}
 */
getCategoryBySlug(slug: string): Category | undefined

/**
 * @param {string} query
 * @returns {Product[]}
 */
searchProducts(query: string): Product[]
```

### Custom Hooks

```javascript
// useProduct Hook (src/hooks/useProduct.js)

/**
 * Fetches and returns a product by slug
 * @param {string} slug - Product slug from URL params
 * @returns {Product | null} Product object or null if not found
 */
useProduct(slug: string): Product | null

// useScrollToTop Hook (src/hooks/useScrollToTop.js)

/**
 * Scrolls to top of page on mount (for route changes)
 * @returns {void}
 */
useScrollToTop(): void
```

### Component Props Interfaces

```javascript
// ProductCard (src/components/product/ProductCard/ProductCard.jsx)
interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    shortDescription: string;
    images: {
      thumbnail: string;
    };
    price?: {
      display: string;
    };
  };
}

// ProductGrid (src/components/product/ProductGrid/ProductGrid.jsx)
interface ProductGridProps {
  products: Product[];
  columns?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
}

// ProductDetail (src/components/product/ProductDetail/ProductDetail.jsx)
interface ProductDetailProps {
  product: {
    name: string;
    description: string;
    images: {
      main: string;
      gallery?: string[];
    };
    features?: string[];
    specifications?: Array<{
      key: string;
      value: string;
    }>;
    price?: {
      display: string;
    };
  };
}

// ProductImage (src/components/product/ProductImage/ProductImage.jsx)
interface ProductImageProps {
  images: {
    main: string;
    gallery?: string[];
  };
  alt: string;
}

// ProductFeatures (src/components/product/ProductFeatures/ProductFeatures.jsx)
interface ProductFeaturesProps {
  features: string[];
}

// ProductSpecifications (src/components/product/ProductSpecifications/ProductSpecifications.jsx)
interface ProductSpecificationsProps {
  specifications: Array<{
    key: string;
    value: string;
  }>;
}

// Button (src/components/ui/Button/Button.jsx)
interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

// Card (src/components/ui/Card/Card.jsx)
interface CardProps {
  children: ReactNode;
  className?: string;
}

// Image (src/components/ui/Image/Image.jsx)
interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  onError?: (e: Event) => void;
}

// Grid (src/components/ui/Grid/Grid.jsx)
interface GridProps {
  children: ReactNode;
  columns?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  gap?: 'small' | 'medium' | 'large';
  className?: string;
}

// Container (src/components/ui/Container/Container.jsx)
interface ContainerProps {
  children: ReactNode;
  size?: 'default' | 'narrow' | 'wide';
  className?: string;
}

// Layout (src/components/layout/Layout/Layout.jsx)
interface LayoutProps {
  children: ReactNode;
}
```

### Utility Functions

```javascript
// Constants (src/utils/constants.js)
export const ROUTES = {
  HOME: '/',
  PRODUCT_DETAIL: '/products/:slug',
  NOT_FOUND: '*'
}

export const BREAKPOINTS = {
  MOBILE: 640,
  TABLET: 768,
  DESKTOP: 1024,
  WIDE: 1280
}

// Helpers (src/utils/helpers.js)

/**
 * Format price for display
 * @param {number} amount
 * @param {string} currency
 * @returns {string}
 */
formatPrice(amount: number, currency: string = 'USD'): string

/**
 * Truncate text to specified length
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 */
truncateText(text: string, maxLength: number): string

/**
 * Generate slug from text
 * @param {string} text
 * @returns {string}
 */
generateSlug(text: string): string
```

---

## 7. State Management

<!-- AI: How application state is managed (Redux, Context, database) -->

### State Management Strategy

**Approach:** Minimal state management using React built-in hooks (useState, useEffect) and component-level state. No global state management library required.

**Rationale:**
- Application is primarily read-only with static data
- No complex state interactions between distant components
- No user authentication or session state
- No shopping cart or transactional state
- Keeps bundle size small and complexity low

### State Categories

#### 1. Component-Level State (useState)

**ProductImage Component:**
```javascript
const [currentImage, setCurrentImage] = useState(images.main);
// Manages currently displayed image in gallery
```

**Image Component:**
```javascript
const [error, setError] = useState(false);
const [loaded, setLoaded] = useState(false);
// Manages image loading and error states
```

**Home Page:**
```javascript
const [products, setProducts] = useState([]);
// Manages currently displayed products based on filters
```

#### 2. URL State (React Router)

**Product Detail Page:**
```javascript
const { slug } = useParams();
// Product slug from URL drives which product is displayed
```

**Home Page (Category Filter):**
```javascript
const [searchParams] = useSearchParams();
const categoryFilter = searchParams.get('category');
// Category filter from URL query parameter
```

**Navigation State:**
- Managed by React Router's BrowserRouter
- Browser history API handles back/forward navigation
- URL is single source of truth for current page

#### 3. Static Data (Imported Modules)

**Product Data:**
```javascript
import productsData from '../data/products.json';
// Loaded once at app initialization, never mutates
```

**Category Data:**
```javascript
import categoriesData from '../data/categories.json';
// Loaded once at app initialization, never mutates
```

**Featured Products:**
```javascript
import featuredData from '../data/featured.json';
// Loaded once at app initialization, never mutates
```

#### 4. Derived State (Computed Values)

**Filtered Products:**
```javascript
// In Home component
useEffect(() => {
  if (categoryFilter) {
    setProducts(getProductsByCategory(categoryFilter));
  } else {
    setProducts(getFeaturedProducts());
  }
}, [categoryFilter]);
// Products computed from category filter, not stored globally
```

**Current Product:**
```javascript
// In useProduct hook
const product = getProductBySlug(slug);
// Product computed from slug parameter, not stored globally
```

### Data Flow

**1. App Initialization:**
```
main.jsx (entry point)
  → App.jsx (router setup)
    → Static JSON imports (products, categories)
      → Modules cached by JavaScript runtime
```

**2. Navigation Flow:**
```
User clicks link
  → React Router updates URL
    → URL change triggers route component render
      → Component reads URL params (slug, query params)
        → Component calls productService functions
          → Service returns data from static imports
            → Component renders with data
```

**3. User Interaction Flow (Product Image Gallery):**
```
User clicks thumbnail
  → onClick handler calls setCurrentImage(image)
    → Component re-renders with new currentImage state
      → Display updates to show selected image
```

### State Persistence

**No Persistence Required:**
- All data is static and bundled with app
- No user preferences or settings to persist
- No shopping cart or user session
- Each page visit starts fresh

**Future Enhancements (Optional):**
```javascript
// Could add Local Storage for:
// - Recently viewed products
// - User preferences (theme, layout)
// - Saved favorites/wishlist

// Example implementation:
const [favorites, setFavorites] = useState(() => {
  const saved = localStorage.getItem('favorites');
  return saved ? JSON.parse(saved) : [];
});

useEffect(() => {
  localStorage.setItem('favorites', JSON.stringify(favorites));
}, [favorites]);
```

### No Global State Library Needed

**Redux/Zustand/MobX:** Not required because:
- No complex state shared across many components
- Parent-child prop passing is sufficient
- URL state handles navigation-related state
- Static data doesn't change at runtime
- No asynchronous state mutations

**React Context:** Not required because:
- No theme switching (could be added later)
- No user authentication
- No deeply nested component trees needing shared state
- Prop drilling is minimal with current component structure

### Custom Hooks for Reusable Logic

**useProduct Hook:**
```javascript
// src/hooks/useProduct.js
import { getProductBySlug } from '../services/productService';

export function useProduct(slug) {
  return getProductBySlug(slug);
}
```

**useScrollToTop Hook:**
```javascript
// src/hooks/useScrollToTop.js
import { useEffect } from 'react';

export function useScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
}
```

### State Management Best Practices

1. **Keep state local:** Only lift state up when multiple components need access
2. **Derive when possible:** Compute values from existing state rather than storing duplicates
3. **Use URL for navigation:** Product slug, category filters in URL (bookmarkable, shareable)
4. **Immutable updates:** Use functional updates with useState when needed
5. **Minimal re-renders:** Only store values that trigger UI updates

---

## 8. Error Handling Strategy

<!-- AI: Error codes, exception handling, user-facing messages -->

### Error Categories and Handling

#### 1. Application Initialization Errors

**JSON Data Loading Errors:**
```javascript
// If data files are missing or malformed, app will fail to start
// This is intentional - data is required for app to function

// Error caught at module import level
try {
  import productsData from '../data/products.json';
} catch (error) {
  // Build will fail if JSON is invalid
  // Runtime error if file is missing
  console.error('Failed to load product data:', error);
}
```

**User-Facing Message:** Error boundary catches and shows generic error page with refresh button.

#### 2. Routing Errors

**Product Not Found:**
```javascript
// ProductDetailPage.jsx
function ProductDetailPage() {
  const { slug } = useParams();
  const product = useProduct(slug);
  
  if (!product) {
    return <Navigate to="/404" replace />;
  }
  
  return <ProductDetail product={product} />;
}
```

**Invalid Route:**
```javascript
// App.jsx - catch-all route
<Route path="*" element={<NotFound />} />
```

**User-Facing Message:** "404 - Page not found" with link back to home page.

#### 3. Image Loading Errors

**Image Component Error Handling:**
```javascript
// Image.jsx
const [error, setError] = useState(false);

const handleError = (e) => {
  setError(true);
  console.error('Image failed to load:', e.target.src);
};

if (error) {
  return (
    <div className={styles.placeholder}>
      <span>Image not available</span>
    </div>
  );
}
```

**User-Facing Message:** Gray placeholder box with "Image not available" text.

#### 4. React Rendering Errors

**Error Boundary:**
```javascript
// ErrorBoundary.jsx
class ErrorBoundary extends Component {
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for debugging
    console.error('React error caught:', error, errorInfo);
    
    // Could send to error tracking service (Sentry, etc.)
    // sendToErrorService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallbackUI />;
    }
    return this.props.children;
  }
}
```

**User-Facing Message:** "Something went wrong" with refresh button.

#### 5. Network Errors (Future - if external images/CDN used)

**Retry Logic for Images:**
```javascript
// Future enhancement if using external CDN
const [retryCount, setRetryCount] = useState(0);

const handleError = () => {
  if (retryCount < 3) {
    setRetryCount(prev => prev + 1);
    // Force re-render to retry image load
  } else {
    setError(true);
  }
};
```

#### 6. Browser Compatibility Errors

**Modern Feature Detection:**
```javascript
// Check for required browser features at app initialization
if (!window.IntersectionObserver) {
  console.warn('IntersectionObserver not supported - lazy loading disabled');
  // Fallback: load images eagerly
}

if (!window.fetch) {
  console.error('Fetch API not supported - app may not work correctly');
  // Could show browser upgrade message
}
```

**User-Facing Message:** "Please upgrade to a modern browser" (if critical features missing).

### Error Logging Strategy

**Development Environment:**
```javascript
// Verbose console logging
console.error('Detailed error information:', error);
console.warn('Warning messages:', warning);
console.log('Debug information:', data);
```

**Production Environment:**
```javascript
// Minimal console logging (errors only)
console.error('Error:', error.message);

// Optional: Send to error tracking service
if (import.meta.env.PROD) {
  // Sentry.captureException(error);
}
```

**Build Configuration:**
```javascript
// vite.config.js
export default defineConfig({
  define: {
    'console.log': import.meta.env.PROD ? '() => {}' : 'console.log',
    // Remove console.log in production, keep console.error
  }
});
```

### Error Messages and User Communication

**Error Message Guidelines:**
1. **User-friendly:** Avoid technical jargon
2. **Actionable:** Tell user what they can do (refresh, go home, etc.)
3. **Consistent:** Same tone and style across app
4. **Helpful:** Provide clear next steps

**Example Error Messages:**

| Error Type | User Message | Action |
|------------|--------------|--------|
| Page not found | "Page not found. The page you're looking for doesn't exist or has been moved." | Link to home page |
| Image failed | "Image not available" | Show placeholder |
| App crash | "Something went wrong. We're sorry for the inconvenience." | Refresh button |
| No products | "No products found." | Clear filters or return home |
| Invalid category | Redirect to home | Show all products |

### Global Error Handler

**Window Error Events:**
```javascript
// main.jsx
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  // Could show toast notification or error banner
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  // Could show toast notification
});
```

### Validation and Input Sanitization

**No user input forms in initial version**, but future additions would include:

```javascript
// Example: Search input validation
function validateSearchQuery(query) {
  if (typeof query !== 'string') {
    throw new Error('Search query must be a string');
  }
  
  if (query.length > 100) {
    throw new Error('Search query too long');
  }
  
  // Sanitize for XSS prevention (React handles automatically)
  return query.trim();
}
```

### Error Recovery Strategies

**Graceful Degradation:**
- Image fails → Show placeholder
- Product not found → Redirect to 404 page
- Invalid category → Show all products
- Component error → Error boundary catches, show fallback UI

**No Automatic Retries:**
- Static assets should load first time (cached by CDN)
- Only implement retries if using external APIs (future)

### Error Boundary Placement

```javascript
// App.jsx - Global error boundary
<ErrorBoundary>
  <BrowserRouter>
    <Layout>
      {/* All routes protected */}
    </Layout>
  </BrowserRouter>
</ErrorBoundary>
```

**Future Enhancement:** Component-level error boundaries for isolated failures
```javascript
// Example: Product grid with isolated error handling
<ErrorBoundary fallback={<p>Unable to load products</p>}>
  <ProductGrid products={products} />
</ErrorBoundary>
```

---

## 9. Test Plan

### Unit Tests

**Testing Framework:** Vitest (Vite-native test runner) + React Testing Library

**Setup:**
```javascript
// vitest.config.js
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
  },
});
```

#### Product Service Tests

**File:** `src/services/__tests__/productService.test.js`

```javascript
import { describe, it, expect } from 'vitest';
import {
  getProducts,
  getProductById,
  getProductBySlug,
  getProductsByCategory,
  getFeaturedProducts,
  getCategories,
  searchProducts
} from '../productService';

describe('productService', () => {
  describe('getProducts', () => {
    it('should return an array of products', () => {
      const products = getProducts();
      expect(Array.isArray(products)).toBe(true);
      expect(products.length).toBeGreaterThan(0);
    });
  });

  describe('getProductById', () => {
    it('should return a product with matching ID', () => {
      const product = getProductById('prod-001');
      expect(product).toBeDefined();
      expect(product.id).toBe('prod-001');
    });

    it('should return undefined for non-existent ID', () => {
      const product = getProductById('invalid-id');
      expect(product).toBeUndefined();
    });
  });

  describe('getProductBySlug', () => {
    it('should return a product with matching slug', () => {
      const product = getProductBySlug('classic-lace-bralette');
      expect(product).toBeDefined();
      expect(product.slug).toBe('classic-lace-bralette');
    });

    it('should return undefined for non-existent slug', () => {
      const product = getProductBySlug('invalid-slug');
      expect(product).toBeUndefined();
    });
  });

  describe('getProductsByCategory', () => {
    it('should return products in specified category', () => {
      const products = getProductsByCategory('bralettes');
      expect(Array.isArray(products)).toBe(true);
      products.forEach(product => {
        const categories = Array.isArray(product.category) 
          ? product.category 
          : [product.category];
        expect(categories).toContain('bralettes');
      });
    });

    it('should return empty array for non-existent category', () => {
      const products = getProductsByCategory('invalid-category');
      expect(products).toEqual([]);
    });
  });

  describe('getFeaturedProducts', () => {
    it('should return array of featured products', () => {
      const products = getFeaturedProducts();
      expect(Array.isArray(products)).toBe(true);
      products.forEach(product => {
        expect(product.metadata?.featured).toBe(true);
      });
    });
  });

  describe('searchProducts', () => {
    it('should find products matching search query', () => {
      const results = searchProducts('lace');
      expect(Array.isArray(results)).toBe(true);
      results.forEach(product => {
        const matchFound = 
          product.name.toLowerCase().includes('lace') ||
          product.description.toLowerCase().includes('lace');
        expect(matchFound).toBe(true);
      });
    });

    it('should return empty array for empty query', () => {
      const results = searchProducts('');
      expect(results).toEqual([]);
    });
  });
});
```

#### Component Tests

**File:** `src/components/ui/Button/__tests__/Button.test.jsx`

```javascript
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../Button';

describe('Button', () => {
  it('should render with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should not call onClick when disabled', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick} disabled>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should apply variant classes', () => {
    const { container } = render(<Button variant="secondary">Button</Button>);
    expect(container.firstChild).toHaveClass('secondary');
  });
});
```

**File:** `src/components/product/ProductCard/__tests__/ProductCard.test.jsx`

```javascript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductCard from '../ProductCard';

const mockProduct = {
  id: 'prod-001',
  name: 'Test Product',
  slug: 'test-product',
  shortDescription: 'Test description',
  images: {
    thumbnail: '/images/test.jpg'
  },
  price: {
    display: '$29.99'
  }
};

describe('ProductCard', () => {
  it('should render product information', () => {
    render(
      <BrowserRouter>
        <ProductCard product={mockProduct} />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
    expect(screen.getByText('$29.99')).toBeInTheDocument();
  });

  it('should link to product detail page', () => {
    render(
      <BrowserRouter>
        <ProductCard product={mockProduct} />
      </BrowserRouter>
    );
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/products/test-product');
  });

  it('should render without price if not provided', () => {
    const productWithoutPrice = { ...mockProduct, price: undefined };
    render(
      <BrowserRouter>
        <ProductCard product={productWithoutPrice} />
      </BrowserRouter>
    );
    
    expect(screen.queryByText('$29.99')).not.toBeInTheDocument();
  });
});
```

**File:** `src/components/ui/Image/__tests__/Image.test.jsx`

```javascript
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Image from '../Image';

describe('Image', () => {
  it('should render image with correct attributes', () => {
    render(<Image src="/test.jpg" alt="Test image" />);
    const img = screen.getByAltText('Test image');
    expect(img).toHaveAttribute('src', '/test.jpg');
    expect(img).toHaveAttribute('loading', 'lazy');
  });

  it('should show placeholder on error', async () => {
    render(<Image src="/invalid.jpg" alt="Test" />);
    const img = screen.getByAltText('Test');
    
    fireEvent.error(img);
    
    await waitFor(() => {
      expect(screen.getByText('Image not available')).toBeInTheDocument();
    });
  });

  it('should call onError callback', () => {
    const onError = vi.fn();
    render(<Image src="/invalid.jpg" alt="Test" onError={onError} />);
    const img = screen.getByAltText('Test');
    
    fireEvent.error(img);
    
    expect(onError).toHaveBeenCalled();
  });
});
```

**Coverage Target:** 80%+ for utility functions and services, 70%+ for components

---

### Integration Tests

**Purpose:** Test component interactions and routing

**File:** `src/test/integration/navigation.test.jsx`

```javascript
import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import App from '../../App';

describe('Navigation Integration', () => {
  it('should navigate from home to product detail', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    // Wait for home page to load
    await waitFor(() => {
      expect(screen.getByText(/Featured Products/i)).toBeInTheDocument();
    });
    
    // Click on first product
    const productLinks = screen.getAllByRole('link');
    const firstProductLink = productLinks.find(link => 
      link.getAttribute('href')?.startsWith('/products/')
    );
    
    await user.click(firstProductLink);
    
    // Should navigate to product detail page
    await waitFor(() => {
      expect(window.location.pathname).toMatch(/\/products\/.+/);
    });
  });

  it('should show 404 page for invalid route', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    // Navigate to invalid route
    window.history.pushState({}, '', '/invalid-route');
    
    await waitFor(() => {
      expect(screen.getByText(/404/i)).toBeInTheDocument();
      expect(screen.getByText(/Page not found/i)).toBeInTheDocument();
    });
  });

  it('should filter products by category', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    // Click category link in navigation
    const categoryLink = screen.getByText(/Bralettes/i);
    await user.click(categoryLink);
    
    // URL should contain category parameter
    await waitFor(() => {
      expect(window.location.search).toContain('category=bralettes');
    });
  });
});
```

**File:** `src/test/integration/productFlow.test.jsx`

```javascript
import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductDetailPage from '../../pages/ProductDetailPage/ProductDetailPage';

// Mock useParams
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ slug: 'classic-lace-bralette' })
  };
});

describe('Product Detail Flow', () => {
  it('should display full product information', async () => {
    render(
      <BrowserRouter>
        <ProductDetailPage />
      </BrowserRouter>
    );
    
    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      expect(screen.getByText(/Features/i)).toBeInTheDocument();
      expect(screen.getByText(/Specifications/i)).toBeInTheDocument();
    });
  });

  it('should display product images', async () => {
    render(
      <BrowserRouter>
        <ProductDetailPage />
      </BrowserRouter>
    );
    
    await waitFor(() => {
      const images = screen.getAllByRole('img');
      expect(images.length).toBeGreaterThan(0);
    });
  });
});
```

---

### E2E Tests

**Testing Framework:** Playwright

**Setup:**
```javascript
// playwright.config.js
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
});
```

**File:** `e2e/homepage.spec.js`

```javascript
import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should display featured products', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.locator('h1')).toContainText('Featured Products');
    
    const productCards = page.locator('[data-testid="product-card"]');
    await expect(productCards).toHaveCount({ min: 1 });
  });

  test('should navigate to product detail on click', async ({ page }) => {
    await page.goto('/');
    
    const firstProduct = page.locator('[data-testid="product-card"]').first();
    await firstProduct.click();
    
    await expect(page).toHaveURL(/\/products\/.+/);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    const productGrid = page.locator('[data-testid="product-grid"]');
    await expect(productGrid).toBeVisible();
  });
});
```

**File:** `e2e/productDetail.spec.js`

```javascript
import { test, expect } from '@playwright/test';

test.describe('Product Detail Page', () => {
  test('should display product information', async ({ page }) => {
    await page.goto('/products/classic-lace-bralette');
    
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('img').first()).toBeVisible();
    await expect(page.getByText('Features')).toBeVisible();
    await expect(page.getByText('Specifications')).toBeVisible();
  });

  test('should switch product images on thumbnail click', async ({ page }) => {
    await page.goto('/products/classic-lace-bralette');
    
    const thumbnails = page.locator('[data-testid="thumbnail"]');
    const count = await thumbnails.count();
    
    if (count > 1) {
      await thumbnails.nth(1).click();
      // Verify image changed (check src attribute)
      const mainImage = page.locator('[data-testid="main-image"]');
      await expect(mainImage).toBeVisible();
    }
  });

  test('should show 404 for non-existent product', async ({ page }) => {
    await page.goto('/products/non-existent-product');
    
    await expect(page.locator('h1')).toContainText('404');
  });
});
```

**File:** `e2e/navigation.spec.js`

```javascript
import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate through category links', async ({ page }) => {
    await page.goto('/');
    
    const categoryLink = page.getByRole('link', { name: /Bralettes/i });
    await categoryLink.click();
    
    await expect(page).toHaveURL(/\?category=bralettes/);
  });

  test('should navigate back to home from 404', async ({ page }) => {
    await page.goto('/invalid-route');
    
    await expect(page.getByText('404')).toBeVisible();
    
    const homeButton = page.getByRole('button', { name: /Return Home/i });
    await homeButton.click();
    
    await expect(page).toHaveURL('/');
  });

  test('should maintain scroll position on back navigation', async ({ page }) => {
    await page.goto('/');
    
    await page.evaluate(() => window.scrollTo(0, 500));
    
    const firstProduct = page.locator('[data-testid="product-card"]').first();
    await firstProduct.click();
    
    await page.goBack();
    
    // Browser should restore scroll position automatically
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeGreaterThan(0);
  });
});
```

**File:** `e2e/performance.spec.js`

```javascript
import { test, expect } from '@playwright/test';

test.describe('Performance', () => {
  test('should load homepage within performance budget', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - startTime;
    
    expect(loadTime).toBeLessThan(3000); // 3 second budget
  });

  test('should lazy load images below fold', async ({ page }) => {
    await page.goto('/');
    
    const belowFoldImage = page.locator('img[loading="lazy"]').first();
    
    // Image should not load until scrolled into view
    const isLoaded = await belowFoldImage.evaluate((img) => img.complete);
    
    // Scroll image into view
    await belowFoldImage.scrollIntoViewIfNeeded();
    
    // Wait for image to load
    await expect(belowFoldImage).toBeVisible();
  });

  test('should meet Lighthouse performance threshold', async ({ page }) => {
    // This would integrate with Lighthouse CI
    // Placeholder for actual implementation
    await page.goto('/');
    
    // In real implementation, would run Lighthouse programmatically
    // and assert performance score > 85
  });
});
```

---

## 10. Migration Strategy

<!-- AI: How to migrate from current state to new implementation -->

**Current State:** No existing website - this is a new project.

**Migration Strategy:** Initial implementation from scratch.

### Phase 1: Project Setup and Configuration

**Step 1.1: Initialize Vite + React Project**
```bash
npm create vite@latest lingerie-website -- --template react
cd lingerie-website
npm install
```

**Step 1.2: Install Dependencies**
```bash
# Core dependencies
npm install react-router-dom

# Development dependencies
npm install --save-dev eslint eslint-plugin-react eslint-plugin-react-hooks \
  eslint-plugin-jsx-a11y prettier vitest jsdom @testing-library/react \
  @testing-library/user-event @playwright/test prop-types
```

**Step 1.3: Configure ESLint and Prettier**
```bash
# Create configuration files
touch .eslintrc.cjs .prettierrc .gitignore
```

**Step 1.4: Setup Project Structure**
```bash
# Create directory structure
mkdir -p src/{components/{ui,layout,product},pages,data,services,utils,hooks,styles}
mkdir -p src/components/ui/{Button,Card,Image,Grid,Container,Link}
mkdir -p src/components/layout/{Header,Footer,Navigation,Layout}
mkdir -p src/components/product/{ProductCard,ProductGrid,ProductDetail,ProductImage,ProductFeatures,ProductSpecifications}
mkdir -p src/pages/{Home,ProductDetailPage,NotFound}
mkdir -p public/images/products
```

**Duration:** 1-2 hours

---

### Phase 2: Data Layer Implementation

**Step 2.1: Create Sample Product Data**

Create `src/data/products.json`:
```json
[
  {
    "id": "prod-001",
    "name": "Classic Lace Bralette",
    "slug": "classic-lace-bralette",
    "description": "Elegant and comfortable lace bralette with adjustable straps and removable padding.",
    "shortDescription": "Elegant lace bralette with adjustable straps",
    "category": ["bralettes", "everyday"],
    "images": {
      "thumbnail": "/images/products/prod-001-thumb.jpg",
      "main": "/images/products/prod-001-main.jpg",
      "gallery": ["/images/products/prod-001-1.jpg", "/images/products/prod-001-2.jpg"]
    },
    "features": [
      "Soft stretch lace",
      "Adjustable straps",
      "Wire-free comfort",
      "Removable padding"
    ],
    "specifications": [
      {"key": "Material", "value": "90% Nylon, 10% Spandex"},
      {"key": "Care", "value": "Hand wash cold"},
      {"key": "Origin", "value": "Made in USA"}
    ],
    "price": {
      "display": "$29.99"
    },
    "metadata": {
      "createdAt": "2026-01-15",
      "featured": true,
      "order": 1
    }
  }
]
```

**Step 2.2: Create Categories Data**

Create `src/data/categories.json`:
```json
[
  {
    "id": "cat-001",
    "name": "Bralettes",
    "slug": "bralettes",
    "description": "Comfortable wire-free bralettes",
    "order": 1
  },
  {
    "id": "cat-002",
    "name": "Everyday",
    "slug": "everyday",
    "description": "Everyday comfort essentials",
    "order": 2
  }
]
```

**Step 2.3: Create Featured Products Data**

Create `src/data/featured.json`:
```json
{
  "featuredProductIds": ["prod-001"]
}
```

**Step 2.4: Implement Product Service**

Create `src/services/productService.js` (see section 5 for full implementation).

**Step 2.5: Add Placeholder Images**

```bash
# Add placeholder product images to public/images/products/
# Can use placeholder service initially: https://placehold.co/600x800
```

**Duration:** 2-3 hours

---

### Phase 3: UI Foundation (Reusable Components)

**Step 3.1: Implement Container Component**
- Create `src/components/ui/Container/Container.jsx`
- Create `src/components/ui/Container/Container.module.css`
- Test with basic layout

**Step 3.2: Implement Grid Component**
- Create `src/components/ui/Grid/Grid.jsx`
- Create `src/components/ui/Grid/Grid.module.css`
- Test responsive behavior at different breakpoints

**Step 3.3: Implement Card Component**
- Create `src/components/ui/Card/Card.jsx`
- Create `src/components/ui/Card/Card.module.css`

**Step 3.4: Implement Image Component**
- Create `src/components/ui/Image/Image.jsx`
- Create `src/components/ui/Image/Image.module.css`
- Implement lazy loading and error handling

**Step 3.5: Implement Button Component**
- Create `src/components/ui/Button/Button.jsx`
- Create `src/components/ui/Button/Button.module.css`
- Create variants (primary, secondary, outline)

**Step 3.6: Implement Link Component**
- Create `src/components/ui/Link/Link.jsx`
- Create `src/components/ui/Link/Link.module.css`

**Step 3.7: Create Global Styles**
- Create `src/styles/global.css` with CSS reset
- Create `src/styles/variables.css` with CSS custom properties
- Import in `src/main.jsx`

**Duration:** 4-6 hours

---

### Phase 4: Layout Components

**Step 4.1: Implement Header Component**
- Create `src/components/layout/Header/Header.jsx`
- Create `src/components/layout/Header/Header.module.css`
- Add logo and branding

**Step 4.2: Implement Navigation Component**
- Create `src/components/layout/Navigation/Navigation.jsx`
- Create `src/components/layout/Navigation/Navigation.module.css`
- Integrate with category data

**Step 4.3: Implement Footer Component**
- Create `src/components/layout/Footer/Footer.jsx`
- Create `src/components/layout/Footer/Footer.module.css`

**Step 4.4: Implement Layout Wrapper**
- Create `src/components/layout/Layout/Layout.jsx`
- Create `src/components/layout/Layout/Layout.module.css`
- Compose Header + children + Footer

**Duration:** 3-4 hours

---

### Phase 5: Product Components

**Step 5.1: Implement ProductCard Component**
- Create `src/components/product/ProductCard/ProductCard.jsx`
- Create `src/components/product/ProductCard/ProductCard.module.css`
- Add hover effects and transitions

**Step 5.2: Implement ProductGrid Component**
- Create `src/components/product/ProductGrid/ProductGrid.jsx`
- Create `src/components/product/ProductGrid/ProductGrid.module.css`
- Integrate with Grid component

**Step 5.3: Implement ProductImage Component**
- Create `src/components/product/ProductImage/ProductImage.jsx`
- Create `src/components/product/ProductImage/ProductImage.module.css`
- Add thumbnail gallery with image switching

**Step 5.4: Implement ProductFeatures Component**
- Create `src/components/product/ProductFeatures/ProductFeatures.jsx`
- Create `src/components/product/ProductFeatures/ProductFeatures.module.css`

**Step 5.5: Implement ProductSpecifications Component**
- Create `src/components/product/ProductSpecifications/ProductSpecifications.jsx`
- Create `src/components/product/ProductSpecifications/ProductSpecifications.module.css`

**Step 5.6: Implement ProductDetail Component**
- Create `src/components/product/ProductDetail/ProductDetail.jsx`
- Create `src/components/product/ProductDetail/ProductDetail.module.css`
- Compose all product sub-components

**Duration:** 5-7 hours

---

### Phase 6: Pages and Routing

**Step 6.1: Implement Home Page**
- Create `src/pages/Home/Home.jsx`
- Create `src/pages/Home/Home.module.css`
- Integrate with ProductGrid
- Add category filtering from URL params

**Step 6.2: Implement Product Detail Page**
- Create `src/pages/ProductDetailPage/ProductDetailPage.jsx`
- Create `src/pages/ProductDetailPage/ProductDetailPage.module.css`
- Integrate with ProductDetail component

**Step 6.3: Implement 404 Page**
- Create `src/pages/NotFound/NotFound.jsx`
- Create `src/pages/NotFound/NotFound.module.css`

**Step 6.4: Implement Custom Hooks**
- Create `src/hooks/useProduct.js`
- Create `src/hooks/useScrollToTop.js`

**Step 6.5: Implement Error Boundary**
- Create `src/ErrorBoundary.jsx`

**Step 6.6: Configure Router in App Component**
- Update `src/App.jsx` with routing configuration
- Add lazy loading for routes
- Wrap with Layout and ErrorBoundary

**Duration:** 4-5 hours

---

### Phase 7: Styling and Responsiveness

**Step 7.1: Implement Mobile Styles (375px)**
- Test all components at mobile viewport
- Adjust spacing, typography, and layout

**Step 7.2: Implement Tablet Styles (768px)**
- Add tablet breakpoint styles
- Test navigation and grid layouts

**Step 7.3: Implement Desktop Styles (1920px)**
- Add desktop breakpoint styles
- Optimize for large screens

**Step 7.4: Cross-Browser Testing**
- Test in Chrome, Firefox, Safari, Edge
- Fix any browser-specific issues

**Duration:** 4-6 hours

---

### Phase 8: Optimization

**Step 8.1: Configure Code Splitting**
- Update `vite.config.js` with chunking strategy
- Test lazy-loaded routes

**Step 8.2: Optimize Images**
- Compress product images
- Test lazy loading behavior
- Add proper alt text

**Step 8.3: Performance Tuning**
- Run Lighthouse audit
- Fix performance issues
- Optimize bundle size

**Step 8.4: Accessibility Audit**
- Test keyboard navigation
- Test screen reader compatibility
- Fix ARIA issues

**Duration:** 3-4 hours

---

### Phase 9: Testing

**Step 9.1: Write Unit Tests**
- Test productService functions
- Test UI components (Button, Card, Image)
- Test product components

**Step 9.2: Write Integration Tests**
- Test navigation flows
- Test product detail flow

**Step 9.3: Write E2E Tests**
- Test homepage
- Test product detail page
- Test navigation
- Test performance

**Step 9.4: Run Test Suite**
```bash
npm run test        # Unit tests
npm run test:e2e    # E2E tests
```

**Duration:** 6-8 hours

---

### Phase 10: Documentation and Deployment Prep

**Step 10.1: Write README**
- Project overview
- Setup instructions
- Development workflow
- Build commands
- Deployment notes

**Step 10.2: Create Deployment Configuration**
- Add `_redirects` for Netlify
- Add `vercel.json` for Vercel (optional)
- Document deployment process

**Step 10.3: Build Production Bundle**
```bash
npm run build
npm run preview  # Test production build locally
```

**Step 10.4: Final QA**
- Test production build
- Verify all images load
- Test all navigation flows
- Run Lighthouse audit on production build

**Duration:** 2-3 hours

---

### Total Implementation Timeline

**Estimated Total:** 35-50 hours of development time

**Breakdown:**
- Phase 1: 1-2 hours (Setup)
- Phase 2: 2-3 hours (Data)
- Phase 3: 4-6 hours (UI Components)
- Phase 4: 3-4 hours (Layout)
- Phase 5: 5-7 hours (Product Components)
- Phase 6: 4-5 hours (Pages/Routing)
- Phase 7: 4-6 hours (Styling)
- Phase 8: 3-4 hours (Optimization)
- Phase 9: 6-8 hours (Testing)
- Phase 10: 2-3 hours (Documentation)

**Recommended Approach:**
- Work in phases sequentially
- Commit after each completed component
- Test incrementally (don't wait until end)
- Keep dev server running to see changes live

---

## 11. Rollback Plan

<!-- AI: How to rollback if deployment fails -->

### Rollback Strategy for Static Site Deployment

Since this is a static site deployment, rollback is straightforward and handled by the hosting platform.

---

### Netlify Rollback

**Automatic Version History:**
- Netlify keeps history of all deployments
- Each deployment has a unique URL and ID
- Previous versions remain accessible

**Rollback Process:**

**Option 1: Via Netlify UI (Recommended)**
1. Log into Netlify dashboard
2. Navigate to site > Deploys
3. Find the last known good deployment
4. Click "Publish deploy" to restore that version
5. Site reverts to previous version immediately (< 30 seconds)

**Option 2: Via Netlify CLI**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# List recent deployments
netlify deploy:list

# Restore a specific deployment
netlify deploy:restore --deploy-id <deploy-id>
```

**Time to Rollback:** < 1 minute

---

### Vercel Rollback

**Automatic Version History:**
- Vercel keeps all deployment history
- Instant rollback to any previous deployment
- Immutable deployments (previous versions never deleted)

**Rollback Process:**

**Via Vercel UI:**
1. Log into Vercel dashboard
2. Navigate to project > Deployments
3. Find the last known good deployment
4. Click "..." menu > "Promote to Production"
5. Instant rollback (global CDN updated within seconds)

**Via Vercel CLI:**
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# List deployments
vercel ls

# Promote previous deployment
vercel promote <deployment-url>
```

**Time to Rollback:** < 30 seconds

---

### GitHub Pages Rollback

**Git-Based Rollback:**

```bash
# Identify the last working commit
git log --oneline

# Revert to previous commit
git revert <commit-hash>

# Or hard reset (if no important history to preserve)
git reset --hard <commit-hash>

# Force push to gh-pages branch
git push origin gh-pages --force

# GitHub Pages will rebuild automatically
```

**Time to Rollback:** 2-5 minutes (includes build time)

---

### AWS S3 + CloudFront Rollback

**Version Control Strategy:**
- Use S3 versioning to keep previous file versions
- CloudFront invalidation to clear cache

**Rollback Process:**

```bash
# Option 1: Re-upload previous build
aws s3 sync ./previous-build-backup s3://bucket-name --delete

# Option 2: Restore from S3 versioning
aws s3api list-object-versions --bucket bucket-name
aws s3api copy-object --copy-source bucket-name/index.html?versionId=<version-id> \
  --bucket bucket-name --key index.html

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id <dist-id> --paths "/*"
```

**Time to Rollback:** 5-10 minutes (includes CDN propagation)

---

### Pre-Deployment Safety Checks

**Before Deploying:**

1. **Test Production Build Locally:**
```bash
npm run build
npm run preview
# Manually test critical flows
```

2. **Run Automated Tests:**
```bash
npm run test
npm run test:e2e
```

3. **Run Lighthouse Audit:**
```bash
npm run build
npx lighthouse http://localhost:4173 --view
# Ensure performance score > 85
```

4. **Check Bundle Size:**
```bash
npm run build
# Review dist/ folder sizes
# Alert if JavaScript bundle > 200KB gzipped
```

5. **Verify Critical Assets:**
```bash
# Check that all product images exist
ls -la public/images/products/
# Check that data files are valid JSON
node -e "require('./src/data/products.json')"
node -e "require('./src/data/categories.json')"
```

---

### Deployment Best Practices to Minimize Rollback Need

**1. Use Preview Deployments:**
- Netlify/Vercel automatically create preview URLs for branches/PRs
- Test preview URL before merging to production
- Share preview with stakeholders for approval

**2. Gradual Rollout (if supported):**
- Some platforms support percentage-based rollouts
- Deploy to 10% of users first, monitor, then 100%

**3. Monitoring After Deployment:**
- Check error tracking service (if configured)
- Monitor analytics for traffic drop
- Test critical user flows manually after deploy

**4. Keep Build Artifacts:**
```bash
# Archive production builds
mkdir -p build-archives
cp -r dist "build-archives/build-$(date +%Y%m%d-%H%M%S)"
# Keep last 10 builds
ls -t build-archives | tail -n +11 | xargs -I {} rm -rf build-archives/{}
```

---

### Emergency Rollback Checklist

**If deployment causes critical issues:**

1. **Immediate Action (< 2 minutes):**
   - [ ] Access hosting platform dashboard
   - [ ] Identify last known good deployment
   - [ ] Click rollback/restore button
   - [ ] Verify site is back online

2. **Communication (< 5 minutes):**
   - [ ] Notify stakeholders of rollback
   - [ ] Document issue that caused rollback
   - [ ] Update status page (if applicable)

3. **Root Cause Analysis (< 30 minutes):**
   - [ ] Identify what went wrong in new deployment
   - [ ] Review build logs for errors
   - [ ] Test failed deployment locally
   - [ ] Document findings

4. **Fix and Redeploy (timeline varies):**
   - [ ] Fix identified issue
   - [ ] Test fix thoroughly
   - [ ] Deploy to preview environment first
   - [ ] Get approval before production deploy
   - [ ] Monitor closely after redeploy

---

### Rollback Testing

**Quarterly Rollback Drill:**
1. Deploy a test change to production
2. Practice rollback procedure
3. Time the rollback process
4. Document any issues encountered
5. Update rollback documentation if needed

**Purpose:** Ensure team knows rollback procedure and it works as expected.

---

## 12. Performance Considerations

<!-- AI: Performance optimizations, caching, indexing -->

### Performance Targets

**Lighthouse Scores:**
- Performance: > 85
- Accessibility: > 95
- Best Practices: > 90
- SEO: > 80

**Core Web Vitals:**
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1
- TTFB (Time to First Byte): < 600ms
- TTI (Time to Interactive): < 3s

---

### Bundle Optimization

**Code Splitting Strategy:**

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunk: React and React Router
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // UI components chunk
          'ui-components': [
            './src/components/ui/Button/Button',
            './src/components/ui/Card/Card',
            './src/components/ui/Image/Image',
            './src/components/ui/Grid/Grid',
            './src/components/ui/Container/Container',
          ],
          // Product components chunk
          'product-components': [
            './src/components/product/ProductCard/ProductCard',
            './src/components/product/ProductGrid/ProductGrid',
          ],
        },
      },
    },
    // Performance budgets
    chunkSizeWarningLimit: 500, // Warn if chunk > 500KB
  },
});
```

**Route-Based Code Splitting:**

```javascript
// App.jsx - Lazy load page components
import { lazy, Suspense } from 'react';

const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage/ProductDetailPage'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));

// Home page loaded eagerly (main entry point)
import Home from './pages/Home/Home';
```

**Benefits:**
- Smaller initial bundle size
- Faster time to interactive
- On-demand loading of product detail page
- Better caching (vendor chunk changes rarely)

---

### Image Optimization

**Image Formats:**
- Use WebP format with JPEG fallback
- Implement responsive images with `srcset`

```javascript
// Image component enhancement
<picture>
  <source 
    srcSet={`${src}.webp 1x, ${src}@2x.webp 2x`}
    type="image/webp" 
  />
  <source 
    srcSet={`${src}.jpg 1x, ${src}@2x.jpg 2x`}
    type="image/jpeg" 
  />
  <img src={`${src}.jpg`} alt={alt} loading="lazy" />
</picture>
```

**Image Sizing:**
- Thumbnail images: 400x533px (3:4 ratio)
- Main product images: 800x1066px
- Gallery images: 800x1066px
- Optimize and compress all images (target: < 100KB per image)

**Lazy Loading:**
```javascript
// Implemented in Image component
<img loading="lazy" src={src} alt={alt} />
```

**Intersection Observer (Advanced):**
```javascript
// Custom lazy loading with more control
useEffect(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        observer.unobserve(img);
      }
    });
  }, { rootMargin: '50px' });

  observer.observe(imageRef.current);
}, []);
```

**Image CDN (Future Enhancement):**
- Migrate to Cloudinary or ImageKit
- Automatic format optimization
- On-demand resizing
- Global CDN delivery

---

### CSS Optimization

**CSS Modules Benefits:**
- Scoped styles prevent bloat
- Tree-shaking removes unused styles
- Minified and bundled in production

**Critical CSS Inlining:**
```javascript
// vite.config.js
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    VitePWA({
      injectRegister: 'auto',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,jpg,svg}'],
      },
    }),
  ],
});
```

**CSS Custom Properties (Variables):**
```css
/* src/styles/variables.css - loaded once */
:root {
  --color-primary: #d4567b;
  --color-text-primary: #1a1a1a;
  --spacing-unit: 0.25rem;
}
```

**Benefits:**
- Single source of truth for design tokens
- Easy theme changes
- Better browser caching

---

### Caching Strategy

**Static Asset Caching:**

**Netlify Headers:**
```
# _headers file in public/
/assets/*
  Cache-Control: public, max-age=31536000, immutable

/images/*
  Cache-Control: public, max-age=31536000, immutable

/index.html
  Cache-Control: public, max-age=0, must-revalidate
```

**Vite Build Output:**
- JavaScript/CSS files: Content hash in filename (e.g., `main.a1b2c3.js`)
- Browser caches aggressively (1 year)
- New deployment = new hash = cache busted automatically
- `index.html` not cached (always fetches latest)

**Service Worker (Future Enhancement):**
```javascript
// Enable offline caching with Workbox
import { registerSW } from 'virtual:pwa-register';

registerSW({
  onNeedRefresh() {
    // Prompt user to reload for new version
  },
  onOfflineReady() {
    // Show "Ready to work offline" message
  },
});
```

---

### Data Loading Optimization

**Current Approach:**
- All product data loaded at app initialization
- Data bundled with JavaScript

**Future Optimizations (if catalog grows):**

**1. Split Product Data by Category:**
```javascript
// Instead of single products.json
const bralettes = await import('../data/products/bralettes.json');
const everyday = await import('../data/products/everyday.json');
```

**2. Pagination:**
```javascript
// Load products in batches
const [page, setPage] = useState(1);
const productsPerPage = 20;
const visibleProducts = products.slice(0, page * productsPerPage);
```

**3. Virtual Scrolling (for large lists):**
```javascript
// Use react-window for efficient rendering
import { FixedSizeGrid } from 'react-window';

<FixedSizeGrid
  columnCount={3}
  rowCount={Math.ceil(products.length / 3)}
  columnWidth={300}
  rowHeight={400}
  height={600}
  width={960}
>
  {ProductCard}
</FixedSizeGrid>
```

---

### Rendering Optimization

**React Performance Best Practices:**

**1. Memoization:**
```javascript
// Memoize expensive product filtering
const filteredProducts = useMemo(() => {
  return products.filter(p => p.category === category);
}, [products, category]);

// Memoize product cards to prevent re-renders
const ProductCard = memo(({ product }) => {
  // ... component code
});
```

**2. Avoid Inline Functions in Render:**
```javascript
// Bad: Creates new function on every render
<button onClick={() => handleClick(id)}>Click</button>

// Good: Memoized callback
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);

<button onClick={handleClick}>Click</button>
```

**3. Lazy Load Images:**
- Already implemented in Image component
- Reduces initial render time

**4. Debounce Search Input (if added):**
```javascript
const debouncedSearch = useMemo(
  () => debounce((query) => setSearchQuery(query), 300),
  []
);
```

---

### Network Performance

**HTTP/2 Benefits:**
- Multiplexing: Multiple requests over single connection
- Header compression
- Server push (if supported by host)
- All modern static hosts support HTTP/2 by default

**Preconnect to External Domains:**
```html
<!-- index.html - if using external CDN -->
<link rel="preconnect" href="https://cdn.example.com" />
<link rel="dns-prefetch" href="https://cdn.example.com" />
```

**Resource Hints:**
```html
<!-- Preload critical assets -->
<link rel="preload" as="image" href="/images/logo.svg" />

<!-- Prefetch next likely page -->
<link rel="prefetch" href="/products/classic-lace-bralette" />
```

---

### Build Performance

**Vite Build Optimization:**
```javascript
// vite.config.js
export default defineConfig({
  build: {
    // Faster builds with esbuild
    minify: 'esbuild',
    // Disable source maps in production (smaller bundle)
    sourcemap: false,
    // Target modern browsers for smaller bundles
    target: 'es2015',
    // Optimize CSS
    cssCodeSplit: true,
  },
  // Faster dependency pre-bundling
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
});
```

**Build Size Analysis:**
```bash
# Install rollup-plugin-visualizer
npm install --save-dev rollup-plugin-visualizer

# Add to vite.config.js
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true }),
  ],
});

# Run build - generates stats.html
npm run build
```

---

### Performance Budgets

**Enforce in Build Process:**
```javascript
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        // Warn if chunk exceeds budget
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
    chunkSizeWarningLimit: 200, // 200KB warning threshold
  },
});
```

**Bundle Size Budgets:**
- Main JavaScript bundle: < 100KB gzipped
- Vendor chunk (React, Router): < 80KB gzipped
- UI components chunk: < 40KB gzipped
- Product components chunk: < 40KB gzipped
- Total CSS: < 30KB gzipped

**Fail Build if Budget Exceeded:**
```javascript
// package.json script
"scripts": {
  "build": "vite build && node check-bundle-size.js"
}

// check-bundle-size.js
const fs = require('fs');
const path = require('path');
const gzipSize = require('gzip-size');

const distPath = path.join(__dirname, 'dist', 'assets');
const files = fs.readdirSync(distPath);

const jsFiles = files.filter(f => f.endsWith('.js'));
jsFiles.forEach(file => {
  const size = gzipSize.sync(fs.readFileSync(path.join(distPath, file)));
  if (size > 200 * 1024) {
    console.error(`Bundle ${file} exceeds 200KB: ${size} bytes`);
    process.exit(1);
  }
});
```

---

### Runtime Performance Monitoring

**Web Vitals Integration:**
```javascript
// src/main.jsx
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics({ name, delta, value, id }) {
  console.log('Web Vitals:', { name, delta, value, id });
  // Send to analytics service in production
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

**Performance Observer:**
```javascript
// Monitor long tasks
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.duration > 50) {
      console.warn('Long task detected:', entry);
    }
  }
});
observer.observe({ entryTypes: ['longtask'] });
```

---

### Accessibility Performance

**Fast Focus Management:**
```javascript
// useScrollToTop hook also manages focus
export function useScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
    // Focus management for screen readers
    document.querySelector('h1')?.focus();
  }, []);
}
```

**Skip Links:**
```javascript
// Header component
<a href="#main-content" className={styles.skipLink}>
  Skip to main content
</a>

// Main content
<main id="main-content" tabIndex={-1}>
  {children}
</main>
```

---

### Performance Checklist

**Pre-Launch:**
- [ ] Run Lighthouse audit (all pages score > 85)
- [ ] Test on slow 3G network (Chrome DevTools)
- [ ] Verify lazy loading works correctly
- [ ] Check bundle sizes meet budgets
- [ ] Test image loading on slow connection
- [ ] Verify CDN caching headers
- [ ] Test route transitions are fast
- [ ] Check no layout shifts during load
- [ ] Test on real mobile devices (not just emulator)
- [ ] Verify Service Worker (if implemented)

**Post-Launch:**
- [ ] Monitor Core Web Vitals in field
- [ ] Track bundle size growth over time
- [ ] Monitor CDN cache hit rates
- [ ] Review performance metrics weekly
- [ ] Run Lighthouse CI on every deployment

---

## Appendix: Existing Repository Structure

## Repository File Structure

```
.git
README.md
docs/
  plans/
    donkey-website/
      HLD.md
      LLD.md
      PRD.md
      ROAM.md
      epic.yaml
      issues_created.yaml
      slices.yaml
      tasks.yaml
      timeline.md
      timeline.yaml
    lingerie-website/
      HLD.md
      PRD.md
```
