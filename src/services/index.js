/**
 * Services Module Exports
 *
 * Centralized exports for all service modules including
 * API services, storage services, and other business logic.
 *
 * @example
 * import { apiService, storageService } from '@/services';
 * import { fetchProducts } from '@/services';
 */

// Export API service functions
export {
  fetchProducts,
  fetchCategories,
  fetchFeatured,
  handleAPIError,
  default as apiService
} from './api.js';

// Export storage service functions
export {
  getStorageItem,
  setStorageItem,
  removeStorageItem,
  clearAppStorage,
  getUserPreferences,
  saveUserPreferences,
  default as storageService
} from './storage.js';

/**
 * Combined service interface for convenience
 */
export default {
  api: require('./api.js').default,
  storage: require('./storage.js').default
};