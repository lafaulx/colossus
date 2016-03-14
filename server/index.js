const createLogger = require('bunyan').createLogger;
const koa = require('koa');
const koaStatic = require('koa-static');

const config = require('../local_config');

const logger = createLogger({
  name: 'colossus',
  hostname: config.NODEJS_ADDR,
});

const app = koa();

app.use(koaStatic(config.BUILD_PATH));

app.listen(config.NODEJS_PORT);
logger.info(`Listening to ${config.NODEJS_ADDR}:${config.NODEJS_PORT}`);
