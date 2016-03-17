'use strict';

const express = require('express');
const router = express.Router();

const path = require('path');
const config = require('../../local_config');
const renderApp = require(config.BUILD_PATH + '/server/app').renderApp;

router.get('/*', function onRequest(req, res) {
  renderApp(req.url)
  .then(function onSuccess(html) {
    res.send(html);
  }, function onError(data) {
    const status = data.status;

    switch (status) {
      case 301: res.redirect(data.url); break;
      case 404: res.sendStatus(404); break;
      case 500: res.status(500).send(data.message); break;
      default: res.sendStatus(500);
    }
  });
});

module.exports = router;
