const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const {
  paths,
  filePaths
} = require('./webpack.common');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',

  entry: filePaths.entry,
  output: {
    path: paths.build,
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].chunk.js',
    assetModuleFilename: 'assets/[name].[ext]'
  },

  experiments: {
    lazyCompilation: false
  },

  devServer: {
    client: {
      overlay: {
        errors: true,
        warnings: false
      }
    },
    historyApiFallback: true,
    hot: true,
    open: true,
    port: 3000,
    static: {
      directory: paths.public
    }
  },

  plugins: [
    new ReactRefreshWebpackPlugin()
  ]
};
