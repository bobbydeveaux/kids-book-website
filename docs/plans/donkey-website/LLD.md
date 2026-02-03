# Low-Level Design: kids-book-website

**Created:** 2026-02-03T23:04:28Z
**Status:** Draft

## 1. Implementation Overview

<!-- AI: Brief summary of implementation approach -->

The Donkey Website will be implemented as a hand-coded static site with minimal build tooling, prioritizing simplicity and performance. The implementation follows a progressive enhancement approach:

1. **Content Structure**: All content stored as semantic HTML5 files in a logical directory structure, with optional Markdown source files that compile to HTML during build
2. **Styling**: Mobile-first CSS with CSS custom properties for theming, organized into modular files (layout, components, utilities)
3. **Interactivity**: Vanilla JavaScript with ES6 modules for navigation menu, image lazy loading, and optional lightbox functionality
4. **Build Process**: Lightweight Node.js build script for image optimization, CSS concatenation/minification, and optional Markdown compilation
5. **Deployment**: Git-based workflow with automatic deployment to Netlify on push to main branch

The implementation will be completed in phases:
- **Phase 1**: Core structure (homepage, navigation, basic styles)
- **Phase 2**: Content pages (breeds gallery, care guides, facts)
- **Phase 3**: Enhancements (image optimization, accessibility refinements, performance tuning)
- **Phase 4**: Testing and deployment configuration

This approach requires no framework dependencies, resulting in a lightweight, fast-loading site that meets all PRD requirements while remaining easily maintainable.

---

## 2. File Structure

<!-- AI: List all new and modified files with descriptions -->

```
donkey-website/
├── .gitignore                          # Ignore node_modules, dist, .env files
├── .nvmrc                              # Node.js version specification (v18)
├── README.md                           # Updated with project documentation
├── package.json                        # Build dependencies (sharp, clean-css, etc.)
├── package-lock.json                   # Dependency lock file
├── netlify.toml                        # Netlify deployment configuration
├── docs/
│   └── plans/
│       └── donkey-website/
│           ├── PRD.md                  # Existing PRD
│           ├── HLD.md                  # Existing HLD
│           └── LLD.md                  # This document
├── src/                                # Source files (pre-build)
│   ├── content/                        # Content source files
│   │   ├── breeds/
│   │   │   ├── miniature-mediterranean.md
│   │   │   ├── standard-donkey.md
│   │   │   ├── mammoth-donkey.md
│   │   │   └── poitou-donkey.md
│   │   ├── care/
│   │   │   ├── feeding.md
│   │   │   ├── grooming.md
│   │   │   ├── housing.md
│   │   │   └── health.md
│   │   └── facts/
│   │       └── about-donkeys.md
│   ├── images/                         # Original high-res images
│   │   ├── hero/
│   │   │   └── donkey-hero.jpg
│   │   ├── breeds/
│   │   │   ├── miniature-mediterranean-1.jpg
│   │   │   ├── miniature-mediterranean-2.jpg
│   │   │   ├── standard-donkey-1.jpg
│   │   │   └── [additional breed images]
│   │   ├── care/
│   │   │   ├── feeding-guide.jpg
│   │   │   └── [care-related images]
│   │   └── icons/
│   │       ├── menu.svg
│   │       ├── close.svg
│   │       └── arrow-right.svg
│   ├── styles/                         # CSS source files
│   │   ├── base/
│   │   │   ├── reset.css               # CSS reset/normalize
│   │   │   ├── variables.css           # CSS custom properties
│   │   │   └── typography.css          # Font styles and hierarchy
│   │   ├── layout/
│   │   │   ├── header.css              # Site header styles
│   │   │   ├── footer.css              # Site footer styles
│   │   │   ├── grid.css                # Grid system for layouts
│   │   │   └── container.css           # Container and spacing
│   │   ├── components/
│   │   │   ├── button.css              # Button styles
│   │   │   ├── card.css                # Breed/content card styles
│   │   │   ├── navigation.css          # Navigation menu (mobile + desktop)
│   │   │   ├── hero.css                # Hero section styles
│   │   │   ├── gallery.css             # Image gallery grid
│   │   │   └── lightbox.css            # Image lightbox overlay
│   │   └── utilities/
│   │       ├── accessibility.css       # Screen reader, focus styles
│   │       └── responsive.css          # Responsive utility classes
│   ├── scripts/                        # JavaScript source files
│   │   ├── navigation.js               # Mobile menu toggle logic
│   │   ├── lazyload.js                 # Intersection Observer lazy loading
│   │   ├── lightbox.js                 # Image lightbox functionality
│   │   └── main.js                     # Entry point, module imports
│   └── templates/                      # HTML templates (if using SSG)
│       ├── base.html                   # Base layout template
│       ├── home.html                   # Homepage template
│       ├── breed-list.html             # Breeds listing template
│       ├── breed-detail.html           # Individual breed template
│       ├── care-guide.html             # Care guide template
│       └── facts.html                  # Facts page template
├── build/                              # Build scripts
│   ├── build.js                        # Main build orchestrator
│   ├── compile-markdown.js             # Markdown to HTML compiler
│   ├── optimize-images.js              # Image optimization (WebP + responsive)
│   ├── bundle-css.js                   # CSS concatenation and minification
│   └── generate-critical-css.js        # Extract critical above-fold CSS
├── dist/                               # Production build output (git-ignored)
│   ├── index.html                      # Homepage
│   ├── breeds/
│   │   ├── index.html                  # Breeds listing page
│   │   ├── miniature-mediterranean.html
│   │   ├── standard-donkey.html
│   │   ├── mammoth-donkey.html
│   │   └── poitou-donkey.html
│   ├── care/
│   │   ├── index.html                  # Care guide overview
│   │   ├── feeding.html
│   │   ├── grooming.html
│   │   ├── housing.html
│   │   └── health.html
│   ├── facts.html                      # Facts and about page
│   ├── 404.html                        # Custom 404 error page
│   ├── images/                         # Optimized images
│   │   ├── hero/
│   │   │   ├── donkey-hero-400w.webp
│   │   │   ├── donkey-hero-800w.webp
│   │   │   ├── donkey-hero-1200w.webp
│   │   │   └── donkey-hero-800w.jpg    # Fallback
│   │   ├── breeds/
│   │   │   ├── miniature-mediterranean-1-400w.webp
│   │   │   ├── miniature-mediterranean-1-800w.webp
│   │   │   └── [optimized breed images]
│   │   └── icons/
│   │       └── [SVG icons copied as-is]
│   ├── css/
│   │   └── styles.css                  # Concatenated and minified CSS
│   └── js/
│       └── main.js                     # Bundled and minified JavaScript
└── tests/                              # Test files
    ├── accessibility/
    │   ├── lighthouse.test.js          # Lighthouse CI tests
    │   └── axe.test.js                 # axe-core accessibility tests
    ├── performance/
    │   └── web-vitals.test.js          # Core Web Vitals assertions
    └── visual/
        └── screenshots.test.js         # Visual regression tests (optional)
```

**New Files:**
- All files in `src/`, `build/`, and `dist/` directories (new structure)
- `netlify.toml`: Deployment configuration
- `package.json`: Build tooling dependencies
- `.nvmrc`: Node version pinning

**Modified Files:**
- `README.md`: Add project overview, setup instructions, build commands
- `.gitignore`: Add node_modules, dist, .env

**Excluded from Git:**
- `dist/` directory (build output)
- `node_modules/`
- `.env` files

---

## 3. Detailed Component Designs

<!-- AI: For each major component from HLD, provide detailed design -->

### 3.1 Homepage Component

**File:** `dist/index.html`

**Structure:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Learn all about donkeys: breeds, care guides, and fascinating facts about these gentle animals.">
  <title>Donkey Website - Your Guide to Donkeys</title>
  
  <!-- Critical CSS inlined -->
  <style>
    /* Critical above-the-fold CSS extracted during build */
  </style>
  
  <!-- Preload full stylesheet -->
  <link rel="preload" href="/css/styles.css" as="style">
  <link rel="stylesheet" href="/css/styles.css" media="print" onload="this.media='all'">
  
  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="/images/icons/favicon.svg">
</head>
<body>
  <!-- Header with navigation -->
  <header class="site-header">
    <div class="container">
      <div class="header-content">
        <a href="/" class="logo" aria-label="Donkey Website Home">
          <img src="/images/icons/donkey-logo.svg" alt="Donkey Website" width="40" height="40">
          <span>Donkey Website</span>
        </a>
        
        <nav class="main-nav" aria-label="Main navigation">
          <button class="mobile-menu-toggle" aria-expanded="false" aria-controls="nav-menu">
            <svg class="icon-menu" aria-hidden="true"><use href="#icon-menu"></use></svg>
            <svg class="icon-close" aria-hidden="true" hidden><use href="#icon-close"></use></svg>
            <span class="sr-only">Toggle menu</span>
          </button>
          
          <ul id="nav-menu" class="nav-menu">
            <li><a href="/" aria-current="page">Home</a></li>
            <li><a href="/breeds/">Breeds</a></li>
            <li><a href="/care/">Care Guide</a></li>
            <li><a href="/facts.html">Facts</a></li>
          </ul>
        </nav>
      </div>
    </div>
  </header>

  <!-- Hero section -->
  <main id="main-content">
    <section class="hero" aria-labelledby="hero-heading">
      <div class="hero-image">
        <picture>
          <source 
            srcset="/images/hero/donkey-hero-400w.webp 400w,
                    /images/hero/donkey-hero-800w.webp 800w,
                    /images/hero/donkey-hero-1200w.webp 1200w"
            type="image/webp"
            sizes="100vw">
          <img 
            src="/images/hero/donkey-hero-800w.jpg"
            srcset="/images/hero/donkey-hero-400w.jpg 400w,
                    /images/hero/donkey-hero-800w.jpg 800w,
                    /images/hero/donkey-hero-1200w.jpg 1200w"
            sizes="100vw"
            alt="Friendly donkey in a green pasture"
            width="1200"
            height="600"
            loading="eager">
        </picture>
      </div>
      
      <div class="hero-content container">
        <h1 id="hero-heading">Welcome to the Donkey Website</h1>
        <p class="hero-subtitle">Your comprehensive guide to donkey breeds, care, and fascinating facts</p>
        <a href="/breeds/" class="btn btn-primary">Explore Breeds</a>
      </div>
    </section>

    <!-- Overview cards -->
    <section class="overview-cards" aria-labelledby="overview-heading">
      <div class="container">
        <h2 id="overview-heading" class="sr-only">Site sections</h2>
        
        <div class="card-grid">
          <article class="card">
            <img src="/images/icons/breeds.svg" alt="" aria-hidden="true" width="60" height="60">
            <h3>Donkey Breeds</h3>
            <p>Discover different donkey breeds from miniature to mammoth, with detailed information about each.</p>
            <a href="/breeds/" class="card-link">View Breeds</a>
          </article>
          
          <article class="card">
            <img src="/images/icons/care.svg" alt="" aria-hidden="true" width="60" height="60">
            <h3>Care Guides</h3>
            <p>Learn how to properly feed, groom, house, and maintain the health of your donkey.</p>
            <a href="/care/" class="card-link">Read Guides</a>
          </article>
          
          <article class="card">
            <img src="/images/icons/facts.svg" alt="" aria-hidden="true" width="60" height="60">
            <h3>Facts & About</h3>
            <p>Explore the history, behavior, and fascinating characteristics of donkeys.</p>
            <a href="/facts.html" class="card-link">Learn More</a>
          </article>
        </div>
      </div>
    </section>
  </main>

  <!-- Footer -->
  <footer class="site-footer">
    <div class="container">
      <p>&copy; 2026 Donkey Website. Educational resource about donkeys.</p>
      <nav aria-label="Footer navigation">
        <ul class="footer-nav">
          <li><a href="/breeds/">Breeds</a></li>
          <li><a href="/care/">Care Guide</a></li>
          <li><a href="/facts.html">Facts</a></li>
        </ul>
      </nav>
    </div>
  </footer>

  <!-- SVG sprite for icons -->
  <svg style="display: none;" aria-hidden="true">
    <symbol id="icon-menu" viewBox="0 0 24 24">
      <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </symbol>
    <symbol id="icon-close" viewBox="0 0 24 24">
      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </symbol>
  </svg>

  <!-- JavaScript -->
  <script src="/js/main.js" type="module"></script>
