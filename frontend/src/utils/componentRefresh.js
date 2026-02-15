import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@utils': path.resolve(__dirname, './src/utils'),
    },
  },
});

/**
 * Utility function to conditionally join class names.
 * @param  {...string} classes - List of class names.
 * @returns {string} - A single string of joined class names.
 */
export const cn = (...classes) => {
    return classes.filter(Boolean).join(' ');
  };
  
  /**
   * Utility function to debounce a function call.
   * @param {Function} func - The function to debounce.
   * @param {number} delay - The debounce delay in milliseconds.
   * @returns {Function} - A debounced version of the function.
   */
  export const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };
  
  /**
   * Utility function to throttle a function call.
   * @param {Function} func - The function to throttle.
   * @param {number} limit - The throttle limit in milliseconds.
   * @returns {Function} - A throttled version of the function.
   */
  export const throttle = (func, limit) => {
    let lastFunc;
    let lastRan;
    return (...args) => {
      if (!lastRan) {
        func(...args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(() => {
          if (Date.now() - lastRan >= limit) {
            func(...args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    };
  };
  
  /**
   * Utility function to format a date to a readable string.
   * @param {Date|string} date - The date to format.
   * @returns {string} - A formatted date string.
   */
  export const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  /**
   * Utility function to safely parse JSON.
   * @param {string} jsonString - The JSON string to parse.
   * @param {any} fallback - The fallback value if parsing fails.
   * @returns {any} - The parsed JSON or the fallback value.
   */
  export const safeJsonParse = (jsonString, fallback = null) => {
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      console.error('Failed to parse JSON:', error);
      return fallback;
    }
  };