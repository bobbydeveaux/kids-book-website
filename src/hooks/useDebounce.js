/**
 * useDebounce Hook
 *
 * Custom React hook for debouncing values and functions to improve
 * performance by limiting the rate of function calls or state updates.
 *
 * @module useDebounce
 */

import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Debounce a value with a specified delay
 * @param {any} value - The value to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {any} The debounced value
 *
 * @example
 * const [searchTerm, setSearchTerm] = useState('');
 * const debouncedSearchTerm = useDebounce(searchTerm, 300);
 *
 * useEffect(() => {
 *   if (debouncedSearchTerm) {
 *     // Perform search API call
 *     searchAPI(debouncedSearchTerm);
 *   }
 * }, [debouncedSearchTerm]);
 */
export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set up a timeout to update the debounced value after the delay
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up the timeout if value changes before delay
    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Debounce a callback function
 * @param {Function} callback - The function to debounce
 * @param {number} delay - Delay in milliseconds
 * @param {Array} deps - Dependency array (like useCallback)
 * @returns {Function} The debounced callback function
 *
 * @example
 * const handleSearch = useDebouncedCallback(
 *   (query) => {
 *     searchAPI(query);
 *   },
 *   300,
 *   []
 * );
 */
export function useDebouncedCallback(callback, delay, deps = []) {
  const timeoutRef = useRef(null);

  const debouncedCallback = useCallback((...args) => {
    // Clear the previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set up a new timeout
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay, ...deps]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback;
}

/**
 * Hook for debounced search functionality
 * @param {Function} searchFn - The search function to call
 * @param {number} delay - Delay in milliseconds (default: 300)
 * @returns {[Function, boolean, any]} [search, isSearching, error]
 *
 * @example
 * const [search, isSearching, error] = useDebouncedSearch(
 *   async (query) => {
 *     const response = await fetch(`/api/search?q=${query}`);
 *     return response.json();
 *   },
 *   300
 * );
 *
 * // Use in component
 * <input onChange={(e) => search(e.target.value)} />
 */
export function useDebouncedSearch(searchFn, delay = 300) {
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);
  const timeoutRef = useRef(null);
  const abortControllerRef = useRef(null);

  const search = useCallback((query) => {
    // Clear previous timeout and abort previous search
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Reset error state
    setError(null);

    // If query is empty, don't search
    if (!query || query.trim() === '') {
      setIsSearching(false);
      return;
    }

    // Set up new search with debounce
    timeoutRef.current = setTimeout(async () => {
      setIsSearching(true);
      abortControllerRef.current = new AbortController();

      try {
        await searchFn(query.trim(), abortControllerRef.current.signal);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err);
          console.error('Search error:', err);
        }
      } finally {
        setIsSearching(false);
      }
    }, delay);
  }, [searchFn, delay]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return [search, isSearching, error];
}

/**
 * Hook for debounced window resize handling
 * @param {Function} callback - Function to call on resize
 * @param {number} delay - Delay in milliseconds (default: 150)
 *
 * @example
 * useDebouncedResize(() => {
 *   console.log('Window resized to:', window.innerWidth, window.innerHeight);
 * }, 200);
 */
export function useDebouncedResize(callback, delay = 150) {
  const debouncedCallback = useDebouncedCallback(callback, delay, [callback]);

  useEffect(() => {
    window.addEventListener('resize', debouncedCallback);

    return () => {
      window.removeEventListener('resize', debouncedCallback);
    };
  }, [debouncedCallback]);
}

/**
 * Hook for debounced scroll handling
 * @param {Function} callback - Function to call on scroll
 * @param {number} delay - Delay in milliseconds (default: 100)
 *
 * @example
 * useDebouncedScroll(() => {
 *   console.log('Page scrolled to:', window.scrollY);
 * }, 150);
 */
export function useDebouncedScroll(callback, delay = 100) {
  const debouncedCallback = useDebouncedCallback(callback, delay, [callback]);

  useEffect(() => {
    window.addEventListener('scroll', debouncedCallback);

    return () => {
      window.removeEventListener('scroll', debouncedCallback);
    };
  }, [debouncedCallback]);
}

export default useDebounce;