</body>
</html>
```

**Responsibilities:**
- Welcome users with hero section and clear value proposition
- Provide navigation to main content sections via overview cards
- Establish visual design and branding
- Load critical resources with optimal performance (inline critical CSS, preload fonts)

---

### 3.2 Navigation Component

**Files:** 
- `src/styles/components/navigation.css`
- `src/scripts/navigation.js`

**CSS Design (`navigation.css`):**
```css
/* Mobile-first navigation */
.site-header {
  background-color: var(--color-white);
  border-bottom: 1px solid var(--color-gray-200);
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-primary);
  text-decoration: none;
}

.logo:hover {
  color: var(--color-primary-dark);
}

/* Mobile menu toggle button */
.mobile-menu-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text);
}

.mobile-menu-toggle:hover,
.mobile-menu-toggle:focus {
  color: var(--color-primary);
}

.mobile-menu-toggle svg {
  width: 24px;
  height: 24px;
}

/* Navigation menu - mobile */
.nav-menu {
  position: fixed;
  top: 65px; /* Below header */
  left: 0;
  right: 0;
  background-color: var(--color-white);
  border-bottom: 1px solid var(--color-gray-200);
  list-style: none;
  margin: 0;
  padding: 1rem 0;
  transform: translateY(-100%);
  transition: transform 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.nav-menu.is-open {
  transform: translateY(0);
}

.nav-menu li {
  margin: 0;
}

.nav-menu a {
  display: block;
  padding: 0.75rem 1.5rem;
  color: var(--color-text);
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s, color 0.2s;
}

.nav-menu a:hover,
.nav-menu a:focus {
  background-color: var(--color-gray-100);
  color: var(--color-primary);
}

.nav-menu a[aria-current="page"] {
  color: var(--color-primary);
  background-color: var(--color-primary-light);
}

/* Desktop navigation - 768px+ */
@media (min-width: 768px) {
  .mobile-menu-toggle {
    display: none;
  }

  .nav-menu {
    position: static;
    display: flex;
    gap: 0.5rem;
    transform: none;
    border-bottom: none;
    box-shadow: none;
    padding: 0;
  }

  .nav-menu a {
    padding: 0.5rem 1rem;
    border-radius: 4px;
  }
}
```

**JavaScript Design (`navigation.js`):**
```javascript
/**
 * Mobile navigation menu toggle functionality
 */

export class Navigation {
  constructor() {
    this.menuToggle = document.querySelector('.mobile-menu-toggle');
    this.navMenu = document.querySelector('.nav-menu');
    this.iconMenu = this.menuToggle?.querySelector('.icon-menu');
    this.iconClose = this.menuToggle?.querySelector('.icon-close');
    
    if (this.menuToggle && this.navMenu) {
      this.init();
    }
  }

  init() {
    this.menuToggle.addEventListener('click', () => this.toggleMenu());
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (this.isMenuOpen() && !e.target.closest('.main-nav')) {
        this.closeMenu();
      }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isMenuOpen()) {
        this.closeMenu();
        this.menuToggle.focus();
      }
    });
    
    // Close menu when navigating to a page
    this.navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (this.isMenuOpen()) {
          this.closeMenu();
        }
      });
    });
  }

  toggleMenu() {
    if (this.isMenuOpen()) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu() {
    this.navMenu.classList.add('is-open');
    this.menuToggle.setAttribute('aria-expanded', 'true');
    this.iconMenu.setAttribute('hidden', '');
    this.iconClose.removeAttribute('hidden');
  }

  closeMenu() {
    this.navMenu.classList.remove('is-open');
    this.menuToggle.setAttribute('aria-expanded', 'false');
    this.iconClose.setAttribute('hidden', '');
    this.iconMenu.removeAttribute('hidden');
  }

  isMenuOpen() {
    return this.navMenu.classList.contains('is-open');
  }
}
```

**Responsibilities:**
- Provide site-wide navigation across all pages
- Responsive mobile hamburger menu and desktop horizontal menu
- Accessibility: keyboard navigation, ARIA attributes, focus management
- Visual indication of current page

---

### 3.3 Breeds Gallery Component

**Files:**
- `dist/breeds/index.html` (listing page)
- `dist/breeds/{breed-name}.html` (detail pages)
- `src/styles/components/card.css`
- `src/styles/components/gallery.css`

**Listing Page Structure (`breeds/index.html`):**
```html
<main id="main-content">
  <section class="page-header">
    <div class="container">
      <h1>Donkey Breeds</h1>
      <p class="lead">Explore the diverse world of donkey breeds, from miniature to mammoth.</p>
    </div>
  </section>

  <section class="breeds-gallery">
    <div class="container">
      <div class="breed-grid">
        
        <!-- Breed card - Miniature Mediterranean -->
        <article class="breed-card">
          <a href="/breeds/miniature-mediterranean.html" class="breed-card-link">
            <div class="breed-card-image">
              <picture>
                <source 
                  srcset="/images/breeds/miniature-mediterranean-1-400w.webp"
                  type="image/webp">
                <img 
                  src="/images/breeds/miniature-mediterranean-1-400w.jpg"
                  alt="Miniature Mediterranean Donkey"
                  width="400"
                  height="300"
                  loading="lazy"
                  class="lazyload">
              </picture>
            </div>
            <div class="breed-card-content">
              <h2>Miniature Mediterranean</h2>
              <p>Small, gentle donkeys standing 32-34 inches tall. Perfect companions with friendly temperaments.</p>
              <span class="breed-card-cta">Learn More →</span>
            </div>
          </a>
        </article>

        <!-- Repeat for other breeds: Standard, Mammoth, Poitou -->
        
      </div>
    </div>
  </section>
</main>
```

**Detail Page Structure (`breeds/miniature-mediterranean.html`):**
```html
<main id="main-content">
  <article class="breed-detail">
    <header class="breed-header">
      <div class="container">
        <nav aria-label="Breadcrumb">
          <ol class="breadcrumb">
            <li><a href="/">Home</a></li>
            <li><a href="/breeds/">Breeds</a></li>
            <li aria-current="page">Miniature Mediterranean</li>
          </ol>
        </nav>
        <h1>Miniature Mediterranean Donkey</h1>
      </div>
    </header>

    <section class="breed-content">
      <div class="container">
        <div class="breed-layout">
          
          <!-- Image gallery -->
          <div class="breed-images">
            <div class="image-gallery">
              <picture>
                <source 
                  srcset="/images/breeds/miniature-mediterranean-1-800w.webp"
                  type="image/webp">
                <img 
                  src="/images/breeds/miniature-mediterranean-1-800w.jpg"
                  alt="Miniature Mediterranean Donkey in pasture"
                  width="800"
                  height="600"
                  class="gallery-image"
                  data-lightbox="breed-gallery">
              </picture>
              <!-- Additional images -->
            </div>
          </div>

          <!-- Breed information -->
          <div class="breed-info">
            <section class="breed-section">
              <h2>Overview</h2>
              <p>The Miniature Mediterranean Donkey is one of the smallest donkey breeds, originating from the islands of Sicily and Sardinia. These charming animals stand between 32-34 inches tall at the withers and are known for their gentle, affectionate nature.</p>
            </section>

            <section class="breed-section">
              <h2>Characteristics</h2>
              <dl class="characteristics-list">
                <dt>Height</dt>
                <dd>32-34 inches (81-86 cm)</dd>
                
                <dt>Weight</dt>
                <dd>200-350 lbs (91-159 kg)</dd>
                
                <dt>Temperament</dt>
                <dd>Gentle, friendly, intelligent</dd>
                
                <dt>Origin</dt>
                <dd>Mediterranean islands (Sicily, Sardinia)</dd>
                
                <dt>Colors</dt>
                <dd>Gray-dun, black, brown, spotted</dd>
                
                <dt>Lifespan</dt>
                <dd>25-35 years</dd>
              </dl>
            </section>

            <section class="breed-section">
              <h2>Care Requirements</h2>
              <p>Miniature donkeys require similar care to their larger cousins but in smaller quantities. They need access to shelter, fresh water, and appropriate grazing or hay.</p>
              <ul>
                <li>Smaller pasture requirements (1/2 acre per donkey minimum)</li>
                <li>Lower feed quantities than standard donkeys</li>
                <li>Regular hoof trimming every 6-8 weeks</li>
                <li>Annual veterinary checkups and vaccinations</li>
              </ul>
              <p><a href="/care/">View complete care guide →</a></p>
            </section>
          </div>
          
        </div>
      </div>
    </section>
  </article>
</main>
```

**Card CSS (`card.css`):**
```css
.breed-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-top: 2rem;
}

@media (min-width: 640px) {
  .breed-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .breed-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.breed-card {
  background-color: var(--color-white);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.breed-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.breed-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.breed-card-image {
  aspect-ratio: 4 / 3;
  overflow: hidden;
}

.breed-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.breed-card:hover .breed-card-image img {
  transform: scale(1.05);
}

.breed-card-content {
  padding: 1.5rem;
}

.breed-card-content h2 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  color: var(--color-primary);
}

.breed-card-content p {
  margin-bottom: 1rem;
  color: var(--color-text-secondary);
}

.breed-card-cta {
  color: var(--color-primary);
  font-weight: 600;
}
```

**Responsibilities:**
- Display all donkey breeds in an accessible grid layout
- Link to detailed breed pages
- Provide responsive image loading with lazy loading
- Maintain visual consistency and accessibility

---

### 3.4 Image Lazy Loading Component

**File:** `src/scripts/lazyload.js`

**Design:**
```javascript
/**
 * Lazy load images using Intersection Observer API
 * Images with class "lazyload" or loading="lazy" are observed
 */

export class LazyLoader {
  constructor(options = {}) {
    this.options = {
      rootMargin: options.rootMargin || '50px',
      threshold: options.threshold || 0.01,
    };
    
    this.images = document.querySelectorAll('img[loading="lazy"], img.lazyload');
    this.observer = null;
    
    if (this.images.length > 0) {
      this.init();
    }
  }

  init() {
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        (entries) => this.handleIntersection(entries),
        this.options
      );
      
      this.images.forEach(img => this.observer.observe(img));
    } else {
      // Fallback: load all images immediately
      this.images.forEach(img => this.loadImage(img));
    }
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        this.loadImage(img);
        this.observer.unobserve(img);
      }
    });
  }

  loadImage(img) {
    // Image will load automatically due to native loading="lazy"
    // or trigger load by setting data-src to src if using manual lazy loading
    if (img.dataset.src) {
      img.src = img.dataset.src;
    }
    
    if (img.dataset.srcset) {
      img.srcset = img.dataset.srcset;
    }
    
    img.classList.add('lazyloaded');
    img.classList.remove('lazyload');
  }
}
```

**Responsibilities:**
- Defer loading of below-the-fold images to improve initial page load
- Use Intersection Observer for efficient viewport detection
- Fallback to native `loading="lazy"` attribute (modern browsers handle automatically)
- Improve Largest Contentful Paint (LCP) metric

---

### 3.5 Care Guide Component

**Files:**
- `dist/care/index.html` (overview)
- `dist/care/feeding.html`, `grooming.html`, `housing.html`, `health.html`

**Overview Page Structure (`care/index.html`):**
```html
<main id="main-content">
  <section class="page-header">
    <div class="container">
      <h1>Donkey Care Guide</h1>
      <p class="lead">Comprehensive information on feeding, grooming, housing, and health care for your donkey.</p>
    </div>
  </section>

  <section class="care-overview">
    <div class="container">
      <div class="care-grid">
        
        <article class="care-card">
          <div class="care-icon">
            <img src="/images/icons/feeding.svg" alt="" aria-hidden="true">
          </div>
          <h2><a href="/care/feeding.html">Feeding Guide</a></h2>
          <p>Learn about proper nutrition, feeding schedules, and dietary requirements for donkeys of all ages and sizes.</p>
          <ul class="care-topics">
            <li>Hay and forage requirements</li>
            <li>Grain and supplements</li>
            <li>Water intake and hydration</li>
            <li>Treats and forbidden foods</li>
          </ul>
          <a href="/care/feeding.html" class="btn btn-secondary">Read Guide</a>
        </article>

        <article class="care-card">
          <div class="care-icon">
            <img src="/images/icons/grooming.svg" alt="" aria-hidden="true">
          </div>
          <h2><a href="/care/grooming.html">Grooming</a></h2>
          <p>Essential grooming techniques to keep your donkey healthy, comfortable, and looking their best.</p>
          <ul class="care-topics">
            <li>Daily brushing and coat care</li>
            <li>Hoof trimming and maintenance</li>
            <li>Bathing and skin care</li>
            <li>Dental care</li>
          </ul>
          <a href="/care/grooming.html" class="btn btn-secondary">Read Guide</a>
        </article>

        <!-- Housing and Health cards follow same pattern -->
        
      </div>
    </div>
  </section>
