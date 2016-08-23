const path = require('path');
const webpack = require('webpack');
const crypto = require('crypto');

const config = require('./local_config');
const BUILD_PATH = config.BUILD_PATH;
const API_ORIGIN = config.API_ORIGIN;

const hash = crypto.randomBytes(20).toString('hex');

module.exports = [{
  name: 'client',
  context: path.join(process.cwd(), 'src'),
  entry: ['./app.client'],
  devtool: 'inline-source-map',
  output: {
    path: path.join(BUILD_PATH, 'client'),
    publicPath: '/static/',
    filename: `app.${hash}.js`,
  },

  resolve: {
    modulesDirectories: [
      'node_modules',
      'src',
    ],
    extensions: ['', '.js'],
  },

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
      'process.env.JS_ENV': '"browser"',
    }),
  ],
}, {
  name: 'server',
  context: path.join(process.cwd(), 'src'),
  entry: ['./app.server'],
  output: {
    path: path.join(BUILD_PATH, 'server'),
    publicPath: '/static/',
    filename: 'app.js',
    libraryTarget: 'commonjs2',
  },

  resolve: {
    modulesDirectories: [
      'node_modules',
      'src',
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
      'process.env.hash': `"${hash}"`,
      'process.env.JS_ENV': '"node"',
    }),
  ],
}];
