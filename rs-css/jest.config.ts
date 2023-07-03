export default {
  clearMocks: true,

  collectCoverage: true,

  collectCoverageFrom: ['./src/**/*.ts', '!**/node_modules/**'],

  coverageDirectory: 'coverage',

  coverageProvider: 'v8',

  testEnvironment: 'jsdom',
}
