export default {
    roots: [
        "<rootDir>/src",
        "<rootDir>/test"
    ],
    transformIgnorePatterns: ['/node_modules/(?!your-library-name)'],
    presets: ['@babel/preset-env', '@babel/preset-react'],
    testEnvironment: 'jsdom', 
    // other Jest config options...
};