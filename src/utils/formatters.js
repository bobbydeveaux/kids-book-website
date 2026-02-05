/**
 * Formatter Utilities Module
 *
 * Collection of utility functions for formatting data display
 * including prices, dates, text, and other UI elements.
 *
 * @module Formatters
 */

/**
 * Format price for display with currency symbol
 * @param {number} price - Price value
 * @param {string} currency - Currency code (default: 'USD')
 * @param {string} locale - Locale for formatting (default: 'en-US')
 * @returns {string} Formatted price string
 * @example
 * formatPrice(29.99) // Returns "$29.99"
 * formatPrice(29.99, 'EUR', 'de-DE') // Returns "29,99 €"
 */
export function formatPrice(price, currency = 'USD', locale = 'en-US') {
  if (typeof price !== 'number' || isNaN(price)) {
    return 'Price not available';
  }

  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  } catch (error) {
    console.error('Error formatting price:', error);
    return `${currency} ${price.toFixed(2)}`;
  }
}

/**
 * Format date for display
 * @param {Date|string} date - Date to format
 * @param {string} locale - Locale for formatting (default: 'en-US')
 * @param {Object} options - Intl.DateTimeFormat options
 * @returns {string} Formatted date string
 * @example
 * formatDate(new Date()) // Returns "January 5, 2026"
 */
export function formatDate(date, locale = 'en-US', options = {}) {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (!dateObj || isNaN(dateObj.getTime())) {
    return 'Invalid date';
  }

  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options
  };

  try {
    return new Intl.DateTimeFormat(locale, defaultOptions).format(dateObj);
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateObj.toLocaleDateString();
  }
}

/**
 * Truncate text with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length (default: 100)
 * @param {string} suffix - Suffix to append (default: '...')
 * @returns {string} Truncated text
 * @example
 * truncateText('Very long text here', 10) // Returns "Very long..."
 */
export function truncateText(text, maxLength = 100, suffix = '...') {
  if (typeof text !== 'string') {
    return '';
  }

  if (text.length <= maxLength) {
    return text;
  }

  return text.slice(0, maxLength - suffix.length) + suffix;
}

/**
 * Capitalize first letter of each word
 * @param {string} text - Text to capitalize
 * @returns {string} Capitalized text
 * @example
 * capitalizeWords('hello world') // Returns "Hello World"
 */
export function capitalizeWords(text) {
  if (typeof text !== 'string') {
    return '';
  }

  return text
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Format file size for display
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted size string
 * @example
 * formatFileSize(1024) // Returns "1.0 KB"
 * formatFileSize(1048576) // Returns "1.0 MB"
 */
export function formatFileSize(bytes) {
  if (typeof bytes !== 'number' || bytes < 0) {
    return '0 B';
  }

  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(1)} ${units[unitIndex]}`;
}

/**
 * Format product SKU for display
 * @param {string} sku - Product SKU
 * @returns {string} Formatted SKU
 * @example
 * formatSKU('PROD001') // Returns "PROD-001"
 */
export function formatSKU(sku) {
  if (typeof sku !== 'string') {
    return '';
  }

  // Add hyphens every 3-4 characters for readability
  return sku.replace(/(.{3,4})/g, '$1-').replace(/-$/, '');
}

export default {
  formatPrice,
  formatDate,
  truncateText,
  capitalizeWords,
  formatFileSize,
  formatSKU
};