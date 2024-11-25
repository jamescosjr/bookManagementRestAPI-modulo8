module.exports = {
  testEnvironment: 'node',
  testTimeout: 20000, 
  coverageDirectory: 'coverage',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*.test.js',
  ],
  testMatch: [
    '**/src/__tests__/**/*.test.js',
  ],
  setupFilesAfterEnv: ['./jest.setup.js'],
};