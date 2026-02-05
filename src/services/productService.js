// Product Service - Data access layer for lingerie website
import productsData from '../data/products.json';
import featuredData from '../data/featured.json';

/**
 * Get all products
 * @returns {Array} Array of all products
 */
export function getProducts() {
  return productsData;
}

/**
 * Get product by ID
 * @param {string} id - Product ID
 * @returns {Object|null} Product object or null if not found
 */
export function getProductById(id) {
  return productsData.find(product => product.id === id) || null;
}

/**
 * Get product by slug
 * @param {string} slug - Product slug
 * @returns {Object|null} Product object or null if not found
 */
export function getProductBySlug(slug) {
  return productsData.find(product => product.slug === slug) || null;
}

/**
 * Get featured products
 * Primary source: featuredProductIds array from featured.json
 * Fallback: products with metadata.featured === true, sorted by order
 * @returns {Array} Array of featured products
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
 * Search products by name, description, or short description
 * @param {string} query - Search query string
 * @returns {Array} Array of matching products
 */
export function searchProducts(query) {
  // Handle empty or whitespace-only queries
  const trimmedQuery = query?.trim();
  if (!trimmedQuery) {
    return [];
  }

  const lowerQuery = trimmedQuery.toLowerCase();

  return productsData.filter(product => {
    const nameMatch = product.name.toLowerCase().includes(lowerQuery);
    const descMatch = product.description.toLowerCase().includes(lowerQuery);
    const shortDescMatch = product.shortDescription.toLowerCase().includes(lowerQuery);

    return nameMatch || descMatch || shortDescMatch;
  });
}