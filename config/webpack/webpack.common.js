require('dotenv').config();

const path = require('path');

const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const postcssPresetEnv = require('postcss-preset-env');
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const rootPath = path.resolve(__dirname, '..', '..');

const srcPath = path.join(rootPath, 'src');
const publicPath = path.join(rootPath, 'public');
const buildPath = path.join(rootPath, 'build');
const nodeModulesPath = path.join(rootPath, 'node_modules');
const cachePath = path.join(nodeModulesPath, '.cache');
const eslintCachePath = path.join(cachePath, '.eslintcache');
const publicHTMLFileName = 'index.html';
const entryFileName = 'index.tsx';
const faviconFileName = 'favicon.ico';
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

const load = ({
  mode,
  ANALYZE_BUNDLE,
}) => {
  const isDevelopment = isDevelopmentEnv(mode);
  const isProduction = isProductionEnv(mode);

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
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    postcssPresetEnv(),
                    postcssFlexbugsFixes(),
                  ],
                },
              },
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
              use: [
                {
                  loader: '@svgr/webpack'
                },
                {
                  loader:'url-loader'
                }
              ],
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
        filename: publicHTMLFileName,
        template: path.join(publicPath, publicHTMLFileName),
        favicon: path.join(publicPath, faviconFileName),
        hash: isDevelopment,
        scriptLoading: 'defer',
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
      ANALYZE_BUNDLE && new BundleAnalyzerPlugin(),
    ].filter(Boolean)
  }
};

module.exports = {
  load,

  srcPath,
  publicPath,
  buildPath,
  nodeModulesPath,
  cachePath,
  publicHTMLFileName,
  entryFileName,
  faviconFileName,
  jsRelativePath,
  cssRelativePath,
  assetsRelativePath,

  isDevelopmentEnv,
  isProductionEnv,
};
