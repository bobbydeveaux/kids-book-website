/**
 * useLocalStorage Hook
 *
 * Custom React hook for managing localStorage state with automatic
 * serialization/deserialization and error handling.
 *
 * @module useLocalStorage
 */

import { useState, useEffect, useCallback } from 'react'

/**
 * Custom hook for localStorage state management
 * @param {string} key - The localStorage key
 * @param {any} initialValue - Initial value if key doesn't exist
 * @returns {[any, Function, Function]} [value, setValue, removeValue]
 *
 * @example
 * const [user, setUser, removeUser] = useLocalStorage('user', null);
 *
 * // Set value
 * setUser({ name: 'John', email: 'john@example.com' });
 *
 * // Remove value
 * removeUser();
 */
export function useLocalStorage(key, initialValue) {
  // State to store the current value
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }

    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  /**
   * Return a wrapped version of useState's setter function that persists
   * the new value to localStorage.
   */
  const setValue = useCallback(
    value => {
      try {
        // Allow value to be a function so we have the same API as useState
        const valueToStore = value instanceof Function ? value(storedValue) : value

        // Save state
        setStoredValue(valueToStore)

        // Save to localStorage
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore))
        }
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error)
      }
    },
    [key, storedValue]
  )

  /**
   * Remove the value from localStorage and reset to initial value
   */
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue)

      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key)
      }
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error)
    }
  }, [key, initialValue])

  /**
   * Listen for changes to localStorage from other tabs/windows
   */
  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const handleStorageChange = e => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue))
        } catch (error) {
          console.error(`Error parsing localStorage value for key "${key}":`, error)
        }
      } else if (e.key === key && e.newValue === null) {
        setStoredValue(initialValue)
      }
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [key, initialValue])

  return [storedValue, setValue, removeValue]
}

/**
 * Hook specifically for storing user preferences
 * @returns {[Object, Function, Function]} [preferences, setPreferences, clearPreferences]
 *
 * @example
 * const [prefs, setPrefs, clearPrefs] = useUserPreferences();
 *
 * // Update theme preference
 * setPrefs(prev => ({ ...prev, theme: 'dark' }));
 */
export function useUserPreferences() {
  const defaultPreferences = {
    theme: 'light',
    currency: 'USD',
    language: 'en',
    notifications: true,
    autoSave: true,
  }

  return useLocalStorage('userPreferences', defaultPreferences)
}

/**
 * Hook for storing shopping cart state
 * @returns {[Array, Function, Function]} [cart, setCart, clearCart]
 *
 * @example
 * const [cart, setCart, clearCart] = useShoppingCart();
 *
 * // Add item to cart
 * setCart(prev => [...prev, { id: '123', quantity: 1 }]);
 */
export function useShoppingCart() {
  return useLocalStorage('shoppingCart', [])
}

/**
 * Hook for storing recently viewed products
 * @param {number} maxItems - Maximum number of recent items to store
 * @returns {[Array, Function, Function]} [recent, addToRecent, clearRecent]
 *
 * @example
 * const [recent, addToRecent, clearRecent] = useRecentProducts(10);
 *
 * // Add product to recent list
 * addToRecent('product-123');
 */
export function useRecentProducts(maxItems = 20) {
  const [recent, setRecent, clearRecent] = useLocalStorage('recentProducts', [])

  const addToRecent = useCallback(
    productId => {
      setRecent(prev => {
        const filtered = prev.filter(id => id !== productId)
        const updated = [productId, ...filtered]
        return updated.slice(0, maxItems)
      })
    },
    [setRecent, maxItems]
  )

  return [recent, addToRecent, clearRecent]
}

export default useLocalStorage
