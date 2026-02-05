/**
 * Validation utilities for form inputs and data
 *
 * This module provides validation functions for common data types
 * including emails, phone numbers, URLs, and form data.
 */

/**
 * Validate email address
 * @param {string} email - Email address to validate
 * @returns {boolean} True if valid email
 */
export function isValidEmail(email) {
  if (!email || typeof email !== 'string') {
    return false;
  }

  // Basic email regex pattern
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/**
 * Validate phone number
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid phone number
 */
export function isValidPhoneNumber(phone) {
  // TODO: Implement phone number validation
  if (!phone || typeof phone !== 'string') {
    return false;
  }

  // Placeholder - basic length check
  const cleaned = phone.replace(/[^\d]/g, '');
  return cleaned.length >= 10 && cleaned.length <= 15;
}

/**
 * Validate URL
 * @param {string} url - URL to validate
 * @returns {boolean} True if valid URL
 */
export function isValidUrl(url) {
  if (!url || typeof url !== 'string') {
    return false;
  }

  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate required field
 * @param {any} value - Value to validate
 * @returns {boolean} True if not empty/null/undefined
 */
export function isRequired(value) {
  if (value === null || value === undefined) {
    return false;
  }

  if (typeof value === 'string') {
    return value.trim().length > 0;
  }

  if (Array.isArray(value)) {
    return value.length > 0;
  }

  return true;
}

/**
 * Validate minimum length
 * @param {string} value - Value to validate
 * @param {number} minLength - Minimum required length
 * @returns {boolean} True if meets minimum length
 */
export function isMinLength(value, minLength = 1) {
  if (!value || typeof value !== 'string') {
    return false;
  }

  return value.trim().length >= minLength;
}

/**
 * Validate maximum length
 * @param {string} value - Value to validate
 * @param {number} maxLength - Maximum allowed length
 * @returns {boolean} True if within maximum length
 */
export function isMaxLength(value, maxLength = 255) {
  if (!value || typeof value !== 'string') {
    return true; // Empty values are valid for max length
  }

  return value.trim().length <= maxLength;
}

/**
 * Validate numeric value
 * @param {any} value - Value to validate
 * @returns {boolean} True if valid number
 */
export function isValidNumber(value) {
  return !isNaN(value) && isFinite(value);
}

/**
 * Validate positive number
 * @param {any} value - Value to validate
 * @returns {boolean} True if positive number
 */
export function isPositiveNumber(value) {
  return isValidNumber(value) && Number(value) > 0;
}

/**
 * Validate integer
 * @param {any} value - Value to validate
 * @returns {boolean} True if valid integer
 */
export function isValidInteger(value) {
  return Number.isInteger(Number(value));
}

/**
 * Validate date
 * @param {any} value - Value to validate
 * @returns {boolean} True if valid date
 */
export function isValidDate(value) {
  if (!value) return false;

  const date = new Date(value);
  return date instanceof Date && !isNaN(date.getTime());
}

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {Object} Validation result with strength level and requirements
 */
export function validatePasswordStrength(password) {
  // TODO: Implement comprehensive password validation
  const result = {
    isValid: false,
    strength: 'weak',
    requirements: {
      minLength: false,
      hasUppercase: false,
      hasLowercase: false,
      hasNumber: false,
      hasSpecialChar: false
    }
  };

  if (!password || typeof password !== 'string') {
    return result;
  }

  // Check requirements
  result.requirements.minLength = password.length >= 8;
  result.requirements.hasUppercase = /[A-Z]/.test(password);
  result.requirements.hasLowercase = /[a-z]/.test(password);
  result.requirements.hasNumber = /\d/.test(password);
  result.requirements.hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  // Calculate strength
  const metRequirements = Object.values(result.requirements).filter(Boolean).length;

  if (metRequirements < 3) {
    result.strength = 'weak';
  } else if (metRequirements < 5) {
    result.strength = 'medium';
  } else {
    result.strength = 'strong';
  }

  result.isValid = metRequirements >= 4; // Require at least 4 out of 5 criteria

  return result;
}