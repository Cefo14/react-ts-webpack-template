const { merge } = require('webpack-merge');

const commonConfig = require('./config/webpack/webpack.common');
const devConfig = require('./config/webpack/webpack.dev');
const prodConfig = require('./config/webpack/webpack.prod');

module.exports = (env, args) => {
  const { ANALYZE_BUNDLE = false } = env;
  const { mode } = args;

  const baseConfig = commonConfig.load({ mode, ANALYZE_BUNDLE });

  switch(mode) {
    case 'development':
      return merge(baseConfig, devConfig);
    case 'production':
      return merge(baseConfig, prodConfig);
    default:
      throw new Error(`Mode: ${mode} not found`);
  }
};
