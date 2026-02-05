import type { Product, Category } from '../types';
import productsData from '../data/products.json';
import categoriesData from '../data/categories.json';

// Type assertion to ensure the imported data matches our types
const products: Product[] = productsData as Product[];
const categories: Category[] = categoriesData as Category[];

/**
 * Get all products
 */
export const getProducts = (): Product[] => {
  return products;
};

/**
 * Get a single product by ID
 */
export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

/**
 * Get a single product by slug (for routing)
 */
export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(product => product.slug === slug);
};

/**
 * Get products filtered by category
 */
export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter(product => {
    if (Array.isArray(product.category)) {
      return product.category.includes(categoryId);
    }
    return product.category === categoryId;
  });
};

/**
 * Get products marked as featured
 */
export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.metadata.featured);
};

/**
 * Get all categories
 */
export const getCategories = (): Category[] => {
  return categories.sort((a, b) => a.order - b.order);
};

/**
 * Get a single category by ID
 */
export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(category => category.id === id);
};

/**
 * Get a single category by slug
 */
export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find(category => category.slug === slug);
};
