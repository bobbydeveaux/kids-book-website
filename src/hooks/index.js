/**
 * Custom Hooks Module Exports
 *
 * Centralized exports for all custom React hooks including
 * localStorage hooks, debounce hooks, and other custom hooks.
 *
 * @example
 * import { useLocalStorage, useDebounce } from '@/hooks';
 * import { useUserPreferences, useDebouncedCallback } from '@/hooks';
 */

// Export localStorage hooks
export {
  useLocalStorage,
  useUserPreferences,
  useShoppingCart,
  useRecentProducts,
  default as useLocalStorageHook,
} from './useLocalStorage.js'

// Export debounce hooks
export {
  useDebounce,
  useDebouncedCallback,
  useDebouncedSearch,
  useDebouncedResize,
  useDebouncedScroll,
  default as useDebounceHook,
} from './useDebounce.js'

/**
 * Hook categories for organized imports
 */
export const storageHooks = {
  useLocalStorage: require('./useLocalStorage.js').useLocalStorage,
  useUserPreferences: require('./useLocalStorage.js').useUserPreferences,
  useShoppingCart: require('./useLocalStorage.js').useShoppingCart,
  useRecentProducts: require('./useLocalStorage.js').useRecentProducts,
}

export const debounceHooks = {
  useDebounce: require('./useDebounce.js').useDebounce,
  useDebouncedCallback: require('./useDebounce.js').useDebouncedCallback,
  useDebouncedSearch: require('./useDebounce.js').useDebouncedSearch,
  useDebouncedResize: require('./useDebounce.js').useDebouncedResize,
  useDebouncedScroll: require('./useDebounce.js').useDebouncedScroll,
}

/**
 * Combined hooks interface
 */
export default {
  storage: storageHooks,
  debounce: debounceHooks,
}