</main>
```

**Detail Page Structure (`care/feeding.html`):**
```html
<main id="main-content">
  <article class="care-detail">
    <header class="care-header">
      <div class="container">
        <nav aria-label="Breadcrumb">
          <ol class="breadcrumb">
            <li><a href="/">Home</a></li>
            <li><a href="/care/">Care Guide</a></li>
            <li aria-current="page">Feeding</li>
          </ol>
        </nav>
        <h1>Feeding Your Donkey</h1>
      </div>
    </header>

    <section class="care-content">
      <div class="container">
        <div class="content-layout">
          
          <!-- Table of contents (sticky sidebar on desktop) -->
          <aside class="toc">
            <nav aria-labelledby="toc-heading">
              <h2 id="toc-heading">On This Page</h2>
              <ul>
                <li><a href="#hay-forage">Hay & Forage</a></li>
                <li><a href="#grain-supplements">Grain & Supplements</a></li>
                <li><a href="#water">Water Requirements</a></li>
                <li><a href="#treats">Treats & Forbidden Foods</a></li>
                <li><a href="#feeding-schedule">Feeding Schedule</a></li>
              </ul>
            </nav>
          </aside>

          <!-- Main content -->
          <div class="care-article">
            <section id="hay-forage">
              <h2>Hay & Forage</h2>
              <p>Donkeys are browsers by nature and require a high-fiber diet primarily consisting of hay or grass. Their digestive system is adapted to process rough, fibrous plant material efficiently.</p>
              
              <h3>Daily Hay Requirements</h3>
              <p>An average donkey (400-500 lbs) requires approximately 1.5-2% of their body weight in hay per day. For a 450 lb donkey, this equals about 7-9 lbs of hay daily.</p>
              
              <div class="info-box">
                <strong>Tip:</strong> Donkeys are efficient digesters and require less food than horses of similar size. Overfeeding can lead to obesity and laminitis.
              </div>

              <h3>Best Hay Types</h3>
              <ul>
                <li><strong>Grass hay</strong>: Timothy, orchard grass, bermuda grass (preferred)</li>
                <li><strong>Mixed grass hay</strong>: Acceptable for most donkeys</li>
                <li><strong>Avoid</strong>: Alfalfa or rich legume hays (too high in protein and calories for most donkeys)</li>
              </ul>

              <!-- Image example -->
              <figure>
                <picture>
                  <source srcset="/images/care/hay-feeding-800w.webp" type="image/webp">
                  <img src="/images/care/hay-feeding-800w.jpg" alt="Donkey eating hay from feeder" loading="lazy">
                </picture>
                <figcaption>Donkeys should have access to hay throughout the day</figcaption>
              </figure>
            </section>

            <section id="grain-supplements">
              <h2>Grain & Supplements</h2>
              <p>Most donkeys do not require grain if they have access to quality hay and pasture. However, working donkeys, pregnant/lactating jennies, or underweight donkeys may benefit from supplemental grain.</p>
              <!-- More content... -->
            </section>

            <!-- Additional sections: water, treats, schedule -->
            
          </div>
          
        </div>
      </div>
    </section>
  </article>
</main>
```

**Responsibilities:**
- Provide comprehensive care information organized by category
- Enable easy navigation with table of contents (sticky sidebar)
- Support learning with visual examples (images, diagrams)
- Cross-link to related content (breed-specific care notes)

---

### 3.6 Image Lightbox Component

**File:** `src/scripts/lightbox.js`

**Design:**
```javascript
/**
 * Simple image lightbox for viewing full-size images
 * Triggered by clicking images with data-lightbox attribute
 */

export class Lightbox {
  constructor() {
    this.lightboxContainer = null;
    this.lightboxImage = null;
    this.lightboxCaption = null;
    this.currentImage = null;
    
    this.createLightbox();
    this.bindEvents();
  }

  createLightbox() {
    // Create lightbox HTML structure
    this.lightboxContainer = document.createElement('div');
    this.lightboxContainer.className = 'lightbox';
    this.lightboxContainer.setAttribute('role', 'dialog');
    this.lightboxContainer.setAttribute('aria-modal', 'true');
    this.lightboxContainer.setAttribute('aria-label', 'Image viewer');
    
    this.lightboxContainer.innerHTML = `
      <div class="lightbox-backdrop"></div>
      <div class="lightbox-content">
        <button class="lightbox-close" aria-label="Close lightbox">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2"/>
          </svg>
        </button>
        <img class="lightbox-image" src="" alt="">
        <div class="lightbox-caption"></div>
      </div>
    `;
    
    document.body.appendChild(this.lightboxContainer);
    
    this.lightboxImage = this.lightboxContainer.querySelector('.lightbox-image');
    this.lightboxCaption = this.lightboxContainer.querySelector('.lightbox-caption');
  }

  bindEvents() {
    // Click on images with data-lightbox attribute
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-lightbox]');
      if (trigger) {
        e.preventDefault();
        this.open(trigger);
      }
    });
    
    // Close button
    this.lightboxContainer.querySelector('.lightbox-close').addEventListener('click', () => {
      this.close();
    });
    
    // Close on backdrop click
    this.lightboxContainer.querySelector('.lightbox-backdrop').addEventListener('click', () => {
      this.close();
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen()) {
        this.close();
      }
    });
  }

  open(imageElement) {
    this.currentImage = imageElement;
    
    // Get full-size image source (or use current src)
    const fullSrc = imageElement.dataset.lightboxSrc || imageElement.src;
    const alt = imageElement.alt || '';
    const caption = imageElement.dataset.caption || imageElement.alt || '';
    
    this.lightboxImage.src = fullSrc;
    this.lightboxImage.alt = alt;
    this.lightboxCaption.textContent = caption;
    
    this.lightboxContainer.classList.add('is-open');
    document.body.style.overflow = 'hidden'; // Prevent scroll
    
    // Focus close button for accessibility
    this.lightboxContainer.querySelector('.lightbox-close').focus();
  }

  close() {
    this.lightboxContainer.classList.remove('is-open');
    document.body.style.overflow = '';
    
    // Return focus to trigger element
    if (this.currentImage) {
      this.currentImage.focus();
    }
  }

  isOpen() {
    return this.lightboxContainer.classList.contains('is-open');
  }
}
```

**CSS (`lightbox.css`):**
```css
.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  display: none;
  align-items: center;
  justify-content: center;
}

.lightbox.is-open {
  display: flex;
}

.lightbox-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.9);
}

.lightbox-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  z-index: 1;
}

.lightbox-image {
  max-width: 100%;
  max-height: 85vh;
  display: block;
  margin: 0 auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
}

