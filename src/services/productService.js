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
 * Handles both single category (string) and multiple categories (array) in product data
 * @param {string} categorySlug - Category slug
 * @returns {Array} Array of products in the category, sorted by metadata order
 */
export function getProductsByCategory(categorySlug) {
  return productsData.filter(product => {
    // Handle both string and array category formats
    if (Array.isArray(product.category)) {
      return product.category.includes(categorySlug);
    }
    return product.category === categorySlug;
  }).sort((a, b) => (a.metadata?.order || 0) - (b.metadata?.order || 0));
}

/**
 * Get all categories
 * @returns {Array} Array of category objects sorted by order field
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
 * Get featured products
 * Uses featured.json data as primary source with fallback to metadata.featured flag
 * @returns {Array} Array of featured products sorted by order
 */
export function getFeaturedProducts() {
  const featuredIds = featuredData.featuredProductIds || [];

  if (featuredIds.length > 0) {
    // Primary method: use featured.json with featured product IDs
    return featuredIds
      .map(id => getProductById(id))
      .filter(Boolean); // Remove any undefined results
  }

  // Fallback method: get products marked as featured in metadata
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
  const lowerQuery = query.toLowerCase().trim();

  if (!lowerQuery) return [];

  return productsData.filter(product => {
    const nameMatch = product.name.toLowerCase().includes(lowerQuery);
    const descMatch = product.description.toLowerCase().includes(lowerQuery);
    const shortDescMatch = product.shortDescription.toLowerCase().includes(lowerQuery);

    return nameMatch || descMatch || shortDescMatch;
  });
}