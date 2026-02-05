/**
 * Validator Utilities Module
 *
 * Collection of utility functions for validating user input,
 * form data, and other validation needs throughout the application.
 *
 * @module Validators
 */

/**
 * Email validation regex pattern
 * @type {RegExp}
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Phone number validation regex pattern (US format)
 * @type {RegExp}
 */
const PHONE_REGEX = /^\+?1?[-.\s]?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$/

/**
 * Strong password regex pattern
 * At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
 * @type {RegExp}
 */
// eslint-disable-next-line no-unused-vars
const STRONG_PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email
 * @example
 * isValidEmail('test@example.com') // Returns true
 * isValidEmail('invalid-email') // Returns false
 */
export function isValidEmail(email) {
  if (typeof email !== 'string') {
    return false
  }
  return EMAIL_REGEX.test(email.trim())
}

/**
 * Validate phone number
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid phone number
 * @example
 * isValidPhone('(555) 123-4567') // Returns true
 * isValidPhone('555-123-4567') // Returns true
 * isValidPhone('123') // Returns false
 */
export function isValidPhone(phone) {
  if (typeof phone !== 'string') {
    return false
  }
  return PHONE_REGEX.test(phone.trim())
}

/**
 * Validate strong password
 * @param {string} password - Password to validate
 * @returns {Object} Validation result with detailed feedback
 * @example
 * validatePassword('Abc123!@') // Returns { isValid: true, feedback: [] }
 * validatePassword('weak') // Returns { isValid: false, feedback: ['Too short', ...] }
 */
export function validatePassword(password) {
  if (typeof password !== 'string') {
    return { isValid: false, feedback: ['Password must be a string'] }
  }

  const feedback = []

  if (password.length < 8) {
    feedback.push('Password must be at least 8 characters long')
  }

  if (!/[a-z]/.test(password)) {
    feedback.push('Password must contain at least one lowercase letter')
  }

  if (!/[A-Z]/.test(password)) {
    feedback.push('Password must contain at least one uppercase letter')
  }

  if (!/\d/.test(password)) {
    feedback.push('Password must contain at least one number')
  }

  if (!/[@$!%*?&]/.test(password)) {
    feedback.push('Password must contain at least one special character (@$!%*?&)')
  }

  return {
    isValid: feedback.length === 0,
    feedback: feedback,
  }
}

/**
 * Validate required field
 * @param {any} value - Value to validate
 * @returns {boolean} True if value is not empty
 * @example
 * isRequired('Hello') // Returns true
 * isRequired('') // Returns false
 * isRequired(null) // Returns false
 */
export function isRequired(value) {
  if (value === null || value === undefined) {
    return false
  }

  if (typeof value === 'string') {
    return value.trim().length > 0
  }

  return true
}

/**
 * Validate minimum length
 * @param {string} value - String to validate
 * @param {number} minLength - Minimum required length
 * @returns {boolean} True if meets minimum length
 * @example
 * hasMinLength('Hello', 3) // Returns true
 * hasMinLength('Hi', 3) // Returns false
 */
export function hasMinLength(value, minLength) {
  if (typeof value !== 'string' || typeof minLength !== 'number') {
    return false
  }
  return value.length >= minLength
}

/**
 * Validate maximum length
 * @param {string} value - String to validate
 * @param {number} maxLength - Maximum allowed length
 * @returns {boolean} True if within maximum length
 * @example
 * hasMaxLength('Hello', 10) // Returns true
 * hasMaxLength('Very long text here', 10) // Returns false
 */
export function hasMaxLength(value, maxLength) {
  if (typeof value !== 'string' || typeof maxLength !== 'number') {
    return false
  }
  return value.length <= maxLength
}

/**
 * Validate numeric value
 * @param {any} value - Value to validate
 * @returns {boolean} True if valid number
 * @example
 * isNumeric('123') // Returns true
 * isNumeric('123.45') // Returns true
 * isNumeric('abc') // Returns false
 */
export function isNumeric(value) {
  if (typeof value === 'number') {
    return !isNaN(value) && isFinite(value)
  }

  if (typeof value === 'string') {
    return !isNaN(parseFloat(value)) && isFinite(parseFloat(value))
  }

  return false
}

/**
 * Validate URL
 * @param {string} url - URL to validate
 * @returns {boolean} True if valid URL
 * @example
 * isValidURL('https://example.com') // Returns true
 * isValidURL('not-a-url') // Returns false
 */
export function isValidURL(url) {
  if (typeof url !== 'string') {
    return false
  }

  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Sanitize HTML string by removing potentially dangerous content
 * @param {string} html - HTML string to sanitize
 * @returns {string} Sanitized HTML string
 * @example
 * sanitizeHTML('<script>alert("xss")</script>Hello') // Returns 'Hello'
 */
export function sanitizeHTML(html) {
  if (typeof html !== 'string') {
    return ''
  }

  // Basic sanitization - remove script tags and on* attributes
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/\son\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/javascript:/gi, '')
}

export default {
  isValidEmail,
  isValidPhone,
  validatePassword,
  isRequired,
  hasMinLength,
  hasMaxLength,
  isNumeric,
  isValidURL,
  sanitizeHTML,
}
