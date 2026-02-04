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
 * Get products by category slug
 * @param {string} categorySlug - Category slug to filter by
 * @returns {Array} Array of products in the specified category, sorted by order
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