.lightbox-close {
  position: absolute;
  top: -40px;
  right: 0;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.lightbox-close:hover,
.lightbox-close:focus {
  background: rgba(255, 255, 255, 0.3);
}

.lightbox-caption {
  text-align: center;
  color: white;
  margin-top: 1rem;
  font-size: 0.875rem;
}
```

**Responsibilities:**
- Display full-size images in overlay modal
- Keyboard accessible (Escape to close, focus management)
- Click outside to close
- Display image captions

---

## 4. Database Schema Changes

<!-- AI: SQL/migration scripts for schema changes -->

**Not Applicable**

This is a static website with no database. All content is stored as files in the Git repository.

**Content Structure (File-based):**

Content is managed as Markdown files with YAML frontmatter:

**Example: `src/content/breeds/miniature-mediterranean.md`**
```markdown
---
id: miniature-mediterranean
name: Miniature Mediterranean Donkey
slug: miniature-mediterranean
height: 32-34 inches (81-86 cm)
weight: 200-350 lbs (91-159 kg)
temperament: Gentle, friendly, intelligent
origin: Mediterranean islands (Sicily, Sardinia)
colors: Gray-dun, black, brown, spotted
lifespan: 25-35 years
images:
  - miniature-mediterranean-1.jpg
  - miniature-mediterranean-2.jpg
---

# Miniature Mediterranean Donkey

The Miniature Mediterranean Donkey is one of the smallest donkey breeds, originating from the islands of Sicily and Sardinia...

## Characteristics

[Content continues in Markdown format]
```

**Data Validation:**

During build process, validate content files:
- Required fields present (id, name, slug)
- Image files exist in `src/images/breeds/`
- Valid YAML frontmatter syntax
- Internal links resolve correctly

**Content Schema Documentation:**

See `docs/content-schema.md` (to be created) for full content file structure requirements.

---

## 5. API Implementation Details

<!-- AI: For each API endpoint, specify handler logic, validation, error handling -->

**Not Applicable**

This is a static website with no backend API endpoints. All content is pre-rendered and served as static HTML files.

**Static Routes:**

The following routes are available as static HTML files:

| Route | File | Description |
|-------|------|-------------|
| `/` | `dist/index.html` | Homepage |
| `/breeds/` | `dist/breeds/index.html` | Breeds listing |
| `/breeds/miniature-mediterranean.html` | `dist/breeds/miniature-mediterranean.html` | Breed detail |
| `/breeds/standard-donkey.html` | `dist/breeds/standard-donkey.html` | Breed detail |
| `/breeds/mammoth-donkey.html` | `dist/breeds/mammoth-donkey.html` | Breed detail |
| `/breeds/poitou-donkey.html` | `dist/breeds/poitou-donkey.html` | Breed detail |
| `/care/` | `dist/care/index.html` | Care guide overview |
| `/care/feeding.html` | `dist/care/feeding.html` | Feeding guide |
| `/care/grooming.html` | `dist/care/grooming.html` | Grooming guide |
| `/care/housing.html` | `dist/care/housing.html` | Housing guide |
| `/care/health.html` | `dist/care/health.html` | Health guide |
| `/facts.html` | `dist/facts.html` | Facts and about page |
| `/404.html` | `dist/404.html` | Custom 404 error page |

**HTTP Responses:**

All routes return:
- Status: `200 OK` for valid pages
- Status: `404 Not Found` for missing pages (serves custom 404.html)
- Content-Type: `text/html; charset=utf-8`
- Security headers (see `netlify.toml` configuration)

**Redirects:**

Configure in `netlify.toml`:
```toml
[[redirects]]
  from = "/breeds"
  to = "/breeds/"
  status = 301

[[redirects]]
  from = "/care"
  to = "/care/"
  status = 301
```

---

## 6. Function Signatures

<!-- AI: Key function/method signatures with parameters and return types -->

### Build Scripts

**`build/compile-markdown.js`**

```javascript
/**
 * Compile Markdown content files to HTML using frontmatter data
 * @param {string} srcDir - Source directory containing Markdown files
 * @param {string} distDir - Destination directory for HTML output
 * @param {string} templateDir - Directory containing HTML templates
 * @returns {Promise<BuildResult>} Build statistics and status
 */
async function compileMarkdown(srcDir, distDir, templateDir)

/**
 * Parse Markdown file with YAML frontmatter
 * @param {string} filePath - Path to Markdown file
 * @returns {Promise<ContentFile>} Parsed content with frontmatter and body
 */
async function parseMarkdownFile(filePath)

/**
 * Render template with content data
 * @param {string} templatePath - Path to HTML template
 * @param {Object} data - Content data to inject into template
 * @returns {string} Rendered HTML string
 */
function renderTemplate(templatePath, data)

/**
 * Validate content file schema
 * @param {ContentFile} content - Parsed content file
 * @param {string} contentType - Type of content (breed, care, fact)
 * @throws {ValidationError} If required fields are missing or invalid
 */
function validateContent(content, contentType)

// Type definitions
/**
 * @typedef {Object} ContentFile
 * @property {Object} frontmatter - YAML frontmatter data
 * @property {string} body - Markdown body content
 * @property {string} html - Rendered HTML body
 */

/**
 * @typedef {Object} BuildResult
 * @property {number} filesProcessed - Number of files compiled
 * @property {number} errors - Number of errors encountered
 * @property {number} durationMs - Build duration in milliseconds
 */
```

**`build/optimize-images.js`**

```javascript
/**
 * Optimize images and generate responsive variants
 * @param {string} srcDir - Source image directory
 * @param {string} distDir - Destination directory for optimized images
 * @param {OptimizeOptions} options - Optimization settings
 * @returns {Promise<ImageResult>} Optimization statistics
 */
async function optimizeImages(srcDir, distDir, options = {})

/**
 * Generate responsive image sizes from original
 * @param {string} imagePath - Path to source image
 * @param {number[]} widths - Array of target widths (e.g., [400, 800, 1200])
 * @param {string} outputDir - Directory for output files
 * @returns {Promise<ResponsiveImages>} Paths to generated image variants
 */
async function generateResponsiveImages(imagePath, widths, outputDir)

/**
 * Convert image to WebP format
 * @param {string} inputPath - Input image path (JPEG/PNG)
 * @param {string} outputPath - Output WebP path
 * @param {number} quality - WebP quality (1-100, default 80)
 * @returns {Promise<void>}
 */
async function convertToWebP(inputPath, outputPath, quality = 80)

// Type definitions
/**
 * @typedef {Object} OptimizeOptions
 * @property {number[]} widths - Responsive image widths
 * @property {number} quality - JPEG/WebP quality (1-100)
 * @property {boolean} generateWebP - Generate WebP variants
 */

/**
 * @typedef {Object} ResponsiveImages
 * @property {string} original - Original image path
 * @property {Object.<number, string>} variants - Map of width to file path
 * @property {Object.<number, string>} webp - Map of width to WebP file path
 */
```

**`build/bundle-css.js`**

```javascript
/**
 * Concatenate and minify CSS files
 * @param {string[]} inputFiles - Array of CSS file paths to bundle
 * @param {string} outputFile - Path to output bundled CSS
 * @returns {Promise<CSSResult>} Bundle statistics
 */
async function bundleCSS(inputFiles, outputFile)

/**
 * Extract critical above-the-fold CSS
 * @param {string} htmlFile - Path to HTML file
 * @param {string} cssFile - Path to full CSS file
 * @returns {Promise<string>} Critical CSS string
 */
async function extractCriticalCSS(htmlFile, cssFile)
```

### Frontend JavaScript

**`src/scripts/navigation.js`**

```javascript
/**
 * Navigation menu controller
 */
class Navigation {
  /**
   * Create navigation controller
   */
  constructor()

  /**
   * Initialize event listeners
   * @private
   */
  init(): void

  /**
   * Toggle mobile menu open/closed
   */
  toggleMenu(): void

  /**
   * Open mobile menu
   */
  openMenu(): void

  /**
   * Close mobile menu
   */
  closeMenu(): void

  /**
   * Check if menu is currently open
   * @returns {boolean} True if menu is open
   */
  isMenuOpen(): boolean
}
```

**`src/scripts/lazyload.js`**

```javascript
/**
 * Lazy load images using Intersection Observer
 */
class LazyLoader {
  /**
   * @param {LazyLoadOptions} options - Configuration options
   */
  constructor(options = {})

  /**
   * Initialize Intersection Observer
   * @private
   */
  init(): void

  /**
   * Handle intersection events
   * @param {IntersectionObserverEntry[]} entries - Observer entries
   * @private
   */
  handleIntersection(entries): void

  /**
   * Load a specific image
   * @param {HTMLImageElement} img - Image element to load
   * @private
   */
  loadImage(img): void
}

/**
 * @typedef {Object} LazyLoadOptions
 * @property {string} rootMargin - Margin around viewport (default: '50px')
 * @property {number} threshold - Intersection threshold (default: 0.01)
 */
```

**`src/scripts/lightbox.js`**

```javascript
/**
 * Image lightbox viewer
 */
class Lightbox {
  /**
   * Create lightbox instance
   */
  constructor()

  /**
   * Create lightbox DOM structure
   * @private
   */
  createLightbox(): void

  /**
   * Bind event listeners
   * @private
   */
  bindEvents(): void

  /**
   * Open lightbox with image
   * @param {HTMLImageElement} imageElement - Image to display
   */
  open(imageElement): void

  /**
   * Close lightbox
   */
  close(): void

  /**
   * Check if lightbox is open
   * @returns {boolean} True if lightbox is open
   */
  isOpen(): boolean
}
```

**`src/scripts/main.js`**

```javascript
/**
 * Main entry point - initialize all components
 */

import { Navigation } from './navigation.js';
import { LazyLoader } from './lazyload.js';
import { Lightbox } from './lightbox.js';

/**
 * Initialize application on DOM ready
 */
function init() {
  new Navigation();
  new LazyLoader();
  new Lightbox();
}

// Run on DOM content loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
```

---

## 7. State Management

<!-- AI: How application state is managed (Redux, Context, database) -->

**Not Applicable**

This is a static website with minimal client-side interactivity and no complex application state to manage.

**Component-Level State:**

Each interactive component manages its own local state:

**Navigation Component State:**
```javascript
// State stored in DOM and class instance
{
  isMenuOpen: boolean,          // Menu open/closed state
  menuToggle: HTMLElement,      // Reference to toggle button
  navMenu: HTMLElement,         // Reference to menu element
  iconMenu: HTMLElement,        // Menu icon element
  iconClose: HTMLElement        // Close icon element
}
```

**Lightbox Component State:**
```javascript
{
  isOpen: boolean,                    // Lightbox open/closed state
  currentImage: HTMLImageElement,     // Currently displayed image
  lightboxContainer: HTMLElement,     // Container element reference
  lightboxImage: HTMLImageElement,    // Lightbox image element
  lightboxCaption: HTMLElement        // Caption element
}
```

**LazyLoader Component State:**
```javascript
{
  images: NodeList,                 // Images to lazy load
  observer: IntersectionObserver,   // Observer instance
  options: Object                   // Observer configuration
}
```

**State Persistence:**

- **No localStorage or sessionStorage**: Not needed for this simple site
- **No cookies**: No user preferences or sessions to track
- **URL State**: Current page reflected in URL (browser manages history)
- **CSS State**: UI state (menu open, lightbox visible) managed via CSS classes

**State Management Pattern:**

Uses **Component-Based State** pattern:
- Each component is self-contained
- State stored in component class instances
- State changes trigger DOM updates directly
- No global state store required (no Redux, MobX, Zustand)

**Future Consideration:**

If interactive features expand significantly (e.g., filtering, search, favorites), consider:
- URL parameters for filter state (enables sharing and bookmarking)
- localStorage for user preferences (theme, font size)
- Simple global event bus for component communication

---

## 8. Error Handling Strategy

<!-- AI: Error codes, exception handling, user-facing messages -->

### Build-Time Errors

**Content Validation Errors:**

```javascript
// build/compile-markdown.js

class ValidationError extends Error {
  constructor(filePath, field, message) {
    super(`Validation error in ${filePath}: ${field} - ${message}`);
    this.name = 'ValidationError';
    this.filePath = filePath;
    this.field = field;
  }
}

// Error codes and handling
const VALIDATION_ERRORS = {
  MISSING_FIELD: 'Required field is missing',
  INVALID_FORMAT: 'Field format is invalid',
  IMAGE_NOT_FOUND: 'Referenced image file does not exist',
  INVALID_LINK: 'Internal link points to non-existent page',
};

// Example validation
function validateContent(content, contentType) {
  const requiredFields = {
    breed: ['id', 'name', 'slug', 'height', 'weight'],
    care: ['id', 'title', 'slug'],
    fact: ['id', 'title', 'slug'],
  };

  const required = requiredFields[contentType];
  for (const field of required) {
    if (!content.frontmatter[field]) {
      throw new ValidationError(
        content.filePath,
        field,
        VALIDATION_ERRORS.MISSING_FIELD
      );
    }
  }

  // Validate image references
  if (content.frontmatter.images) {
    for (const image of content.frontmatter.images) {
      const imagePath = path.join('src/images', contentType, image);
      if (!fs.existsSync(imagePath)) {
        throw new ValidationError(
          content.filePath,
          'images',
          `${VALIDATION_ERRORS.IMAGE_NOT_FOUND}: ${image}`
        );
      }
    }
  }
}

// Build error handling
try {
  await compileMarkdown('src/content', 'dist', 'src/templates');
} catch (error) {
  if (error instanceof ValidationError) {
    console.error(`❌ Build failed: ${error.message}`);
    process.exit(1);
  }
  throw error; // Re-throw unexpected errors
}
```

**Image Optimization Errors:**

```javascript
// build/optimize-images.js

async function optimizeImages(srcDir, distDir, options) {
  const results = {
    success: [],
    errors: [],
  };

  for (const imagePath of imageFiles) {
    try {
      await generateResponsiveImages(imagePath, options.widths, distDir);
      results.success.push(imagePath);
    } catch (error) {
      results.errors.push({
        file: imagePath,
        error: error.message,
      });
      console.warn(`⚠️  Failed to optimize ${imagePath}: ${error.message}`);
      // Continue processing other images
    }
  }

  if (results.errors.length > 0) {
    console.error(`❌ ${results.errors.length} images failed optimization`);
    // Decide: fail build or warn and continue
    if (options.strict) {
      throw new Error('Image optimization failed');
    }
  }

  return results;
}
```

### Runtime Errors (Client-Side)

**JavaScript Error Handling:**

```javascript
// src/scripts/main.js

/**
 * Global error handler for uncaught errors
 */
window.addEventListener('error', (event) => {
  console.error('Uncaught error:', event.error);
  
  // Optional: Send to error tracking service (Sentry, etc.)
  // logErrorToService(event.error);
  
  // Don't show error to user for non-critical issues
  // Site should remain functional even if JS fails
});

/**
 * Handle unhandled promise rejections
 */
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  // Optional: Send to error tracking
});
```

**Component Error Handling:**

```javascript
// src/scripts/navigation.js

