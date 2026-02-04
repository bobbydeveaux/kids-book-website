# High-Level Design: kids-book-website

**Created:** 2026-02-04T22:07:26Z
**Status:** Draft

## 1. Architecture Overview

<!-- AI: Describe the overall system architecture (microservices, monolith, serverless, etc.) -->

The lingerie website follows a **Single Page Application (SPA)** architecture with a client-side only implementation. This is a static site architecture with no backend services, databases, or server-side rendering.

**Architecture Pattern:** Client-Side Static SPA

**Key Characteristics:**
- All application logic runs in the browser
- Product data stored in static JSON/JavaScript files bundled with the application
- Client-side routing handled by React Router
- Static assets (HTML, CSS, JS, images) served directly from CDN or web server
- No server-side API calls or backend processing
- Build-time optimization through Vite's bundling and code splitting

**Deployment Model:**
- Static files generated at build time (`npm run build`)
- Deployable to any static hosting service (Netlify, Vercel, GitHub Pages, S3 + CloudFront, etc.)
- Single HTML entry point with JavaScript bundles loaded dynamically
- All routing handled client-side with fallback to index.html

This architecture is ideal for the requirements: simple, maintainable, no backend complexity, fast loading, and easy to deploy.

---

## 2. System Components

<!-- AI: List major components/services with brief descriptions -->

### Core Application Components

**1. App Shell (App.jsx)**
- Root component that initializes React Router
- Provides global error boundaries
- Manages application-wide layout structure
- Implements routing configuration

**2. Layout Components**
- **Header Component**: Site branding, logo, primary navigation menu
- **Footer Component**: Site information, links, copyright
- **Navigation Component**: Menu system for category browsing
- **Layout Wrapper**: Consistent page structure and spacing

**3. Page Components**
- **Home Page**: Landing page with featured products grid/list
- **Product Detail Page**: Individual product information display
- **Category Pages**: Filtered product views by category (optional)
- **404/Not Found Page**: Error handling for invalid routes

**4. Product Components**
- **ProductGrid**: Displays products in responsive grid layout
- **ProductCard**: Individual product preview with image, name, brief description
- **ProductDetail**: Full product information including images, description, features, specs
- **ProductImage**: Image display with optimization and fallback handling
- **ProductFeatures**: Feature list display component
- **ProductSpecifications**: Technical specifications display

**5. UI Components (Reusable)**
- **Button**: Styled button component
- **Card**: Generic card container
- **Image**: Optimized image component with lazy loading
- **Link**: Styled navigation link component
- **Grid**: Responsive grid layout component
- **Container**: Content width container

**6. Data Layer**
- **Product Data Service**: Module to load and provide product data from static JSON
- **Products JSON**: Static product data file(s) with structured product information
- **Category Data**: Static category/taxonomy definitions

**7. Utility Modules**
- **Constants**: Application constants (routes, categories, etc.)
- **Helpers**: Utility functions (formatting, validation, etc.)
- **Hooks**: Custom React hooks for common functionality

---

## 3. Data Model

<!-- AI: High-level data entities and relationships -->

### Product Entity

```typescript
Product {
  id: string (unique identifier, e.g., "prod-001")
  name: string (product name)
  slug: string (URL-friendly identifier)
  description: string (detailed product description)
  shortDescription: string (brief summary for cards/lists)
  category: string | string[] (product category/categories)
  images: {
    thumbnail: string (small preview image URL)
    main: string (primary product image URL)
    gallery: string[] (additional product images)
  }
  features: string[] (list of key features)
  specifications: {
    key: string
    value: string
  }[] (technical specifications)
  price?: {
    display: string (display-only price info, not for transactions)
  }
  metadata: {
    createdAt: string (ISO date)
    featured: boolean (show on homepage)
    order: number (display order)
  }
}
```

### Category Entity

```typescript
Category {
  id: string (unique identifier)
  name: string (display name)
  slug: string (URL-friendly identifier)
  description: string (category description)
  order: number (display order)
}
```

### Data Relationships

- Products → Categories: Many-to-Many (product can belong to multiple categories)
- No foreign key constraints (static data structure)
- Relationships resolved at runtime through matching IDs/slugs

### Data Storage Structure

