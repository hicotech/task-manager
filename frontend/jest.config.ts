import config from '../jest.config';

export default {
    ...config,
    roots: ['<rootDir>/src'],
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/support/setupUnitTests.ts'],
};
