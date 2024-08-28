module.exports = {
    preset: 'ts-jest', // Use ts-jest preset for TypeScript support
    testEnvironment: 'node', // Use node environment for testing
    transform: {
        '^.+\\.ts$': 'ts-jest', // Use ts-jest for transforming .ts files
    },
    moduleFileExtensions: ['ts', 'js'], // Recognize both TypeScript and JavaScript files
    testMatch: ['**/tests/**/*.test.ts'], // Match test files with .test.ts extension
    transformIgnorePatterns: ['<rootDir>/node_modules/'], // Ignore node_modules for transformations
};
