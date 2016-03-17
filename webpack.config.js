const autoprefixer = require('autoprefixer');
const path = require('path');

const config = require('./local_config');

module.exports = {
  context: path.join(process.cwd(), 'src'),
  entry: ['./js/app'],
  devtool: 'inline-source-map',
  output: {
    path: config.BUILD_PATH,
    publicPath: '/static/',
    filename: 'app.js',
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
      loader: 'style!css?-minimize!postcss!sass',
    }],
  },

  postcss: [autoprefixer({
    browsers: ['last 2 version'],
    remove: false,
  })],
};
