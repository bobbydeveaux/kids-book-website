/**
 * Storage Service Module
 *
 * Handles local storage operations including user preferences,
 * shopping cart state, and temporary data persistence.
 *
 * @module StorageService
 */

/**
 * Storage keys configuration
 * @type {Object}
 */
const STORAGE_KEYS = {
  USER_PREFERENCES: 'lingerie_user_prefs',
  SHOPPING_CART: 'lingerie_cart',
  RECENT_PRODUCTS: 'lingerie_recent',
  FILTERS: 'lingerie_filters',
  THEME: 'lingerie_theme'
};

/**
 * Check if localStorage is available
 * @returns {boolean} True if localStorage is supported
 */
function isStorageAvailable() {
  try {
    const test = 'test';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Get item from localStorage with error handling
 * @param {string} key - Storage key
 * @param {any} defaultValue - Default value if key doesn't exist
 * @returns {any} Stored value or default value
 */
export function getStorageItem(key, defaultValue = null) {
  if (!isStorageAvailable()) {
    console.warn('localStorage not available');
    return defaultValue;
  }

  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultValue;
  }
}

/**
 * Set item in localStorage with error handling
 * @param {string} key - Storage key
 * @param {any} value - Value to store
 * @returns {boolean} True if successful
 */
export function setStorageItem(key, value) {
  if (!isStorageAvailable()) {
    console.warn('localStorage not available');
    return false;
  }

  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error('Error writing to localStorage:', error);
    return false;
  }
}

/**
 * Remove item from localStorage
 * @param {string} key - Storage key
 * @returns {boolean} True if successful
 */
export function removeStorageItem(key) {
  if (!isStorageAvailable()) {
    return false;
  }

  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error removing from localStorage:', error);
    return false;
  }
}

/**
 * Clear all application data from localStorage
 * @returns {boolean} True if successful
 */
export function clearAppStorage() {
  if (!isStorageAvailable()) {
    return false;
  }

  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
}

/**
 * Get user preferences from storage
 * @returns {Object} User preferences object
 */
export function getUserPreferences() {
  return getStorageItem(STORAGE_KEYS.USER_PREFERENCES, {
    theme: 'light',
    currency: 'USD',
    language: 'en'
  });
}

/**
 * Save user preferences to storage
 * @param {Object} preferences - User preferences object
 * @returns {boolean} True if successful
 */
export function saveUserPreferences(preferences) {
  return setStorageItem(STORAGE_KEYS.USER_PREFERENCES, preferences);
}

export default {
  getStorageItem,
  setStorageItem,
  removeStorageItem,
  clearAppStorage,
  getUserPreferences,
  saveUserPreferences,
  keys: STORAGE_KEYS
};