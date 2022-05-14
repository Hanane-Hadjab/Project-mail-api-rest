module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFiles: ['dotenv/config'],
    // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
    testPathIgnorePatterns: [
        "/node_modules/",
        "/dist/",
        "/.idea/",
        "/.build/"
    ],
};