```
/src/data/
  products.json         // Array of all product objects
  categories.json       // Array of all category objects
  featured.json         // Array of featured product IDs (optional)
```

### Sample Product Data

```json
{
  "id": "prod-001",
  "name": "Classic Lace Bralette",
  "slug": "classic-lace-bralette",
  "description": "Elegant and comfortable lace bralette...",
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
    {"key": "Care", "value": "Hand wash cold"}
  ],
  "metadata": {
    "createdAt": "2026-01-15",
    "featured": true,
    "order": 1
  }
}
```

---

## 4. API Contracts

<!-- AI: Define key API endpoints, request/response formats -->

**Note:** This is a static site with no backend API. All "API" contracts are internal module interfaces for data access within the application.

### Internal Data Service Interface

**getProducts()**
```typescript
// Returns all products
function getProducts(): Product[]

// Usage
const products = getProducts();
```

**getProductById(id: string)**
```typescript
// Returns a single product by ID
function getProductById(id: string): Product | undefined

// Usage
const product = getProductById('prod-001');
```

**getProductBySlug(slug: string)**
```typescript
// Returns a single product by slug (for routing)
function getProductBySlug(slug: string): Product | undefined

// Usage
const product = getProductBySlug('classic-lace-bralette');
```

**getProductsByCategory(categoryId: string)**
```typescript
// Returns products filtered by category
function getProductsByCategory(categoryId: string): Product[]

// Usage
const bralettes = getProductsByCategory('bralettes');
```

**getFeaturedProducts()**
```typescript
// Returns products marked as featured
function getFeaturedProducts(): Product[]

// Usage
const featured = getFeaturedProducts();
```

**getCategories()**
```typescript
// Returns all categories
function getCategories(): Category[]

// Usage
const categories = getCategories();
```

### React Router Routes

**Route Definitions**
```typescript
Routes:
  / (Home)
  /products/:slug (Product Detail)
  /category/:categorySlug (Category Listing - optional)
  * (404 Not Found)
```

**Route Parameters**
```typescript
// Product Detail Route
Params: { slug: string }
Example: /products/classic-lace-bralette

// Category Route
Params: { categorySlug: string }
Example: /category/bralettes
```

### Component Props Interfaces

**ProductCard Props**
```typescript
interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}
```

**ProductDetail Props**
```typescript
interface ProductDetailProps {
  product: Product;
}
```

**ProductGrid Props**
```typescript
interface ProductGridProps {
  products: Product[];
  columns?: number; // responsive column count
}
```

---

## 5. Technology Stack

### Backend
**N/A** - No backend required. This is a fully client-side static site.

### Frontend
- **React 18.3+**: Core UI framework with hooks and functional components
- **React Router 6+**: Client-side routing and navigation
- **Vite 5+**: Build tool, dev server, and bundler
- **CSS Modules**: Component-scoped styling (alternative: Styled Components)
- **JavaScript (ES2022+)**: Core language (TypeScript optional)
- **ESLint**: Code linting with React and accessibility plugins
- **Prettier**: Code formatting
- **React Icons** (optional): Icon library for UI elements

### Infrastructure
- **Node.js 18+ LTS**: Development environment
- **npm/yarn**: Package management
- **Static File Server**: Any CDN or static hosting (deployment handled separately)
- **Git**: Version control

### Data Storage
- **Static JSON Files**: Product and category data stored in `src/data/` directory
- **Browser Local Storage** (optional): Could cache preferences, recently viewed items
- **No Database**: All data bundled with application at build time
- **File System (Build-time)**: Images stored in `public/images/` or `src/assets/`

---

## 6. Integration Points

<!-- AI: External systems, APIs, webhooks -->

### External Integrations

**Image Hosting (Optional)**
- **CDN Service**: External CDN for optimized image delivery (optional)
- **Image Optimization Service**: Services like Cloudinary or ImageKit (optional)
- No required integration - images can be bundled or served from public directory

### Browser APIs

**Required:**
- **History API**: Used by React Router for navigation
- **Fetch API**: For loading static JSON data if code-split
- **Intersection Observer API**: For lazy loading images

**Optional:**
- **Service Worker API**: For PWA offline functionality (if implemented)
- **Local Storage API**: For user preferences or recently viewed items

