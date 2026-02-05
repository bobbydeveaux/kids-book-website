/**
 * useLocalStorage Hook
 *
 * Custom React hook for managing localStorage with automatic
 * JSON serialization/deserialization and state synchronization.
 */

import { useState, useEffect } from 'react';

/**
 * Hook for managing localStorage state
 * @param {string} key - localStorage key
 * @param {any} initialValue - Initial value if key doesn't exist
 * @returns {[any, Function, Function]} [value, setValue, removeValue]
 */
export function useLocalStorage(key, initialValue) {
  // State to store our value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  /**
   * Return a wrapped version of useState's setter function that
   * persists the new value to localStorage
   * @param {any} value - Value to store
   */
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;

      // Save state
      setStoredValue(valueToStore);

      // Save to local storage
      if (valueToStore === undefined) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  /**
   * Remove the value from localStorage
   */
  const removeValue = () => {
    try {
      setStoredValue(initialValue);
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  };

  // Listen for storage changes from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.error(`Error parsing storage change for key "${key}":`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return [storedValue, setValue, removeValue];
}

/**
 * Hook for managing localStorage with expiration
 * @param {string} key - localStorage key
 * @param {any} initialValue - Initial value if key doesn't exist
 * @param {number} ttlMs - Time to live in milliseconds
 * @returns {[any, Function, Function]} [value, setValue, removeValue]
 */
export function useLocalStorageWithExpiry(key, initialValue, ttlMs = 24 * 60 * 60 * 1000) {
  // TODO: Implement localStorage with expiration logic
  console.warn('useLocalStorageWithExpiry not yet fully implemented');

  // For now, just use regular localStorage
  return useLocalStorage(key, initialValue);
}