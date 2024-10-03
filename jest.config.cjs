module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transformIgnorePatterns: [
    '/node_modules/(?!(@remix-run/react|@web3-storage/multipart-parser)/)',
  ],
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/app/$1', // Map the alias '~/...' to the correct folder
  },
};
