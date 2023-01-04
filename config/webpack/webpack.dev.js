const path = require('path');

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const {
  srcPath,
  entryFileName,
  publicPath,
  jsRelativePath,
  assetsRelativePath,
  buildPath
} = require('./webpack.common');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',

  entry: path.join(srcPath, entryFileName),
  output: {
    path: buildPath,
    filename: path.join(jsRelativePath, '[name].js'),
    chunkFilename: path.join(jsRelativePath, '[name].chunk.js'),
    assetModuleFilename: path.join(assetsRelativePath, '[name].[contenthash][ext]')
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
      directory: publicPath
    }
  },

  plugins: [
    new ReactRefreshWebpackPlugin()
  ]
};