class Navigation {
  constructor() {
    try {
      this.menuToggle = document.querySelector('.mobile-menu-toggle');
      this.navMenu = document.querySelector('.nav-menu');
      
      if (!this.menuToggle || !this.navMenu) {
        console.warn('Navigation: Required elements not found. Navigation disabled.');
        return; // Graceful degradation
      }
      
      this.init();
    } catch (error) {
      console.error('Navigation initialization failed:', error);
      // Site remains usable without JS navigation
    }
  }

  toggleMenu() {
    try {
      if (this.isMenuOpen()) {
        this.closeMenu();
      } else {
        this.openMenu();
      }
    } catch (error) {
      console.error('Menu toggle failed:', error);
      // Menu may be stuck, but page is still functional
    }
  }
}
```

**Image Loading Errors:**

```javascript
// Handle broken images gracefully
document.addEventListener('error', (event) => {
  if (event.target.tagName === 'IMG') {
    console.warn('Image failed to load:', event.target.src);
    
    // Replace with placeholder or hide
    event.target.alt = 'Image unavailable';
    event.target.classList.add('image-error');
    
    // Optional: Try fallback image
    if (event.target.dataset.fallback) {
      event.target.src = event.target.dataset.fallback;
    }
  }
}, true); // Use capture to catch all image errors
```

### HTTP Errors

**404 Not Found:**

Custom 404 page (`dist/404.html`):
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Not Found - Donkey Website</title>
  <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
  <main id="main-content" class="error-page">
    <div class="container">
      <h1>Page Not Found</h1>
      <p>Sorry, we couldn't find the page you're looking for.</p>
      <nav aria-label="Helpful links">
        <ul>
          <li><a href="/">Return to Homepage</a></li>
          <li><a href="/breeds/">Browse Donkey Breeds</a></li>
          <li><a href="/care/">Read Care Guides</a></li>
        </ul>
      </nav>
    </div>
  </main>
</body>
</html>
```

Configure in `netlify.toml`:
```toml
[[redirects]]
  from = "/*"
  to = "/404.html"
  status = 404
```

**5xx Server Errors:**

Handled by hosting platform (Netlify/Vercel):
- Automatic retry on temporary failures
- Fallback to cached version if available
- Platform status page for service issues

### User-Facing Error Messages

**Principles:**
- Errors should be informative but not technical
- Provide actionable next steps
- Maintain friendly, approachable tone
- Never expose system details or stack traces

**Example Messages:**

| Scenario | User Message |
|----------|-------------|
| Page not found (404) | "Oops! We couldn't find that page. Try visiting our homepage or browsing our donkey breeds." |
| Image failed to load | *Image hidden or replaced with alt text, no error message shown* |
| JavaScript disabled | *Site remains functional with static HTML, no error needed* |
| Old browser | *Progressive enhancement ensures basic functionality, optional: "For the best experience, use a modern browser"* |

**Accessibility:**
- Error messages announced to screen readers via ARIA live regions if critical
- Focus management after errors (e.g., focus on error message)
- Visible focus indicators for keyboard navigation

---

## 9. Test Plan

### Unit Tests

**Build Script Tests (`tests/build/compile-markdown.test.js`):**

```javascript
import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { parseMarkdownFile, validateContent, renderTemplate } from '../../build/compile-markdown.js';
import fs from 'fs/promises';
import path from 'path';

describe('compile-markdown', () => {
  describe('parseMarkdownFile', () => {
    it('should parse valid markdown file with frontmatter', async () => {
      const testFile = 'tests/fixtures/valid-breed.md';
      const result = await parseMarkdownFile(testFile);
      
      expect(result.frontmatter).toHaveProperty('id');
      expect(result.frontmatter).toHaveProperty('name');
      expect(result.body).toBeTruthy();
      expect(result.html).toContain('<h1>');
    });

    it('should throw error for invalid YAML frontmatter', async () => {
      const testFile = 'tests/fixtures/invalid-frontmatter.md';
      await expect(parseMarkdownFile(testFile)).rejects.toThrow();
    });

    it('should handle markdown with no frontmatter', async () => {
      const testFile = 'tests/fixtures/no-frontmatter.md';
      const result = await parseMarkdownFile(testFile);
      
      expect(result.frontmatter).toEqual({});
      expect(result.html).toBeTruthy();
    });
  });

  describe('validateContent', () => {
    it('should pass validation for valid breed content', () => {
      const content = {
        frontmatter: {
          id: 'test-breed',
          name: 'Test Breed',
          slug: 'test-breed',
          height: '36 inches',
          weight: '400 lbs',
        },
      };
      
      expect(() => validateContent(content, 'breed')).not.toThrow();
    });

    it('should throw ValidationError for missing required field', () => {
      const content = {
        frontmatter: {
          id: 'test-breed',
          // Missing 'name' field
          slug: 'test-breed',
        },
      };
      
      expect(() => validateContent(content, 'breed')).toThrow('Required field is missing');
    });

    it('should validate image file references exist', () => {
      const content = {
        frontmatter: {
          id: 'test-breed',
          name: 'Test Breed',
          images: ['non-existent-image.jpg'],
        },
      };
      
      expect(() => validateContent(content, 'breed')).toThrow('Referenced image file does not exist');
    });
  });

  describe('renderTemplate', () => {
    it('should inject content data into template', () => {
      const template = '<h1>{{title}}</h1><p>{{description}}</p>';
      const data = { title: 'Test Title', description: 'Test description' };
      
      const result = renderTemplate(template, data);
      
      expect(result).toContain('<h1>Test Title</h1>');
      expect(result).toContain('<p>Test description</p>');
    });

    it('should handle missing data gracefully', () => {
      const template = '<h1>{{title}}</h1>';
      const data = {}; // Missing title
      
      const result = renderTemplate(template, data);
      
      expect(result).toContain('<h1></h1>');
    });
  });
});
```

**Image Optimization Tests (`tests/build/optimize-images.test.js`):**

```javascript
import { describe, it, expect } from '@jest/globals';
import { generateResponsiveImages, convertToWebP } from '../../build/optimize-images.js';
import fs from 'fs/promises';

describe('optimize-images', () => {
  it('should generate responsive image sizes', async () => {
    const testImage = 'tests/fixtures/test-image.jpg';
    const outputDir = 'tests/temp/output';
    const widths = [400, 800, 1200];
    
    const result = await generateResponsiveImages(testImage, widths, outputDir);
    
    expect(result.variants).toHaveProperty('400');
    expect(result.variants).toHaveProperty('800');
    expect(result.variants).toHaveProperty('1200');
    
    // Verify files exist
    for (const width of widths) {
      const filePath = result.variants[width];
      await expect(fs.access(filePath)).resolves.not.toThrow();
    }
  });

  it('should convert JPEG to WebP', async () => {
    const inputPath = 'tests/fixtures/test-image.jpg';
    const outputPath = 'tests/temp/test-image.webp';
    
    await convertToWebP(inputPath, outputPath, 80);
    
    await expect(fs.access(outputPath)).resolves.not.toThrow();
    
    // Verify WebP is smaller than JPEG (generally)
    const jpegSize = (await fs.stat(inputPath)).size;
    const webpSize = (await fs.stat(outputPath)).size;
    expect(webpSize).toBeLessThan(jpegSize);
  });

  it('should handle invalid image gracefully', async () => {
    const invalidImage = 'tests/fixtures/not-an-image.txt';
    const outputDir = 'tests/temp/output';
    
    await expect(generateResponsiveImages(invalidImage, [400], outputDir)).rejects.toThrow();
  });
});
```

**JavaScript Component Tests (`tests/scripts/navigation.test.js`):**

```javascript
import { describe, it, expect, beforeEach } from '@jest/globals';
import { Navigation } from '../../src/scripts/navigation.js';

// Setup JSDOM environment for DOM testing
import { JSDOM } from 'jsdom';

describe('Navigation', () => {
  let dom;
  let document;
  let navigation;

  beforeEach(() => {
    dom = new JSDOM(`
      <nav class="main-nav">
        <button class="mobile-menu-toggle" aria-expanded="false">
          <svg class="icon-menu"></svg>
          <svg class="icon-close" hidden></svg>
        </button>
        <ul class="nav-menu">
          <li><a href="/">Home</a></li>
          <li><a href="/breeds/">Breeds</a></li>
        </ul>
      </nav>
    `);
    
    global.document = dom.window.document;
    global.window = dom.window;
    
    navigation = new Navigation();
  });

  it('should initialize with menu closed', () => {
    expect(navigation.isMenuOpen()).toBe(false);
    expect(navigation.menuToggle.getAttribute('aria-expanded')).toBe('false');
  });

  it('should open menu when toggled', () => {
    navigation.openMenu();
    
    expect(navigation.isMenuOpen()).toBe(true);
    expect(navigation.navMenu.classList.contains('is-open')).toBe(true);
    expect(navigation.menuToggle.getAttribute('aria-expanded')).toBe('true');
  });

  it('should close menu when toggled again', () => {
    navigation.openMenu();
    navigation.closeMenu();
    
    expect(navigation.isMenuOpen()).toBe(false);
    expect(navigation.navMenu.classList.contains('is-open')).toBe(false);
  });

  it('should toggle icon visibility when opening/closing', () => {
    navigation.openMenu();
    expect(navigation.iconMenu.hasAttribute('hidden')).toBe(true);
    expect(navigation.iconClose.hasAttribute('hidden')).toBe(false);
    
    navigation.closeMenu();
    expect(navigation.iconMenu.hasAttribute('hidden')).toBe(false);
    expect(navigation.iconClose.hasAttribute('hidden')).toBe(true);
  });
});
```

**CSS Tests (optional):**

Use CSS linting and validation:
```bash
# stylelint for CSS quality
npx stylelint "src/styles/**/*.css"

# CSS validation
npx w3c-css-validator dist/css/styles.css
```

### Integration Tests

**Full Build Pipeline Test (`tests/integration/build-pipeline.test.js`):**

```javascript
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';

const execAsync = promisify(exec);

describe('Build Pipeline Integration', () => {
  beforeAll(async () => {
    // Clean dist directory
    await execAsync('rm -rf dist');
  });

  it('should complete full build successfully', async () => {
    const { stdout, stderr } = await execAsync('npm run build');
    
    expect(stderr).toBe('');
    expect(stdout).toContain('Build completed');
  }, 60000); // 60s timeout for full build

  it('should generate all expected HTML files', async () => {
    const expectedFiles = [
      'dist/index.html',
      'dist/breeds/index.html',
      'dist/breeds/miniature-mediterranean.html',
      'dist/breeds/standard-donkey.html',
      'dist/care/index.html',
      'dist/care/feeding.html',
      'dist/facts.html',
      'dist/404.html',
    ];

    for (const file of expectedFiles) {
      await expect(fs.access(file)).resolves.not.toThrow();
    }
  });

  it('should generate optimized images', async () => {
    const files = await fs.readdir('dist/images/breeds');
    
    // Should have both WebP and JPEG files
    const webpFiles = files.filter(f => f.endsWith('.webp'));
    const jpegFiles = files.filter(f => f.endsWith('.jpg'));
    
    expect(webpFiles.length).toBeGreaterThan(0);
    expect(jpegFiles.length).toBeGreaterThan(0);
  });

  it('should generate bundled and minified CSS', async () => {
    const cssContent = await fs.readFile('dist/css/styles.css', 'utf-8');
    
    // Minified CSS should not have newlines between rules
    expect(cssContent).not.toContain('  '); // No indentation
    expect(cssContent.length).toBeGreaterThan(0);
  });

  it('should include critical CSS inline in HTML', async () => {
    const htmlContent = await fs.readFile('dist/index.html', 'utf-8');
    
    // Should have <style> tag with inlined CSS
    expect(htmlContent).toContain('<style>');
    expect(htmlContent).toMatch(/<style>.*<\/style>/s);
  });

  it('should validate HTML structure', async () => {
    const htmlContent = await fs.readFile('dist/index.html', 'utf-8');
    
    expect(htmlContent).toContain('<!DOCTYPE html>');
    expect(htmlContent).toContain('<html lang="en">');
    expect(htmlContent).toContain('</html>');
    expect(htmlContent).toMatch(/<header[^>]*>/);
    expect(htmlContent).toMatch(/<main[^>]*>/);
    expect(htmlContent).toMatch(/<footer[^>]*>/);
  });
});
```

