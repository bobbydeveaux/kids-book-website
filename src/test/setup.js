import '@testing-library/jest-dom';

// Mock IntersectionObserver for tests
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock Image loading for tests
Object.defineProperty(HTMLImageElement.prototype, 'loading', {
  set() {},
  get() { return 'lazy'; }
});