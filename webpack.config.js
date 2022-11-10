const { merge } = require('webpack-merge');

const commonConfig = require('./webpack.common');
const devConfig = require('./webpack.dev');
const prodConfig = require('./webpack.prod');

module.exports = (env, args) => {
  const { mode } = args;
  const baseConfig = commonConfig.load(mode);

  switch(mode) {
    case 'development':
      return merge(baseConfig, devConfig);
    case 'production':
      return merge(baseConfig, prodConfig);
    default:
      throw new Error(`Mode: ${mode} not found`);
  }
};