**Link Validation Test (`tests/integration/link-validator.test.js`):**

```javascript
import { describe, it, expect } from '@jest/globals';
import fs from 'fs/promises';
import path from 'path';

describe('Internal Link Validation', () => {
  let htmlFiles = [];
  
  beforeAll(async () => {
    // Find all HTML files in dist
    htmlFiles = await findHtmlFiles('dist');
  });

  it('should have no broken internal links', async () => {
    const brokenLinks = [];

    for (const file of htmlFiles) {
      const content = await fs.readFile(file, 'utf-8');
      const links = extractLinks(content);
      
      for (const link of links) {
        if (isInternalLink(link)) {
          const targetPath = resolveLink(file, link);
          const exists = await fileExists(targetPath);
          
          if (!exists) {
            brokenLinks.push({ file, link, targetPath });
          }
        }
      }
    }

    if (brokenLinks.length > 0) {
      console.error('Broken internal links found:', brokenLinks);
    }

    expect(brokenLinks).toHaveLength(0);
  });

  function extractLinks(html) {
    const linkRegex = /href=["']([^"']+)["']/g;
    const matches = [];
    let match;
    
    while ((match = linkRegex.exec(html)) !== null) {
      matches.push(match[1]);
    }
    
    return matches;
  }

  function isInternalLink(link) {
    return link.startsWith('/') || link.startsWith('./') || link.startsWith('../');
  }

  async function fileExists(filePath) {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }
});
```

### E2E Tests

**Lighthouse CI Tests (`tests/e2e/lighthouse.test.js`):**

```javascript
import { describe, it, expect } from '@jest/globals';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

describe('Lighthouse Performance', () => {
  let chrome;
  let results;

  beforeAll(async () => {
    // Start Chrome
    chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
    
    // Run Lighthouse on local server (requires dev server running)
    const runnerResult = await lighthouse('http://localhost:8080', {
      port: chrome.port,
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    });
    
    results = runnerResult.lhr;
  });

  afterAll(async () => {
    await chrome.kill();
  });

  it('should achieve performance score > 85', () => {
    const score = results.categories.performance.score * 100;
    console.log('Performance score:', score);
    expect(score).toBeGreaterThanOrEqual(85);
  });

  it('should achieve accessibility score > 90', () => {
    const score = results.categories.accessibility.score * 100;
    console.log('Accessibility score:', score);
    expect(score).toBeGreaterThanOrEqual(90);
  });

  it('should achieve best practices score > 90', () => {
    const score = results.categories['best-practices'].score * 100;
    console.log('Best Practices score:', score);
    expect(score).toBeGreaterThanOrEqual(90);
  });

  it('should achieve SEO score > 90', () => {
    const score = results.categories.seo.score * 100;
    console.log('SEO score:', score);
    expect(score).toBeGreaterThanOrEqual(90);
  });

  it('should have First Contentful Paint < 1.5s', () => {
    const fcp = results.audits['first-contentful-paint'].numericValue / 1000;
    console.log('FCP:', fcp, 'seconds');
    expect(fcp).toBeLessThan(1.5);
  });

  it('should have Largest Contentful Paint < 2.5s', () => {
    const lcp = results.audits['largest-contentful-paint'].numericValue / 1000;
    console.log('LCP:', lcp, 'seconds');
    expect(lcp).toBeLessThan(2.5);
  });

  it('should have Total Blocking Time < 300ms', () => {
    const tbt = results.audits['total-blocking-time'].numericValue;
    console.log('TBT:', tbt, 'ms');
    expect(tbt).toBeLessThan(300);
  });

  it('should have Cumulative Layout Shift < 0.1', () => {
    const cls = results.audits['cumulative-layout-shift'].numericValue;
    console.log('CLS:', cls);
    expect(cls).toBeLessThan(0.1);
  });
});
```

**Accessibility Tests (`tests/e2e/accessibility.test.js`):**

```javascript
import { describe, it, expect, beforeAll } from '@jest/globals';
import { AxePuppeteer } from '@axe-core/puppeteer';
import puppeteer from 'puppeteer';

describe('Accessibility (axe-core)', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  const pages = [
    { url: 'http://localhost:8080/', name: 'Homepage' },
    { url: 'http://localhost:8080/breeds/', name: 'Breeds Listing' },
    { url: 'http://localhost:8080/breeds/miniature-mediterranean.html', name: 'Breed Detail' },
    { url: 'http://localhost:8080/care/', name: 'Care Guide' },
    { url: 'http://localhost:8080/facts.html', name: 'Facts Page' },
  ];

  for (const testPage of pages) {
    it(`should have no accessibility violations on ${testPage.name}`, async () => {
      await page.goto(testPage.url);
      
      const results = await new AxePuppeteer(page).analyze();
      
      if (results.violations.length > 0) {
        console.error(`Accessibility violations on ${testPage.name}:`, results.violations);
      }
      
      expect(results.violations).toHaveLength(0);
    });
  }

  it('should support keyboard navigation on homepage', async () => {
    await page.goto('http://localhost:8080/');
    
    // Tab through interactive elements
    await page.keyboard.press('Tab');
    let focusedElement = await page.evaluate(() => document.activeElement.tagName);
    expect(['A', 'BUTTON']).toContain(focusedElement);
    
    // Should be able to activate with Enter
    await page.keyboard.press('Enter');
    // Verify navigation or action occurred
  });
});
```

**Visual Regression Tests (Optional) (`tests/e2e/visual-regression.test.js`):**

```javascript
import { describe, it } from '@jest/globals';
import puppeteer from 'puppeteer';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

expect.extend({ toMatchImageSnapshot });

describe('Visual Regression', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
  });

  afterAll(async () => {
    await browser.close();
  });

  it('should match homepage screenshot (desktop)', async () => {
    await page.goto('http://localhost:8080/');
    const screenshot = await page.screenshot();
    
    expect(screenshot).toMatchImageSnapshot({
      failureThreshold: 0.01,
      failureThresholdType: 'percent',
    });
  });

  it('should match homepage screenshot (mobile)', async () => {
    await page.setViewport({ width: 375, height: 667 });
    await page.goto('http://localhost:8080/');
    const screenshot = await page.screenshot();
    
    expect(screenshot).toMatchImageSnapshot({
      failureThreshold: 0.01,
      failureThresholdType: 'percent',
    });
  });
});
```

**Test Commands (`package.json`):**

