'use strict';

const createLogger = require('bunyan').createLogger;
const koa = require('koa');
const koaStatic = require('koa-static');
const koaBunyanLogger = require('koa-bunyan-logger');

const config = require('../local_config');
const apiRoutes = require('./routes/api');
const webRoutes = require('./routes/web');

const logger = createLogger({
  name: 'colossus',
  hostname: config.NODEJS_ADDR,
});

const app = koa();

app.use(koaStatic(config.BUILD_PATH));
app.use(koaBunyanLogger(logger));
app.use(apiRoutes.routes());
app.use(webRoutes.routes());

app.listen(config.NODEJS_PORT);
logger.info(`Listening to ${config.NODEJS_ADDR}:${config.NODEJS_PORT}`);
