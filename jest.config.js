module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
roots: ['<rootDir>/src/test/'],
  testMatch: ['**/*.test.ts'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
  moduleFileExtensions: ['ts', 'js'],
};
