'use strict';

const createLogger = require('bunyan').createLogger;
const koa = require('koa');
const koaBunyanLogger = require('koa-bunyan-logger');
const mount = require('koa-mount');
const koaNunjucks = require('koa-nunjucks-2');
const serve = require('koa-static-server');
const favicon = require('koa-favicon');
const path = require('path');

const config = require('../local_config');
const apiRoutes = require('./routes/api');
const webRoutes = require('./routes/web');

const logger = createLogger({
  name: 'colossus',
  hostname: config.NODEJS_ADDR,
});

process.env.API_ORIGIN = config.API_ORIGIN;

const app = koa();

app.context.render = koaNunjucks({
  ext: 'html',
  path: config.BUILD_PATH,
  nunjucksConfig: {
    tags: {
      blockStart: '<%',
      blockEnd: '%>',
      variableStart: '%%',
      variableEnd: '%%',
      commentStart: '<#',
      commentEnd: '#>',
    },
  },
});

app.use(koaBunyanLogger(logger));

app.use(serve({ rootDir: path.join(config.BUILD_PATH, '/assets'), rootPath: '/assets' }));
app.use(favicon(path.join(config.BUILD_PATH, '/favicon.ico')));
app.use(mount('/api', apiRoutes.routes()));
app.use(webRoutes);

app.listen(config.NODEJS_PORT);
logger.info(`Listening to ${config.NODEJS_ADDR}:${config.NODEJS_PORT}`);
