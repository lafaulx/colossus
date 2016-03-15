'use strict';

const createLogger = require('bunyan').createLogger;
const koa = require('koa');
const koaStatic = require('koa-static');
const koaBunyanLogger = require('koa-bunyan-logger');
const mount = require('koa-mount');
const koaNunjucks = require('koa-nunjucks-2');
const path = require('path');

const config = require('../local_config');
const apiRoutes = require('./routes/api');
const webRoutes = require('./routes/web');

const logger = createLogger({
  name: 'colossus',
  hostname: config.NODEJS_ADDR,
});

const app = koa();


app.context.render = koaNunjucks({
  ext: 'html',
  path: path.join(__dirname, '..', '/build'),
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

app.use(koaStatic(config.BUILD_PATH));
app.use(koaBunyanLogger(logger));
app.use(mount('/api', apiRoutes.routes()));
app.use(webRoutes);

app.listen(config.NODEJS_PORT);
logger.info(`Listening to ${config.NODEJS_ADDR}:${config.NODEJS_PORT}`);
