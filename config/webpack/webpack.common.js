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

const paths = {
  root: rootPath,
  src: path.join(rootPath, 'src'),
  public: path.join(rootPath, 'public'),
  build: path.join(rootPath, 'build'),
  nodeModules: path.join(rootPath, 'node_modules'),
  cache: path.join(rootPath, 'node_modules', '.cache')
};

const files = {
  publicHTML: 'index.html',
  favicon: 'favicon.ico',
  eslintCache: '.eslintcache',
  entry: 'index.tsx'
};

const filePaths = {
  publicHTML: path.join(paths.public, files.publicHTML),
  favicon: path.join(paths.public, files.favicon),
  eslintCache: path.join(paths.cache, files.eslintCache),
  entry: path.join(paths.src, files.entry)
};

const isDevelopmentEnv = (env = '') => {
  const { NODE_ENV } = process.env;
  const mode = 'development';
  return env === mode || NODE_ENV === mode || NODE_ENV === undefined;
};

const isProductionEnv = (env = '') => {
  const { NODE_ENV } = process.env;
  const mode = 'production';
  return env === mode || NODE_ENV === mode;
};

const load = ({
  mode,
  ANALYZE_BUNDLE
}) => {
  const isDevelopment = isDevelopmentEnv(mode);
  const isProduction = isProductionEnv(mode);

  return {
    cache: {
      type: 'filesystem',
      cacheDirectory: paths.cache
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js']
    },
    stats: {
      errorDetails: true,
      children: true
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
                cacheDirectory: true
              }
            }
          ]
        },
        {
          test: /\.(js|ts)x?$/,
          enforce: 'pre',
          use: [
            {
              loader: 'source-map-loader'
            }
          ]
        },
        {
          test: /\.s?css$/,
          exclude: /\.module.s?css$/,
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
                    postcssFlexbugsFixes()
                  ]
                }
              }
            },
            {
              loader: 'sass-loader'
            }
          ]
        },
        {
          test: /\.module.s?css$/,
          use: [
            {
              loader: isProduction ? MiniCssExtractPlugin.loader : 'style-loader'
            },
            {
              loader: 'css-loader',
              options: {
                modules: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    postcssPresetEnv(),
                    postcssFlexbugsFixes()
                  ]
                }
              }
            },
            {
              loader: 'sass-loader'
            }
          ]
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
                  loader: 'url-loader'
                }
              ]
            },
            {
              type: 'asset'
            }
          ]
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': (
          Object
            .keys(process.env)
            .reduce((acc, key) => ({
              ...acc,
              [key]: JSON.stringify(process.env[key])
            }), {})
        )
      }),
      new HtmlWebpackPlugin({
        filename: files.publicHTML,
        template: filePaths.publicHTML,
        favicon: filePaths.favicon,
        inject: true,
        hash: isDevelopment,
        scriptLoading: 'defer'
      }),
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          diagnosticOptions: {
            semantic: true,
            syntactic: true
          }
        }
      }),
      new ESLintPlugin({
        extensions: ['js', 'jsx', 'ts', 'tsx'],
        failOnError: true,
        failOnWarning: false,
        cache: true,
        cacheLocation: filePaths.eslintCache
      }),
      ANALYZE_BUNDLE && new BundleAnalyzerPlugin()
    ].filter(Boolean)
  };
};

module.exports = {
  load,

  paths,
  files,
  filePaths,

  isDevelopmentEnv,
  isProductionEnv
};
