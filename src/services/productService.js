import productsData from '../data/products.json' with { type: 'json' };
import categoriesData from '../data/categories.json' with { type: 'json' };
import featuredData from '../data/featured.json' with { type: 'json' };

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
 * Get products by category slug, handling both string and array category fields
 * @param {string} categorySlug - Category slug to filter by
 * @returns {Array} Array of products in the specified category, sorted by metadata.order
 */
export function getProductsByCategory(categorySlug) {
  if (!categorySlug) {
    return [];
  }

  const filteredProducts = productsData.filter(product => {
    // Handle both string and array category formats
    if (Array.isArray(product.categories)) {
      return product.categories.includes(categorySlug);
    } else if (typeof product.categories === 'string') {
      return product.categories === categorySlug;
    }
    return false;
  });

  // Sort by metadata.order
  return filteredProducts.sort((a, b) => {
    const orderA = a.metadata?.order || 0;
    const orderB = b.metadata?.order || 0;
    return orderA - orderB;
  });
}

/**
 * Get all categories sorted by order field
 * @returns {Array} Array of all category objects sorted by order
 */
export function getCategories() {
  return categoriesData.sort((a, b) => {
    const orderA = a.order || 0;
    const orderB = b.order || 0;
    return orderA - orderB;
  });
}

/**
 * Get a single category by slug
 * @param {string} slug - Category slug
 * @returns {Object|undefined} Category object or undefined if not found
 */
export function getCategoryBySlug(slug) {
  return categoriesData.find(category => category.slug === slug);
}