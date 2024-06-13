const { series } = require('nps-utils');

module.exports = {
  dev: {
    default: {
      script: 'nodemon src/index.js',
      description: 'Starts the development server',
    },
  },
  build: {
    default: {
      script: series('nps clean', 'nps transpile'),
      description: 'Builds the app',
    },
    clean: {
      script: 'rimraf dist',
      description: 'Deletes the dist folder',
    },
    transpile: {
      script: 'babel src -d dist --ignore src/config',
      description: 'Transpiles the app',
    },
  },
  test: {
    default: {
      script: 'nps test.unit',
      description: 'Runs all tests',
    },
    unit: {
      script: 'jest',
      description: 'Runs unit tests',
    },
    integration: {
      script: 'jest --config=jest.integration.config.js',
      description: 'Runs integration tests',
    },
  },
};