### Third-Party Scripts (Optional)

**Analytics** (if added later):
- Google Analytics
- Plausible Analytics
- No implementation required in initial version

**Performance Monitoring** (if added later):
- Web Vitals library
- No implementation required in initial version

### Content Sources

**Static Assets:**
- Product images stored in `/public/images/products/`
- Product data stored in `/src/data/products.json`
- Category data stored in `/src/data/categories.json`
- All assets bundled at build time

**No External APIs Required:**
- No REST API calls
- No GraphQL queries
- No WebSocket connections
- No third-party authentication services

### Build-Time Integrations

- **Vite Build Process**: Bundles all assets and optimizes for production
- **Asset Pipeline**: Image optimization during build (via Vite plugins)
- **Code Splitting**: Automatic chunk generation for lazy-loaded routes

---

## 7. Security Architecture

<!-- AI: Authentication, authorization, encryption, secrets management -->

### Authentication & Authorization
**N/A** - No user authentication or authorization required. The site is fully public with no protected resources or user accounts.

### Client-Side Security

**Content Security Policy (CSP):**
- Define CSP headers in deployment configuration
- Restrict script sources to 'self' and approved CDNs
- Disable unsafe-inline and unsafe-eval
- Example policy:
  ```
  Content-Security-Policy: default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'
  ```

**Cross-Site Scripting (XSS) Prevention:**
- React's built-in XSS protection through automatic escaping
- Never use `dangerouslySetInnerHTML` unless absolutely necessary and sanitized
- Validate and sanitize any user input (if added in future)
- Use `rel="noopener noreferrer"` on all external links

**Dependencies Security:**
- Regular `npm audit` checks for vulnerable dependencies
- Automated dependency updates via Dependabot or Renovate
- Review and vet all third-party packages before adding
- Minimize dependency footprint

**Secrets Management:**
- **No secrets required** - no API keys, tokens, or credentials
- If analytics added later, use environment variables at build time
- Never commit sensitive data to version control
- Use `.env` files with `.gitignore` for any build-time configuration

### Data Security

**Data Integrity:**
- Product data is static and version-controlled
- No user-generated content or data persistence
- All data modifications happen through code review process

**Privacy:**
- No collection of personal information
- No cookies or tracking (unless analytics added later)
- No form submissions or data transmission
- GDPR compliant by default (no data collection)

### Transport Security

**HTTPS:**
- Enforce HTTPS at deployment/CDN level (handled separately)
- HTTP Strict Transport Security (HSTS) headers recommended
- Automatic HTTP to HTTPS redirect at server/CDN level

### Build & Supply Chain Security

**Build Process:**
- Lock file (`package-lock.json`) committed for reproducible builds
- Verify package integrity with checksums
- Use official npm registry only
- Review all dependencies before installation

**Source Code Security:**
- No hardcoded credentials or API keys
- Code review process for all changes
- Protected main branch in version control
- No sensitive data in version control history

### Browser Security Headers

**Recommended Headers (configured at deployment):**
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

---

## 8. Deployment Architecture

<!-- AI: How components are deployed (K8s, containers, serverless) -->

### Deployment Model

**Static File Hosting** - The application is deployed as pre-built static assets (HTML, CSS, JS, images) to a static file hosting service.

### Build Process

**Local Build:**
```bash
npm install           # Install dependencies
npm run build         # Create production build
# Output: /dist directory with optimized static files
```

**Build Output Structure:**
```
/dist/
  index.html          # Single HTML entry point
  /assets/
    main.[hash].js    # Bundled JavaScript
    main.[hash].css   # Bundled CSS
    chunk.[hash].js   # Code-split chunks
  /images/            # Optimized images
  favicon.ico
  robots.txt
```

### Deployment Options

**Recommended Static Hosts (user will configure CI/CD separately):**

1. **Netlify**
   - Automatic deployments from Git
   - Built-in CDN and HTTPS
   - Automatic routing for SPA (redirects to index.html)
   - Configuration: `netlify.toml` or UI settings

2. **Vercel**
   - Similar to Netlify
   - Excellent performance and DX
   - Automatic preview deployments
   - Configuration: `vercel.json`

