const path = require('path');

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

const {
  srcPath,
  entryFileName,
  jsRelativePath,
  cssRelativePath,
  assetsRelativePath,
  buildPath
} = require('./webpack.common');

module.exports = {
  mode: 'production',
  devtool: 'source-map',

  entry: path.join(srcPath, entryFileName),
  output: {
    path: buildPath,
    filename: path.join(jsRelativePath, '[name].[contenthash].js'),
    chunkFilename: path.join(jsRelativePath, '[name].[contenthash].chunk.js'),
    assetModuleFilename: path.join(assetsRelativePath, '[name].[contenthash][ext]'),
    clean: true
  },

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin(),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.sharpMinify,
          options: {
            encodeOptions: {
              jpeg: {
                quality: 39 // medium - low
              },
              png: {
                quality: 39 // medium - low
              },
              webp: {
                lossless: false
              }
            }
          }
        }
      })
    ],
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: path.join(cssRelativePath, '[name].[contenthash].css'),
      chunkFilename: path.join(cssRelativePath, '[name].[contenthash].chunk.css')
    })
  ]
};
