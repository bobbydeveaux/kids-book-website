/**
 * Utils Module Exports
 *
 * Centralized exports for all utility functions including
 * formatters, validators, and other helper utilities.
 *
 * @example
 * import { formatPrice, isValidEmail } from '@/utils';
 * import { formatters, validators } from '@/utils';
 */

// Export formatter functions
export {
  formatPrice,
  formatDate,
  truncateText,
  capitalizeWords,
  formatFileSize,
  formatSKU,
  default as formatters,
} from './formatters.js'

// Export validator functions
export {
  isValidEmail,
  isValidPhone,
  validatePassword,
  isRequired,
  hasMinLength,
  hasMaxLength,
  isNumeric,
  isValidURL,
  sanitizeHTML,
  default as validators,
} from './validators.js'

/**
 * Common constants used throughout the application
 */
export const CONSTANTS = {
  // Currency settings
  DEFAULT_CURRENCY: 'USD',
  DEFAULT_LOCALE: 'en-US',

  // Validation limits
  MIN_PASSWORD_LENGTH: 8,
  MAX_TEXT_LENGTH: 1000,
  MAX_DESCRIPTION_LENGTH: 5000,

  // File size limits
  MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB

  // UI constants
  DEBOUNCE_DELAY: 300,
  ANIMATION_DURATION: 200,
  TOAST_DURATION: 3000,

  // Pagination
  DEFAULT_PAGE_SIZE: 12,
  MAX_PAGE_SIZE: 100,

  // Product categories (will be moved to data when available)
  PRODUCT_CATEGORIES: [],

  // Breakpoints (will match CSS)
  BREAKPOINTS: {
    mobile: 375,
    tablet: 768,
    desktop: 1024,
    wide: 1440,
  },
}

/**
 * Combined utilities interface
 */
export default {
  formatters: require('./formatters.js').default,
  validators: require('./validators.js').default,
  constants: CONSTANTS,
}
