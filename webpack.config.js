const { merge } = require('webpack-merge');

const commonConfig = require('./config/webpack/webpack.common');
const devConfig = require('./config/webpack/webpack.dev');
const prodConfig = require('./config/webpack/webpack.prod');

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
