import nextJest from 'next/jest.js';

import type { Config } from 'jest';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const config: Config = {
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  transformIgnorePatterns: ['node_modules/(?!aggregate-error|clean-stack|escape-string-regexp|indent-string|p-map)'],
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    // '^(.*)\\.js$': '$1',
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
