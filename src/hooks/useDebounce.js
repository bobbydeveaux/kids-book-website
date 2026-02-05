/**
 * useDebounce Hook
 *
 * Custom React hook for debouncing values and callbacks.
 * Useful for search inputs, API calls, and other operations
 * that should be delayed until user stops typing/acting.
 */

import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Hook for debouncing a value
 * @param {any} value - The value to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {any} Debounced value
 */
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set up a timer to update the debounced value after the delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up the timer if value changes or component unmounts
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Hook for debouncing a callback function
 * @param {Function} callback - The function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced callback function
 */
export function useDebounceCallback(callback, delay = 300) {
  const timerRef = useRef();

  const debouncedCallback = useCallback(
    (...args) => {
      // Clear the previous timer
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      // Set up a new timer
      timerRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return debouncedCallback;
}

/**
 * Hook for debouncing async functions (like API calls)
 * @param {Function} asyncFunction - The async function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Object} { trigger, loading, result, error, cancel }
 */
export function useDebounceAsync(asyncFunction, delay = 300) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const timerRef = useRef();
  const cancelRef = useRef(false);

  const trigger = useCallback(
    (...args) => {
      // Clear the previous timer
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      // Reset cancel flag
      cancelRef.current = false;

      // Set up a new timer
      timerRef.current = setTimeout(async () => {
        if (cancelRef.current) return;

        setLoading(true);
        setError(null);

        try {
          const response = await asyncFunction(...args);

          if (!cancelRef.current) {
            setResult(response);
            setLoading(false);
          }
        } catch (err) {
          if (!cancelRef.current) {
            setError(err);
            setLoading(false);
          }
        }
      }, delay);
    },
    [asyncFunction, delay]
  );

  const cancel = useCallback(() => {
    cancelRef.current = true;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setLoading(false);
  }, []);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      cancel();
    };
  }, [cancel]);

  return { trigger, loading, result, error, cancel };
}

/**
 * Hook for debouncing state updates
 * @param {any} initialValue - Initial state value
 * @param {number} delay - Delay in milliseconds
 * @returns {Object} { value, debouncedValue, setValue, isPending }
 */
export function useDebounceState(initialValue, delay = 300) {
  const [value, setValue] = useState(initialValue);
  const debouncedValue = useDebounce(value, delay);
  const isPending = value !== debouncedValue;

  return {
    value,
    debouncedValue,
    setValue,
    isPending
  };
}