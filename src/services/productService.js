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

// TODO: The following functions need to be implemented for task-lingerie-website-feat-data-layer-4
// - getProductsByCategory
// - getCategories
// - getCategoryBySlug