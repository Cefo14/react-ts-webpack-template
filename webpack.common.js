require('dotenv').config();

const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const srcPath = path.join(__dirname, 'src');
const publicPath = path.join(__dirname, 'public');
const buildPath = path.join(__dirname, 'build');
const nodeModulesPath = path.join(__dirname, 'node_modules');
const cachePath = path.join(nodeModulesPath, '.cache');
const eslintCachePath = path.join(cachePath, '.eslintcache');
const entryHTMLFileName = 'index.html';
const entryFileName = 'index.tsx';
const jsRelativePath = 'js';
const cssRelativePath = 'css';
const assetsRelativePath = 'assets';

const isDevelopmentEnv = (env = '') => {
  const { NODE_ENV } = process.env;
  const mode = 'development';
  return env === mode || NODE_ENV === mode || NODE_ENV === undefined
};

const isProductionEnv = (env = '') => {
  const { NODE_ENV } = process.env;
  const mode = 'production';
  return env === mode || NODE_ENV === mode
};

const load = (env) => {
  const isDevelopment = isDevelopmentEnv(env);
  const isProduction = isProductionEnv(env);

  return {
    cache: {
      type: 'filesystem',
      cacheDirectory: cachePath,
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
    stats: {
      errorDetails: true,
    },

    module: {
      rules: [
        {
          test: /\.(js|ts)x?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheCompression: false,
                cacheDirectory: true,
              }
            },
          ],
        },
        {
          test: /\.s?css$/,
          use: [
            {
              loader: isProduction ? MiniCssExtractPlugin.loader : 'style-loader'
            },
            {
              loader: 'css-loader'
            },
            {
              loader: 'sass-loader'
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif|webp)$/i,
          type: 'asset'
        },
        {
          test: /\.svg$/i,
          oneOf: [
            {
              dependency: { not: ['url'] },
              use: ['@svgr/webpack', 'url-loader'],
            },
            {
              type: 'asset',
            },
          ],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env": JSON.stringify(process.env),
      }),
      new HtmlWebpackPlugin({
        filename: entryHTMLFileName,
        template: path.join(publicPath, entryHTMLFileName),
        hash: true
      }),
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          diagnosticOptions: {
            semantic: true,
            syntactic: true,
          }
        },
      }),
      new ESLintPlugin({
        extensions: ['js', 'jsx', 'ts', 'tsx'],
        failOnError: true,
        failOnWarning: false,
        cache: true,
        cacheLocation: eslintCachePath,
      }),
    ]
  }
};

module.exports = {
  load,

  srcPath,
  publicPath,
  buildPath,
  nodeModulesPath,
  cachePath,
  entryHTMLFileName,
  entryFileName,
  jsRelativePath,
  cssRelativePath,
  assetsRelativePath,

  isDevelopmentEnv,
  isProductionEnv,
};