3. **GitHub Pages**
   - Free hosting for public repos
   - Custom domain support
   - Configuration: GitHub Actions workflow

4. **AWS S3 + CloudFront**
   - Highly scalable and reliable
   - Full control over configuration
   - Requires more setup
   - Configuration: S3 bucket + CloudFront distribution

5. **Azure Static Web Apps / Google Cloud Storage**
   - Cloud provider options
   - Similar capabilities to AWS

### Deployment Configuration

**SPA Routing Configuration:**
All hosting platforms must redirect 404s to `index.html` for client-side routing to work.

**Netlify (_redirects file):**
```
/*    /index.html   200
```

**Vercel (vercel.json):**
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

**GitHub Pages:**
- Include `404.html` as copy of `index.html`
- Or use hash routing (#/ routes)

### CDN & Caching Strategy

**Asset Caching:**
- JavaScript/CSS bundles: Long-term caching (1 year) via content hashes
- `index.html`: No caching or short TTL (5 minutes)
- Images: Long-term caching (1 year)
- Cache-Control headers configured at CDN/hosting level

**Content Delivery:**
- All static hosts provide global CDN by default
- Assets served from edge locations closest to users
- Automatic HTTP/2 or HTTP/3 support

### Environment Handling

**Single Environment:**
- No environment-specific configuration required
- All product data bundled with application
- No runtime configuration needed

**Build-Time Variables (optional):**
- Can use `.env` files for build-time constants
- Example: `VITE_SITE_NAME=Lingerie Website`
- Injected during build process

### Zero-Downtime Deployments

**Atomic Deployments:**
- Most static hosts support atomic deployments
- New version uploaded completely before switching
- Instant rollback capability
- No deployment windows or downtime

### Scaling & Performance

**Automatic Scaling:**
- Static hosts handle scaling automatically
- No manual scaling configuration needed
- Handles traffic spikes seamlessly
- Global distribution via CDN

**Performance Optimizations:**
- Brotli/Gzip compression enabled
- HTTP/2 server push (platform-dependent)
- Prefetch/preload hints in HTML
- Lazy loading for routes and images

---

## 9. Scalability Strategy

<!-- AI: How the system scales (horizontal, vertical, auto-scaling) -->

### Scalability Characteristics

**Static Site Advantages:**
The static architecture provides inherent scalability advantages:
- No database queries or server processing
- All content pre-rendered at build time
- Served directly from CDN edge nodes
- No backend bottlenecks or single points of failure

### Traffic Scaling

**Horizontal Scaling (Automatic):**
- **CDN Distribution**: Content automatically distributed across global edge network
- **No Server Capacity Planning**: Static hosts scale automatically
- **Infinite Read Scalability**: Can handle millions of concurrent users
- **No Load Balancers Needed**: Handled by hosting platform/CDN

**Traffic Patterns:**
- Handles sudden traffic spikes without configuration changes
- No warm-up period required
- Consistent performance regardless of load
- No rate limiting concerns for legitimate traffic

### Content Scaling

**Product Catalog Growth:**

**Current Target**: 10-50 products (initial launch)

**Scaling to 100-500 products:**
- No architectural changes required
- Same static file approach works well
- Potential optimizations:
  - Implement pagination on product listings
  - Add category filtering to reduce initial render load
  - Use React.lazy() for code splitting of product detail pages

**Scaling to 500-1000+ products:**
- Consider data structure optimizations:
  - Split products.json into multiple category-based files
  - Implement dynamic imports for product data by category
  - Add search/filter capabilities (client-side or future API)
- Image optimization becomes more critical:
  - Use image CDN with on-demand resizing
  - Implement progressive loading strategies
  - Consider WebP/AVIF formats with fallbacks

### Asset Scaling

**Image Optimization:**
- **Current**: Images in `/public/images/` bundled or served from hosting
- **Future**: Migrate to image CDN (Cloudinary, ImageKit) for automatic optimization
- **Lazy Loading**: Intersection Observer for below-fold images
- **Responsive Images**: `srcset` attributes for different viewport sizes

**Bundle Size Management:**
- **Code Splitting**: Route-based splitting via React.lazy()
- **Tree Shaking**: Vite automatically removes unused code
- **Dynamic Imports**: Load components/data on demand
- **Chunk Optimization**: Configure Vite chunk strategy for optimal caching

### Performance Scaling

**Bundle Optimization:**
```javascript
// Vite config for optimal chunking
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        'ui-components': ['./src/components/ui']
      }
    }
  }
}
```

**Data Loading Strategy:**
- **Current**: All products loaded on app initialization
- **Optimization 1**: Load featured products first, lazy load rest
- **Optimization 2**: Category-based code splitting for product data
- **Optimization 3**: Virtual scrolling for large product lists

### Geographic Scaling

**Global Distribution:**
- Static hosting platforms provide automatic global CDN
- Content served from edge locations closest to users
- Sub-100ms latency for static assets worldwide
- No geographic configuration required

### Development Scalability

**Team Scaling:**
- Component-based architecture supports parallel development
- Clear separation of concerns (data, UI, routing)
- Modular structure easy to understand and extend
- Low barrier to entry for new developers

**Feature Scaling:**
- Add new categories without architectural changes
- New page types follow same routing patterns
- Reusable component library grows with needs
- Static data model easily extended

### Cost Scaling

**Infrastructure Costs:**
- Static hosting: Free to very low cost (Netlify/Vercel free tiers support high traffic)
- No database costs
- No server maintenance costs
- Costs scale linearly with traffic (if any), not exponentially
- CDN bandwidth: Typically generous free tiers

**Future Considerations:**
- If catalog grows very large (5000+ products), may need:
  - Backend API for search/filtering
  - Database for product management
  - CMS for content updates
- Current architecture supports 500-1000 products easily

### Limitations & Thresholds

**When to Consider Backend:**
- Product catalog exceeds 1000 items
- Need for dynamic content updates without redeployment
- User-generated content (reviews, ratings)
- Personalization requirements
- E-commerce functionality (cart, checkout)
- Real-time inventory management

**Current Architecture Limits:**
- Practical limit: ~1000 products before UX degradation
- Build time increases linearly with assets
- Client-side filtering practical up to ~500 items
- Beyond these limits, consider hybrid approach (static + API)

---

## 10. Monitoring & Observability

<!-- AI: Logging, metrics, tracing, alerting strategy -->

### Monitoring Strategy

**Lightweight Approach:**
Since this is a static site with no backend, monitoring focuses on client-side performance, availability, and user experience metrics.

### Performance Monitoring

**Core Web Vitals Tracking:**

**Key Metrics:**
- **LCP (Largest Contentful Paint)**: < 2.5s (target)
- **FID (First Input Delay)**: < 100ms (target)
- **CLS (Cumulative Layout Shift)**: < 0.1 (target)
- **TTFB (Time to First Byte)**: < 600ms (target)
- **TTI (Time to Interactive)**: < 3s (target)

**Implementation:**
```javascript
// web-vitals library (optional)
import {getCLS, getFID, getFCP, getLCP, getTTFB} from 'web-vitals';

function sendToAnalytics(metric) {
  // Log to console in development
  console.log(metric);
  // In production: send to analytics service
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getLCP(sendToAnalytics);
```

**Lighthouse CI (Development):**
- Run Lighthouse audits during development
- Set performance budgets in `lighthouserc.json`
- Target scores: Performance > 85, Accessibility > 95

### Availability Monitoring

**Uptime Monitoring:**
- **Service**: UptimeRobot, Pingdom, or StatusCake (user can set up)
- **Check Type**: HTTP/HTTPS endpoint monitoring
- **Frequency**: Every 5 minutes
- **Endpoints**: Homepage (/) and sample product page
- **Alerts**: Email/Slack on downtime

**Hosting Platform Monitoring:**
- Netlify/Vercel provide built-in availability dashboards
- Status pages for platform-wide issues
- Deployment success/failure notifications

### Error Tracking

**Client-Side Error Monitoring:**

**React Error Boundaries:**
```javascript
// Error boundary component catches React rendering errors
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    // Log error
    console.error('Error caught:', error, errorInfo);
    // Optional: Send to error tracking service
  }
}
```

**Global Error Handling:**
```javascript
// Catch unhandled errors
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  // Optional: Send to error tracking service
});

// Catch unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});
```

**Error Tracking Service (Optional):**
- **Sentry**: Comprehensive error tracking and performance monitoring
- **LogRocket**: Session replay with error tracking
- **Rollbar**: Error monitoring and alerting
- **Implementation**: Add SDK and configure DSN

### Logging Strategy

**Development Logging:**
- `console.log()` for debugging during development
- React DevTools for component inspection
- Vite dev server logs for build issues

**Production Logging:**
- Minimal console logging (errors only)
- Remove debug logs in production build
- Use error tracking service for production errors

**Build Logging:**
- Vite build output logs bundle sizes
- Monitor bundle size growth over time
- Alert if bundle exceeds performance budget

### Analytics (Optional)

**User Behavior Tracking:**
Not required initially, but can be added:

**Options:**
- **Google Analytics 4**: Free, comprehensive analytics
- **Plausible Analytics**: Privacy-friendly, simple
- **Fathom Analytics**: Privacy-focused, paid
- **Simple Analytics**: GDPR-compliant, minimal

**Key Metrics to Track:**
- Page views by route
- Product detail page views
- User session duration
- Bounce rate
- Device/browser distribution
- Geographic distribution

**Implementation:**
```javascript
// Example: Track page views with React Router
useEffect(() => {
  // Track page view
  analytics.pageview(location.pathname);
}, [location]);
```

### Resource Monitoring

**Asset Performance:**
- Monitor image load times
- Track JavaScript bundle sizes
- Monitor CSS bundle sizes
- Alert on assets exceeding size thresholds

**CDN Performance:**
- Monitor CDN cache hit rates (via hosting dashboard)
- Track bandwidth usage
- Monitor geographic performance distribution

### User Experience Monitoring

**Navigation Performance:**
- Track route transition times
- Monitor client-side routing performance
- Measure image lazy loading effectiveness

**Browser Compatibility:**
- Monitor error rates by browser/version
- Track feature support issues
- Use error tracking to identify browser-specific bugs

### Alerting Strategy

**Critical Alerts:**
- Site is down (5+ minutes)
- Build/deployment failures
- JavaScript errors affecting > 1% of users

**Warning Alerts:**
- Performance metrics degraded (LCP > 4s)
- Increased error rate
- Bundle size increased > 20%

**Informational:**
- Deployment success notifications
- Weekly performance summary
- Monthly traffic reports

### Debugging Tools

**Browser DevTools:**
- Performance profiling
- Network tab for asset loading
- React DevTools for component inspection
- Lighthouse for audits

**Vite DevTools:**
- Build analysis and bundle visualization
- HMR (Hot Module Replacement) for development
- Source maps for debugging production builds

### Dashboards

**Hosting Platform Dashboard:**
- Netlify/Vercel provides built-in analytics
- Deployment history and status
- Build logs and performance metrics
- Bandwidth and request volume

**Custom Dashboard (Optional):**
- Combine metrics from multiple sources
- Grafana or similar for visualization
- Not required for initial launch

### Performance Budgets

**Bundle Size Budgets:**
- Total JavaScript: < 200KB (gzipped)
- Total CSS: < 50KB (gzipped)
- Initial bundle: < 100KB (gzipped)
- Images per page: < 1MB total

**Performance Budgets:**
- LCP: < 2.5s
- FCP: < 1.8s
- TTI: < 3.5s
- Bundle load time: < 1s

**Enforcement:**
- Configure in `vite.config.js`
- Build fails if budgets exceeded
- CI/CD integration for automated checks

---

## 11. Architectural Decisions (ADRs)

<!-- AI: Key architectural decisions with rationale -->

### ADR-001: Static Site Architecture

**Status:** Accepted

**Context:**
The PRD explicitly states "basic, static site, no database" with React/Vite as the technology stack.

**Decision:**
Implement a fully client-side Single Page Application (SPA) with no backend services or database.

**Rationale:**
- Meets PRD requirements for simplicity
- Minimal operational complexity (no backend to maintain)
- Excellent performance (CDN-served static assets)
- Cost-effective (free to low-cost hosting)
- Easy deployment to any static host
- Scales automatically with hosting platform
- Fast development cycle

**Consequences:**
- All product data must be bundled at build time
- Content updates require rebuild and redeploy
- Limited to read-only functionality
- No user-generated content or personalization
- No real-time updates
- Practical limit of ~1000 products before UX degrades

**Alternatives Considered:**
- SSR/SSG with Next.js: Rejected as over-engineered for requirements
- Backend API + SPA: Rejected due to "no database" constraint

---

### ADR-002: React + Vite Technology Stack

**Status:** Accepted

**Context:**
PRD specifies "usual react/vite" as the desired technology stack.

**Decision:**
Use React 18+ with Vite 5+ as the core framework and build tool.

**Rationale:**
- Explicitly requested in PRD
- React: Industry-standard, mature ecosystem, excellent developer experience
- Vite: Fast dev server, optimized production builds, modern build tool
- Strong community support and documentation
- Easy to find developers familiar with stack
- Excellent performance characteristics
- Rich ecosystem of libraries and tools

**Consequences:**
- Modern browser requirement (ES2015+)
- Development requires Node.js environment
- Bundle size considerations for React runtime
- Learning curve for developers unfamiliar with React

**Alternatives Considered:**
- Vue.js: Not requested, would meet requirements but against stated preference
- Svelte: Smaller bundle size but not requested
- Plain JavaScript: Would work but lose productivity benefits of React

---

### ADR-003: Client-Side Routing with React Router

**Status:** Accepted

**Context:**
SPA requires navigation between home, product detail, and potentially category pages.

**Decision:**
Implement client-side routing using React Router 6+.

**Rationale:**
- Industry standard for React SPAs
- Declarative routing approach fits React patterns
- Supports nested routes and layouts
- Code splitting integration for lazy loading
- Strong TypeScript support
- URL-based navigation preserves bookmarking and back button
- No full page reloads between navigation

**Consequences:**
- Requires server-side configuration for SPA routing (404 → index.html)
- All routes loaded on client (no server routing)
- SEO considerations (though PRD doesn't mention SEO as requirement)

**Alternatives Considered:**
- Hash routing: Works without server config but ugly URLs (#/product/...)
- Custom routing solution: Reinventing the wheel, not justified

---

### ADR-004: Static JSON Data Storage

**Status:** Accepted

**Context:**
Product data needs to be stored and accessed without a database.

**Decision:**
Store product data in static JSON files within the `src/data/` directory, bundled with the application.

**Rationale:**
- Simple and straightforward approach
- No database or API required
- Data version-controlled with code
- Type-safe with TypeScript interfaces
- Easy to edit and maintain
- Fast access (no network requests)
- Supports up to ~1000 products efficiently

**Consequences:**
- Content changes require code deployment
- All data loaded by client (privacy/size considerations)
- No dynamic filtering capabilities from server
- Data size affects bundle size (mitigated with code splitting)

**Alternatives Considered:**
- External JSON files fetched at runtime: Additional network overhead, no benefit
- Hardcoded in JavaScript: Less maintainable than JSON
- External API: Against "no database/backend" requirement

---

### ADR-005: CSS Modules for Styling

**Status:** Accepted

**Context:**
Application needs a styling solution that prevents class name collisions and supports component-based development.

**Decision:**
Use CSS Modules as the primary styling approach.

**Rationale:**
- Built-in Vite support (no additional configuration)
- Scoped styles prevent naming collisions
- Standard CSS syntax (lower learning curve)
- Good performance (optimized in production build)
- Supports responsive design with media queries
- Works with preprocessors if needed (Sass/Less)

**Consequences:**
- Requires importing CSS files in components
- Class names must be accessed via JavaScript object
- Global styles require separate handling

**Alternatives Considered:**
- Styled Components: More React-idiomatic but adds runtime overhead
- Tailwind CSS: Utility-first approach, not mentioned in PRD
- Plain CSS: Risk of naming collisions in larger applications
- Sass/Less: Additional build step, CSS Modules sufficient

---

### ADR-006: Component-Based Architecture

**Status:** Accepted

**Context:**
Need to organize React code in a maintainable, scalable way.

**Decision:**
Implement a component-based architecture with clear separation between pages, features, and reusable UI components.

**Directory Structure:**
```
/src
  /components
    /ui          (reusable UI components)
    /product     (product-specific components)
    /layout      (layout components)
  /pages         (route page components)
  /data          (static JSON data)
  /utils         (utility functions)
  /hooks         (custom React hooks)
```

**Rationale:**
- Aligns with React best practices
- Clear separation of concerns
- Reusable components reduce duplication
- Easy to locate and modify code
- Supports testing strategy
- Scalable as application grows

**Consequences:**
- Initial setup overhead for structure
- Requires discipline to maintain organization
- May need refactoring as patterns emerge

**Alternatives Considered:**
- Flat structure: Doesn't scale beyond small apps
- Feature-based organization: More complex than needed for this scope

---

### ADR-007: Responsive-First Design

**Status:** Accepted

**Context:**
PRD requires mobile, tablet, and desktop support with responsive design.

**Decision:**
Implement mobile-first responsive design using CSS Grid, Flexbox, and media queries.

**Approach:**
- Design for mobile viewport first (375px)
- Progressive enhancement for tablet (768px) and desktop (1920px)
- Flexible layouts using CSS Grid for product grids
- Flexbox for component-level layouts
- Breakpoints: 640px (sm), 768px (md), 1024px (lg), 1280px (xl)

**Rationale:**
- Mobile traffic increasingly dominant
- Easier to scale up than down
- Forces focus on essential content
- Better performance on mobile devices
- PRD explicitly requires mobile support

**Consequences:**
- Must test across all viewport sizes
- Some design complexity for responsive patterns
- Image optimization critical for mobile

**Alternatives Considered:**
- Desktop-first: Outdated approach, doesn't prioritize mobile users
- Separate mobile site: Unnecessary maintenance burden

---

### ADR-008: No Backend API or Database

**Status:** Accepted

**Context:**
PRD explicitly states "no database" and "basic, static site."

**Decision:**
Do not implement any backend API, database, or server-side logic.

**Rationale:**
- Explicit requirement in PRD
- Reduces complexity significantly
- Eliminates server maintenance and costs
- Faster development and deployment
- Sufficient for informational/content website
- Easy to add later if requirements change

**Consequences:**
- No dynamic content updates without redeployment
- No user-generated content
- No personalization or user accounts
- No e-commerce capabilities
- Content management requires developer involvement

**Alternatives Considered:**
- Simple backend: Not requested, adds complexity
- Headless CMS: Over-engineered for initial requirements

---

### ADR-009: Lazy Loading and Code Splitting

**Status:** Accepted

**Context:**
PRD requires performance optimization with Lighthouse score 85+, TTI < 3s.

**Decision:**
Implement route-based code splitting using React.lazy() and lazy loading for images.

**Approach:**
```javascript
// Route-based splitting
const ProductDetail = React.lazy(() => import('./pages/ProductDetail'));

// Image lazy loading
<img loading="lazy" src={product.image} alt={product.name} />
```

**Rationale:**
- Reduces initial bundle size
- Faster Time to Interactive
- Better Lighthouse performance scores
- Built-in browser support for image lazy loading
- React.lazy() well-supported and simple to use

**Consequences:**
- Small delay when navigating to new routes (first time)
- Need loading states for lazy components
- Requires error boundaries for fallback

**Alternatives Considered:**
- Load everything upfront: Poor performance, fails Lighthouse targets
- Manual code splitting: More complex, React.lazy() sufficient

---

### ADR-010: Development-Only Deployment Configuration

**Status:** Accepted

**Context:**
PRD states "Don't worry about deployment either - I'll prob sort out the cicd later."

**Decision:**
Do not implement CI/CD pipelines or automated deployment in initial version. Provide deployment-ready build output and basic documentation.

**Rationale:**
- Explicit non-requirement in PRD
- User will handle deployment separately
- Reduces initial scope and complexity
- Build output is standard and compatible with any static host
- Easy for user to integrate with their chosen CI/CD solution

**Consequences:**
- Manual deployment process initially
- User responsible for deployment configuration
- No automated testing in pipeline (initially)

**Alternatives Considered:**
- Implement basic GitHub Actions: Not requested, would add scope
- Provide multiple deployment configs: Over-engineering

---

## Appendix: PRD Reference

[PRD content included as provided in template]
