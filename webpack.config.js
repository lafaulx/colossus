import autoprefixer from 'autoprefixer';
import path from 'path';
import webpack from 'webpack';

import config from './local_config';

export default {
  context: path.join(process.cwd(), 'src'),
  entry: ['webpack/hot/dev-server', './js/app'],
  debug: true,
  devtool: 'eval',
  output: {
    path: path.join(config.BUILD_PATH, 'static'),
    publicPath: `http://localhost:${config.DEV_SERVER_PORT}/static/`,
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

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __DEV__: true,
    }),
  ],

  postcss: [autoprefixer({
    browsers: ['last 2 version'],
    remove: false,
  })],
};
