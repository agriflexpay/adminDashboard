/** @type {import('jest').Config} */
const config = {
    verbose: true,
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    moduleNameMapper: {
        '\\.(css)$': '<rootDir>/__mocks__/styleMock.js',
      },
    testEnvironment: 'jest-environment-jsdom',
    testMatch: ['**/src/**/*.test.{js,jsx,ts,tsx}'],
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
};

export default config;