```json
{
  "scripts": {
    "test": "npm run test:unit && npm run test:integration",
    "test:unit": "jest tests/build tests/scripts",
    "test:integration": "jest tests/integration",
    "test:e2e": "npm run dev & wait-on http://localhost:8080 && jest tests/e2e && kill %1",
    "test:lighthouse": "npm run dev & wait-on http://localhost:8080 && jest tests/e2e/lighthouse.test.js && kill %1",
    "test:accessibility": "npm run dev & wait-on http://localhost:8080 && jest tests/e2e/accessibility.test.js && kill %1",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

---

## 10. Migration Strategy

<!-- AI: How to migrate from current state to new implementation -->

**Current State:** Empty repository with documentation only (PRD, HLD, LLD)

**Target State:** Fully functional static donkey website deployed to production

**Migration Phases:**

### Phase 1: Repository Setup & Tooling (Days 1-2)

**Steps:**
1. Initialize Node.js project
   ```bash
   npm init -y
   ```

2. Install build dependencies
   ```bash
   npm install --save-dev sharp clean-css terser markdown-it gray-matter
   npm install --save-dev jest @jest/globals jsdom puppeteer lighthouse @axe-core/puppeteer
   npm install --save-dev stylelint stylelint-config-standard
   ```

3. Create directory structure
   ```bash
   mkdir -p src/{content,images,styles,scripts,templates}
   mkdir -p src/content/{breeds,care,facts}
   mkdir -p src/images/{hero,breeds,care,icons}
   mkdir -p src/styles/{base,layout,components,utilities}
   mkdir -p build
   mkdir -p tests/{build,scripts,integration,e2e}
   ```

4. Create `.gitignore`
   ```
   node_modules/
   dist/
   .env
   .DS_Store
   coverage/
   ```

5. Create `.nvmrc`
   ```
   18
   ```

6. Update `README.md` with project overview, setup instructions, build commands

**Deliverables:**
- Package.json with dependencies
- Directory structure in place
- Git repository configured

---

### Phase 2: Build System Implementation (Days 3-5)

**Steps:**
1. Implement Markdown compiler (`build/compile-markdown.js`)
   - Parse Markdown files with frontmatter
   - Validate content schema
   - Render templates with content data
   - Write HTML to dist directory

2. Implement image optimizer (`build/optimize-images.js`)
   - Generate responsive image sizes (400w, 800w, 1200w)
   - Convert to WebP format
   - Copy original JPEGs as fallback

3. Implement CSS bundler (`build/bundle-css.js`)
   - Concatenate CSS files in correct order
   - Minify with clean-css
   - Extract critical CSS for inline

4. Implement main build orchestrator (`build/build.js`)
   - Clean dist directory
   - Run all build steps in order
   - Report errors and statistics

5. Add build scripts to `package.json`
   ```json
   {
     "scripts": {
       "build": "node build/build.js",
       "clean": "rm -rf dist",
       "dev": "npm run build && npx serve dist -p 8080",
       "watch": "nodemon -e md,css,js,jpg,png -w src --exec 'npm run build'"
     }
   }
   ```

6. Test build pipeline
   - Create sample content file
   - Create sample image
   - Run build
   - Verify dist output

**Deliverables:**
- Working build system
- Build scripts tested and functional
- Sample output generated

---

### Phase 3: Frontend Implementation - Structure & Styles (Days 6-10)

**Steps:**
1. Create CSS foundation
   - `src/styles/base/reset.css` - CSS reset
   - `src/styles/base/variables.css` - CSS custom properties
     ```css
     :root {
       --color-primary: #8B4513;
       --color-primary-dark: #654321;
       --color-primary-light: #F4E4D7;
       --color-text: #333333;
       --color-text-secondary: #666666;
       --color-background: #FFFFFF;
       --color-gray-100: #F7F7F7;
       --color-gray-200: #E5E5E5;
       --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
       --font-serif: Georgia, 'Times New Roman', serif;
       --spacing-xs: 0.25rem;
       --spacing-sm: 0.5rem;
       --spacing-md: 1rem;
       --spacing-lg: 2rem;
       --spacing-xl: 4rem;
     }
     ```
   - `src/styles/base/typography.css` - Font styles, headings

2. Create layout styles
   - `src/styles/layout/header.css` - Site header
   - `src/styles/layout/footer.css` - Site footer
   - `src/styles/layout/grid.css` - Grid system
   - `src/styles/layout/container.css` - Container widths, spacing

3. Create component styles
   - `src/styles/components/navigation.css` - Navigation menu
   - `src/styles/components/button.css` - Button styles
   - `src/styles/components/card.css` - Breed cards
   - `src/styles/components/hero.css` - Hero section
   - `src/styles/components/gallery.css` - Image gallery
   - `src/styles/components/lightbox.css` - Lightbox overlay

4. Create utility styles
   - `src/styles/utilities/accessibility.css` - Screen reader, focus
   - `src/styles/utilities/responsive.css` - Responsive helpers

5. Create HTML templates
   - `src/templates/base.html` - Base layout with header/footer
   - `src/templates/home.html` - Homepage
   - `src/templates/breed-list.html` - Breeds listing
   - `src/templates/breed-detail.html` - Breed detail
   - `src/templates/care-guide.html` - Care guide pages
   - `src/templates/facts.html` - Facts page

6. Test responsive design
   - View in browser at different breakpoints (375px, 768px, 1024px, 1440px)
   - Test in Chrome DevTools device emulator

**Deliverables:**
- Complete CSS styles
- HTML templates ready for content
- Responsive design tested

---

### Phase 4: JavaScript Implementation (Days 11-12)

**Steps:**
1. Implement navigation module (`src/scripts/navigation.js`)
   - Mobile menu toggle
   - Keyboard accessibility
   - Close on outside click

2. Implement lazy loader (`src/scripts/lazyload.js`)
   - Intersection Observer setup
   - Image loading logic
   - Fallback for older browsers

3. Implement lightbox (`src/scripts/lightbox.js`)
   - DOM structure creation
   - Open/close functionality
   - Keyboard navigation (Escape)

4. Create main entry point (`src/scripts/main.js`)
   - Import all modules
   - Initialize on DOM ready

5. Test JavaScript functionality
   - Test mobile menu toggle
   - Test lazy loading behavior
   - Test lightbox open/close
   - Test keyboard navigation

**Deliverables:**
- All JavaScript modules implemented
- Interactivity tested in browser
- No console errors

---

### Phase 5: Content Creation (Days 13-17)

**Steps:**
1. Write breed content (4 breeds)
   - `src/content/breeds/miniature-mediterranean.md`
   - `src/content/breeds/standard-donkey.md`
   - `src/content/breeds/mammoth-donkey.md`
   - `src/content/breeds/poitou-donkey.md`
   - Include frontmatter with all required fields
   - Write comprehensive descriptions (500-800 words each)
   - List characteristics, care requirements

2. Write care guide content (4 sections)
   - `src/content/care/feeding.md`
   - `src/content/care/grooming.md`
   - `src/content/care/housing.md`
   - `src/content/care/health.md`
   - Each section 800-1200 words
   - Include practical tips and best practices

3. Write facts content
   - `src/content/facts/about-donkeys.md`
   - History, behavior, characteristics
   - 1000-1500 words

4. Source and prepare images
   - Find high-quality, licensed donkey images (Unsplash, Pexels, or owned)
   - Organize into appropriate directories
   - Rename with descriptive filenames
   - Verify image quality (min 1200px wide)

5. Create icons and graphics
   - Create or download SVG icons (menu, close, breeds, care, facts)
   - Create simple donkey logo SVG

6. Build and review
   - Run build process
   - Review all pages for content accuracy
   - Check image quality
   - Proofread text

**Deliverables:**
- All content written and reviewed
- All images sourced and organized
- Site fully populated with real content

---

### Phase 6: Testing & Optimization (Days 18-20)

**Steps:**
1. Run unit tests
   ```bash
   npm run test:unit
   ```
   - Fix any failing tests
   - Aim for >80% code coverage

2. Run integration tests
   ```bash
   npm run test:integration
   ```
   - Verify all HTML files generated
   - Validate internal links
   - Check image optimization

3. Run Lighthouse tests
   ```bash
   npm run test:lighthouse
   ```
   - Verify performance score >85
   - Verify accessibility score >90
   - Address any failing audits

4. Run accessibility tests
   ```bash
   npm run test:accessibility
   ```
   - Fix any axe-core violations
   - Test keyboard navigation manually
   - Test with screen reader (NVDA or VoiceOver)

5. Performance optimization
   - Review Lighthouse recommendations
   - Optimize image sizes further if needed
   - Minimize CSS/JS
   - Extract and inline critical CSS

6. Cross-browser testing
   - Test in Chrome, Firefox, Safari, Edge
   - Test on mobile devices (iOS Safari, Chrome Mobile)
   - Fix any browser-specific issues

7. Final content review
   - Proofread all text
   - Verify all links work
   - Check image alt text
   - Ensure consistent tone and style

**Deliverables:**
- All tests passing
- Lighthouse scores meet targets
- Cross-browser compatibility confirmed
- Content finalized

---

### Phase 7: Deployment Setup (Days 21-22)

**Steps:**
1. Create Netlify account (or Vercel)
   - Sign up at netlify.com
   - Connect GitHub repository

2. Configure deployment (`netlify.toml`)
   ```toml
   [build]
     publish = "dist"
     command = "npm run build"

   [build.environment]
     NODE_VERSION = "18"

   [[redirects]]
     from = "/*"
     to = "/404.html"
     status = 404

   [[headers]]
     for = "/*"
     [headers.values]
       X-Frame-Options = "DENY"
       X-Content-Type-Options = "nosniff"
       Strict-Transport-Security = "max-age=31536000"
       Referrer-Policy = "strict-origin-when-cross-origin"

   [[headers]]
     for = "/images/*"
     [headers.values]
       Cache-Control = "public, max-age=31536000, immutable"

   [[headers]]
     for = "/css/*"
     [headers.values]
       Cache-Control = "public, max-age=31536000, immutable"

   [[headers]]
     for = "/js/*"
     [headers.values]
       Cache-Control = "public, max-age=31536000, immutable"
   ```

3. Configure domain (if custom domain)
   - Purchase domain (e.g., donkeywebsite.com)
   - Configure DNS in Netlify
   - Enable SSL certificate

4. Test deployment
   - Push to main branch
   - Verify build succeeds on Netlify
   - Test deployed site
   - Verify SSL works

5. Set up monitoring
   - Enable Netlify Analytics (optional)
   - Configure UptimeRobot for uptime monitoring
   - Set up email alerts

**Deliverables:**
- Site deployed to production
- Custom domain configured (if applicable)
- SSL certificate active
- Monitoring in place

---

### Phase 8: Launch & Post-Launch (Days 23-25)

**Steps:**
1. Pre-launch checklist
   - [ ] All pages load correctly
   - [ ] All images display
   - [ ] All links work
   - [ ] Mobile responsive
   - [ ] Lighthouse scores meet targets
   - [ ] Accessibility tested
   - [ ] SSL certificate valid
   - [ ] Custom domain configured (if applicable)

2. Soft launch
   - Share with small group for feedback
   - Monitor for issues
   - Fix any critical bugs

3. Public launch
   - Announce on social media (if applicable)
   - Submit to search engines (Google Search Console)
   - Monitor traffic and errors

4. Post-launch monitoring
   - Check uptime daily for first week
   - Review Netlify analytics
   - Monitor Lighthouse scores
   - Address any user-reported issues

5. Documentation
   - Update README with live site URL
   - Document content update process
   - Create contributor guide (if open source)

**Deliverables:**
- Site launched publicly
- Monitoring active
- Documentation complete
- Initial feedback addressed

---

**Total Timeline: 25 days (5 weeks)**

**Milestones:**
- End of Week 1: Build system complete
- End of Week 2: Frontend structure complete
- End of Week 3: Content complete
- End of Week 4: Testing complete
- End of Week 5: Deployed and launched

**Rollback Points:**
- Each phase completion is a rollback point
- Git commits at end of each day
- Tagged releases for major milestones

---

## 11. Rollback Plan

<!-- AI: How to rollback if deployment fails -->

**Rollback Strategy:** Instant rollback via Netlify/Vercel deployment history

### Automatic Rollback Triggers

**Build Failures:**
- If build fails on Netlify, deployment is automatically aborted
- Previous version remains live (no downtime)
- Notification sent to maintainer

**Lighthouse CI Failures (optional):**
```javascript
// .github/workflows/lighthouse-ci.yml
// Prevent deployment if Lighthouse scores drop below thresholds
if (performanceScore < 85 || accessibilityScore < 90) {
  process.exit(1); // Fail build
}
```

### Manual Rollback Procedures

**Method 1: Netlify UI Rollback (Recommended - Fastest)**

Steps:
1. Log into Netlify dashboard
2. Navigate to site → Deploys
3. Find previous successful deployment
4. Click "Publish deploy"
5. Confirm rollback

**Time to rollback:** <1 minute

**Method 2: Git Revert**

```bash
# Identify bad commit
git log --oneline -n 10

# Revert commit (creates new commit that undoes changes)
git revert <bad-commit-hash>

# Push to trigger new deployment
git push origin main
```

**Time to rollback:** 2-5 minutes (includes build time)

**Method 3: Git Reset (destructive - use with caution)**

```bash
# Reset to previous good commit
git reset --hard <good-commit-hash>

# Force push (overwrites remote history)
git push -f origin main
```

**Time to rollback:** 2-5 minutes

**CAUTION:** Only use git reset on feature branches or in emergencies. Prefer git revert for main branch.

### Rollback Scenarios & Procedures

**Scenario 1: Broken Build (CSS/JS Errors)**

**Symptoms:**
- Site loads but styling broken
- JavaScript errors in console
- Functionality not working

**Rollback Procedure:**
1. Use Netlify UI rollback (Method 1)
2. Investigate issue locally
3. Fix in feature branch
4. Test thoroughly
5. Deploy fix

**Estimated Downtime:** 0 (previous version still live during rollback)

---

**Scenario 2: Content Errors (Broken Links, Missing Images)**

**Symptoms:**
- 404 errors for internal links
- Missing or broken images
- Incorrect content displayed

**Rollback Procedure:**
1. If critical (many broken links): Rollback via Netlify UI
2. If minor (single broken image): Hot fix
   ```bash
   # Quick fix in content file
   git checkout -b hotfix/broken-image
   # Fix issue
   git commit -m "fix: correct broken image link"
   git push origin hotfix/broken-image
   # Merge and deploy
   ```

**Estimated Downtime:** 0 (minor issues) to 1 minute (full rollback)

---

**Scenario 3: Performance Regression**

**Symptoms:**
- Lighthouse scores drop below thresholds
- Slow page loads
- Large bundle sizes

**Rollback Procedure:**
1. Assess impact severity
   - If severe (scores <70): Rollback immediately
   - If moderate (scores 70-85): Investigate and fix within 24 hours
2. Rollback via Netlify UI if severe
3. Analyze performance issue
   - Review Lighthouse report
   - Check image sizes
   - Check JS bundle size
4. Optimize and redeploy

**Estimated Downtime:** 0 (rollback maintains previous version)

---

**Scenario 4: Accessibility Regression**

**Symptoms:**
- Axe-core violations introduced
- Keyboard navigation broken
- Screen reader issues

**Rollback Procedure:**
1. Severity assessment
   - Critical violations (missing alt text on all images): Rollback immediately
   - Minor violations (contrast issue on one element): Fix within 24 hours
2. Rollback if critical
3. Fix accessibility issues
4. Test with axe-core and screen reader
5. Redeploy

**Estimated Downtime:** 0

---

**Scenario 5: Deployment Failure (Netlify Build Error)**

**Symptoms:**
- Build fails on Netlify
- Deployment marked as "Failed"
- Previous version still live

**Rollback Procedure:**
1. No rollback needed (previous version automatically remains live)
2. Check build logs in Netlify
3. Fix build error locally
4. Test build locally: `npm run build`
5. Push fix when confirmed working

**Estimated Downtime:** 0 (previous version never affected)

---

**Scenario 6: Complete Site Down**

**Symptoms:**
- All pages return 5xx errors
- Site unreachable
- DNS resolution fails

**Rollback Procedure:**
1. Check Netlify status page (status.netlify.com)
2. If Netlify issue: Wait for resolution, no action needed
3. If DNS issue: Verify DNS settings, rollback DNS changes if recent
4. If deployment issue: Rollback to last known good deployment via Netlify UI
5. If none of above: Contact Netlify support

**Estimated Downtime:** Depends on root cause
- Netlify platform issue: Out of our control
- DNS issue: 5-30 minutes (DNS propagation)
- Deployment issue: <1 minute (rollback)

---

### Rollback Testing

**Regular Rollback Drills:**
Perform quarterly rollback tests to ensure process works:

```bash
# Quarterly rollback test procedure
1. Deploy test change to production
2. Verify deployment succeeded
3. Perform rollback via Netlify UI
4. Verify rollback succeeded
5. Document time to rollback
6. Identify any issues in process
```

**Pre-Deployment Rollback Verification:**
Before any major deployment:
1. Identify current deployment ID
2. Document rollback procedure
3. Have Netlify dashboard open and ready
4. Monitor deployment in real-time

---

### Post-Rollback Actions

**After any rollback:**

1. **Incident Documentation**
   - Document what went wrong
   - Document rollback procedure used
   - Document time to rollback
   - Create post-mortem if severe

2. **Root Cause Analysis**
   - Investigate why issue occurred
   - Identify preventive measures
   - Update testing to catch similar issues

3. **Fix and Redeploy**
   - Fix issue in feature branch
   - Comprehensive testing
   - Gradual rollout if possible (Netlify branch deploys for testing)
   - Monitor closely after redeployment

4. **Process Improvement**
   - Update checklist if gap identified
   - Add automated test if applicable
   - Update documentation

---

### Preventing Rollback Scenarios

**Pre-Deployment Checklist:**
- [ ] All tests passing locally
- [ ] Lighthouse scores meet targets
- [ ] Accessibility tests passing
- [ ] Build succeeds locally
- [ ] Preview deployment reviewed (Netlify branch deploy)
- [ ] Content reviewed and proofread
- [ ] Images optimized and verified
- [ ] Internal links validated

**Staging Environment (Optional):**
Create staging branch for final review:
```bash
# Deploy staging branch to staging.donkeywebsite.com
git checkout -b staging
# Test on staging URL before merging to main
```

**Progressive Deployment (Future Enhancement):**
- Use Netlify's split testing feature
- Deploy to 10% of traffic first
- Monitor for errors
- Gradually increase to 100%

---

## 12. Performance Considerations

<!-- AI: Performance optimizations, caching, indexing -->

### Image Optimization Strategy

**Responsive Images:**
Generate multiple sizes for each image:
```javascript
// build/optimize-images.js
const IMAGE_SIZES = {
  thumbnail: 400,
  medium: 800,
  large: 1200,
  xlarge: 1600, // For high-DPI displays
};

