'use strict';

const express = require('express');
const router = express.Router();
const createLogger = require('bunyan').createLogger;

const config = require('../../local_config');
const renderApp = require(`${config.BUILD_PATH}/server/app`).renderApp;

const logger = createLogger({
  name: 'colossus-web',
  hostname: config.NODEJS_ADDR,
});

router.get('/*', function(req, res) {
  renderApp(req.url, req.headers['user-agent'])
  .then(function(html) {
    res.send(html);
  })
  .catch(function(data) {
    const status = data.status;

    logger.error(data);

    switch (status) {
      case 301: res.redirect(data.url); break;
      default: res.sendStatus(500);
    }
  });
});

module.exports = router;
