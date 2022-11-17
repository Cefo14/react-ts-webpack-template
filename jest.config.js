module.exports = {
  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  // A map from regular expressions to module names that allow to stub out resources, like images or styles with a single module.
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '\\.(svg)$': '<rootDir>/jest/svgMapper.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/jest/fileMapper.js',
  },

  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  setupFilesAfterEnv: [
    '<rootDir>/jest/jest-setup.js'
  ],

  // The test environment that will be used for testing
  testEnvironment: "jsdom",
};