// Generate sizes for each image
for (const [size, width] of Object.entries(IMAGE_SIZES)) {
  await sharp(inputPath)
    .resize(width, null, { withoutEnlargement: true })
    .jpeg({ quality: 80, progressive: true })
    .toFile(outputPath);
}
```

**Format Optimization:**
```javascript
// WebP conversion for ~30% smaller files
await sharp(inputPath)
  .webp({ quality: 80 })
  .toFile(webpOutputPath);

// AVIF conversion for even better compression (optional, limited browser support)
await sharp(inputPath)
  .avif({ quality: 75 })
  .toFile(avifOutputPath);
```

**Lazy Loading:**
```html
<!-- Native lazy loading for below-the-fold images -->
<img src="donkey.jpg" alt="Donkey" loading="lazy">

<!-- Eager loading for hero image (above-the-fold) -->
<img src="hero.jpg" alt="Hero" loading="eager">
```

**Image Compression:**
- JPEG quality: 80 (good balance of quality/size)
- WebP quality: 80
- PNG: Use pngquant for lossy compression if needed
- SVG: Minify with SVGO

**Expected Results:**
- Original image: ~2-3 MB
- Optimized JPEG (800w): ~150-200 KB
- Optimized WebP (800w): ~100-150 KB
- Total page size: <500 KB (including all images)

---

### CSS Optimization

**Critical CSS Extraction:**
```javascript
// build/generate-critical-css.js
import Critters from 'critters';

const critters = new Critters({
  path: 'dist',
  inlineFonts: true,
  preload: 'swap',
});

// Extract and inline critical CSS for each HTML file
const html = await fs.readFile('dist/index.html', 'utf-8');
const optimizedHtml = await critters.process(html);
```

**Result:**
- Inline critical CSS: ~5-8 KB (above-fold styles only)
- Deferred full stylesheet: ~20-30 KB (minified)
- No render-blocking CSS

**CSS Minification:**
```javascript
// build/bundle-css.js
import CleanCSS from 'clean-css';

const minifier = new CleanCSS({
  level: 2, // Aggressive optimization
  inline: ['local'], // Inline local imports
});

const minified = minifier.minify(cssContent);
```

**Expected Savings:**
- Original CSS: ~40 KB
- Minified CSS: ~25 KB (40% reduction)
- Gzipped: ~6 KB (75% reduction from minified)

**CSS Best Practices:**
- Remove unused CSS (manual review or PurgeCSS)
- Avoid deep selector nesting
- Use CSS custom properties for theming (no runtime overhead)
- Minimize @import usage (increases request chain)

---

### JavaScript Optimization

**Code Splitting:**
```javascript
// src/scripts/main.js
// Defer non-critical JS
if ('IntersectionObserver' in window) {
  import('./lazyload.js').then(module => new module.LazyLoader());
}

// Only load lightbox if images with data-lightbox exist
if (document.querySelector('[data-lightbox]')) {
  import('./lightbox.js').then(module => new module.Lightbox());
}
```

**Minification:**
```javascript
// build/bundle-css.js (also handles JS)
import { minify } from 'terser';

const minified = await minify(jsContent, {
  compress: {
    dead_code: true,
    drop_console: true, // Remove console.log in production
    drop_debugger: true,
  },
  mangle: true, // Shorten variable names
});
```

**Expected Results:**
- Original JS: ~8 KB
- Minified JS: ~4 KB (50% reduction)
- Gzipped: ~1.5 KB

**Module Strategy:**
- Use native ES6 modules (no bundler overhead)
- Defer non-critical modules
- No polyfills needed (target modern browsers only)

---

### Font Loading Strategy

**System Font Stack (Recommended):**
```css
/* No web font loading overhead */
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 
               'Helvetica Neue', Arial, sans-serif;
}
```

**Alternative: Web Fonts (if custom fonts required):**
```html
<!-- Preload font files for faster rendering -->
<link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin>

<!-- Load fonts with font-display: swap -->
<style>
  @font-face {
    font-family: 'Inter';
    src: url('/fonts/inter-var.woff2') format('woff2');
    font-weight: 100 900;
    font-display: swap; /* Show system font until custom font loads */
  }
</style>
```

**Recommendation:** Use system fonts for Phase 1 launch to maximize performance. Add custom fonts later if branding requires.

---

### Caching Strategy

**CDN Edge Caching:**

Configure in `netlify.toml`:
```toml
# Cache static assets aggressively (immutable)
[[headers]]
  for = "/images/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/css/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/js/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

# HTML pages: Short cache with revalidation
[[headers]]
  for = "/*.html"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"
```

**Cache-Busting Strategy:**
- Static assets (CSS, JS, images) include content hash in filename
- HTML always revalidates to get latest version
- Build process generates new hashes when files change

```javascript
// build/build.js - add content hash to filenames
import crypto from 'crypto';

function addContentHash(content, filename) {
  const hash = crypto.createHash('md5').update(content).digest('hex').slice(0, 8);
  const ext = path.extname(filename);
  const base = path.basename(filename, ext);
  return `${base}.${hash}${ext}`;
}
```

**Service Worker (Future Enhancement):**
Consider adding service worker for offline support:
- Cache static assets for offline viewing
- Stale-while-revalidate strategy
- Not critical for Phase 1

---

### HTML Optimization

**Minimize HTML Size:**
```javascript
// build/compile-markdown.js
import { minify } from 'html-minifier-terser';

const minified = await minify(html, {
  collapseWhitespace: true,
  removeComments: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  useShortDoctype: true,
});
```

**Preload Critical Resources:**
```html
<head>
  <!-- Preload critical images -->
  <link rel="preload" as="image" href="/images/hero/donkey-hero-800w.webp">
  
  <!-- Preconnect to external domains (if using web fonts) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
</head>
```

**Semantic HTML for Performance:**
- Use appropriate heading hierarchy (h1-h6)
- Avoid excessive div nesting
- Use semantic elements (reduces HTML size)

---

### Network Performance

**HTTP/2 Optimization:**
- Netlify/Vercel serve over HTTP/2 automatically
- Multiplexing eliminates need for sprite sheets
- Server push for critical resources (optional)

**DNS Optimization:**
- Use Cloudflare DNS (fast, global Anycast network)
- Enable DNSSEC for security
- Low TTL for initial launch, higher TTL once stable

**Reduce Request Count:**
- Inline critical CSS (eliminates 1 request)
- Inline SVG icons (eliminates multiple requests)
- Use CSS for simple graphics instead of images
- Concatenate CSS and JS (already in build process)

**Expected Request Count:**
- HTML: 1 request
- CSS: 1 request (deferred)
- JS: 1 request
- Images: 5-10 requests (lazy loaded)
- **Total:** 8-13 requests per page

---

### Core Web Vitals Optimization

**Largest Contentful Paint (LCP) - Target: <2.5s**

Optimizations:
- Optimize hero image (WebP, responsive sizes)
- Preload hero image
- Inline critical CSS
- Use eager loading for hero image
- Minimize server response time (Netlify CDN)

**First Input Delay (FID) - Target: <100ms**

Optimizations:
- Minimal JavaScript (<5 KB)
- Defer non-critical JS
- Avoid long tasks (break up JS execution)
- No blocking third-party scripts

**Cumulative Layout Shift (CLS) - Target: <0.1**

Optimizations:
- Reserve space for images with width/height attributes
  ```html
  <img src="donkey.jpg" width="800" height="600" alt="Donkey">
  ```
- Avoid injecting content above existing content
- Use CSS aspect-ratio for responsive images
  ```css
  .image-container {
    aspect-ratio: 4 / 3;
  }
  ```
- Load fonts with font-display: swap to minimize layout shift

**First Contentful Paint (FCP) - Target: <1.5s**

Optimizations:
- Inline critical CSS
- Minimize HTML size
- Optimize server response time
- Preload critical resources

---

### Performance Monitoring

**Real User Monitoring (RUM):**
```javascript
// Optional: Collect Core Web Vitals from real users
import { getCLS, getFID, getLCP } from 'web-vitals';

function sendToAnalytics(metric) {
  // Send to analytics service or log
  console.log(metric);
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getLCP(sendToAnalytics);
```

**Performance Budgets:**

Set budgets in Lighthouse CI:
```javascript
// .lighthouserc.js
module.exports = {
  ci: {
    assert: {
      assertions: {
        'first-contentful-paint': ['error', { maxNumericValue: 1500 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 300 }],
        'max-potential-fid': ['error', { maxNumericValue: 100 }],
      },
    },
  },
};
```

**Performance Testing Checklist:**
- [ ] Lighthouse performance score >85
- [ ] LCP <2.5s
- [ ] FID <100ms
- [ ] CLS <0.1
- [ ] FCP <1.5s
- [ ] Total page size <500 KB
- [ ] Total requests <15
- [ ] Time to Interactive <3.5s

---

### Database/Indexing Optimizations

**Not Applicable** - Static site with no database.

**Content Structure Optimization:**
- Organize content files logically for fast builds
- Use simple Markdown parsing (no complex transformations)
- Cache parsed content during development (build performance)

**Build Performance:**
```javascript
// build/build.js - parallel image optimization
import pLimit from 'p-limit';

const limit = pLimit(4); // 4 concurrent image optimizations

const tasks = imageFiles.map(file => 
  limit(() => optimizeImage(file))
);

await Promise.all(tasks);
```

**Expected Build Times:**
- Initial build (50 images): 2-3 minutes
- Incremental rebuild (1 content change): 10-20 seconds
- Image-only rebuild: 1-2 minutes

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
      PRD.md
```
