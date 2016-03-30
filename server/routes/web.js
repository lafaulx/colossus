'use strict';

const express = require('express');
const router = express.Router();

const config = require('../../local_config');
const renderApp = require(`${config.BUILD_PATH}/server/app`).renderApp;

const errorHtmlPath = `${config.BUILD_PATH}/error/error.html`;

router.get('/*', function onRequest(req, res) {
  renderApp(req.url)
  .then(function onSuccess(html) {
    res.send(html);
  }, function onError(data) {
    const status = data.status;

    switch (status) {
      case 301: res.redirect(data.url); break;
      default: res.sendFile(errorHtmlPath);
    }
  })
  .catch(function() {
    res.sendFile(errorHtmlPath);
  });
});

module.exports = router;
