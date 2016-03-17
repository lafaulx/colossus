'use strict';

const express = require('express');
const createLogger = require('bunyan').createLogger;
const loggerMiddleware = require('bunyan-middleware');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const config = require('../local_config');
const apiRoutes = require('./routes/api');
const webRoutes = require('./routes/web');

const logger = createLogger({
  name: 'colossus',
  hostname: config.NODEJS_ADDR,
});

process.env.API_ORIGIN = config.API_ORIGIN;

const app = express();

app.use(loggerMiddleware({ logger }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static', express.static(`${config.BUILD_PATH}/client`));
app.use('/static', express.static(`${__dirname}/static`));

app.use('/api', apiRoutes);
app.use('/', webRoutes);


app.listen(config.NODEJS_PORT, config.NODEJS_ADDR, function () {
  logger.info(`Listening to ${config.NODEJS_ADDR}:${config.NODEJS_PORT}`);
});
