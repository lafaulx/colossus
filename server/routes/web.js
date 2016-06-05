'use strict';

const express = require('express');
const router = express.Router();
const createLogger = require('bunyan').createLogger;

const config = require('../../local_config');
const renderApp = require(`${config.BUILD_PATH}/server/app`).renderApp;

const errorHtmlPath = `${config.BUILD_PATH}/error/error.html`;

const logger = createLogger({
  name: 'colossus-web',
  hostname: config.NODEJS_ADDR,
});

router.get('/*', function onRequest(req, res) {
  renderApp(req.url, req.headers['user-agent'])
  .then(function onSuccess(html) {
    res.send(html);
  }, function onError(data) {
    const status = data.status;

    logger.error(data);

    switch (status) {
      case 301: res.redirect(data.url); break;
      default: res.sendFile(errorHtmlPath);
    }
  })
  .catch(function(e) {
    logger.error(e);
    res.sendFile(errorHtmlPath);
  });
});

module.exports = router;
