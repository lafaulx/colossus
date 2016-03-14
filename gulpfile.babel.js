import gulp from 'gulp';
import gutil from 'gulp-util';
import webpack from 'webpack';
import render, { nunjucks } from 'gulp-nunjucks-render';
import path from 'path';
import WebpackDevServer from 'webpack-dev-server';

import config from './local_config';
import webpackConfig from './webpack.config';

const SRC_ROOT = 'src';

gulp.task('html', () => {
  const dest = config.BUILD_PATH;
  const files = [path.join(SRC_ROOT, 'index.html')];
  const context = {
    path: SRC_ROOT,
    data: {
      PORT: config.DEV_SERVER_PORT,
    },
  };

  nunjucks.configure(SRC_ROOT, {
    watch: false,
  });

  return gulp.src(files, { base: SRC_ROOT })
    .pipe(render(context))
    .pipe(gulp.dest(dest));
});

gulp.task('watch', () => gulp.watch(`${SRC_ROOT}/*.html`, ['html']));

gulp.task('server', ['html', 'watch'], () => {
  const localUrl = `http://localhost:${config.DEV_SERVER_PORT}`;
  const server = new WebpackDevServer(webpack(webpackConfig), {
    contentBase: config.BUILD_PATH,
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    stats: {
      colors: true,
    },
  });

  server.listen(config.DEV_SERVER_PORT, '0.0.0.0', (err) => {
    if (err) {
      throw new gutil.PluginError('server', err);
    }

    gutil.log('[server]', `${localUrl}/webpack-dev-server/`);
  });
});

gulp.task('default', ['server']);
