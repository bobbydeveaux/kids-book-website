export default {
  testEnvironment: 'jsdom',
  collectCoverageFrom: [
    'src/**/*.js',
    'build/**/*.js',
    '!node_modules/**',
    '!dist/**'
  ],
  testMatch: [
    '**/tests/**/*.test.js'
  ],
  transform: {},
  moduleFileExtensions: ['js', 'json'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/'
  ]
};