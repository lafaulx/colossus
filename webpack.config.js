const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');

const config = require('./local_config');
const BUILD_PATH = config.BUILD_PATH;
const API_ORIGIN = config.API_ORIGIN;

module.exports = [{
  name: 'client',
  context: path.join(process.cwd(), 'src'),
  entry: ['./js/app.client'],
  devtool: 'inline-source-map',
  output: {
    path: path.join(BUILD_PATH, 'client'),
    publicPath: '/static/',
    filename: 'app.[hash].js',
  },

  resolve: {
    modulesDirectories: [
      'node_modules',
      'src/js',
      'src/css',
    ],
    extensions: ['', '.js', '.scss'],
  },

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'react'],
      },
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract(
        'style',
        'css?-minimize!postcss!sass'
      ),
    }],
  },

  postcss: [autoprefixer({
    browsers: ['last 2 version'],
    remove: false,
  })],

  plugins: [
    new ExtractTextPlugin('app.[hash].css'),
    new StatsPlugin('../stats.json'),
  ],
}, {
  name: 'server',
  context: path.join(process.cwd(), 'src'),
  entry: ['./js/app.server'],
  output: {
    path: path.join(BUILD_PATH, 'server'),
    publicPath: '/static/',
    filename: 'app.js',
    libraryTarget: 'commonjs2',
  },

  resolve: {
    modulesDirectories: [
      'node_modules',
      'src/js',
      'src/css',
    ],
    extensions: ['', '.js'],
  },

  externals: /^[a-z\-0-9]+$/,

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'react'],
      },
    }],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.API_ORIGIN': `"${API_ORIGIN}"`,
    }),
  ],
}, {
  name: 'error',
  context: path.join(process.cwd(), 'src'),
  entry: ['./js/app.error'],
  output: {
    path: path.join(BUILD_PATH, 'error'),
    filename: 'app.js',
    libraryTarget: 'umd',
  },

  resolve: {
    modulesDirectories: [
      'node_modules',
      'src/js',
      'src/css',
    ],
    extensions: ['', '.js'],
  },

  externals: /^[a-z\-0-9]+$/,

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'react'],
      },
    }],
  },

  plugins: [
    new StaticSiteGeneratorPlugin('main', [
      './error.html',
    ], {}),
  ],
}];
