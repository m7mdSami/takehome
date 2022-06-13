const { defineConfig } = require('cypress');
const webpackConfig = require('./webpack.config.js');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8082',
  },
  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
      webpackConfig,
    },
  },
});
