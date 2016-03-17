'use strict';

require('babel-register')({
  presets: ['es2015', 'react'],
});

const express = require('express');
const router = express.Router();

const serialize = require('serialize-javascript');
const nunjucks = require('nunjucks');
const path = require('path');
const React = require('react');

const ReactRouter = require('react-router');
const Provider = require('react-redux').Provider;
const renderToString = require('react-dom/server').renderToString;
const syncHistoryWithStore = require('react-router-redux').syncHistoryWithStore;

const config = require('../../local_config');
const routes = require('../../src/js/routes').default;
const configureStore = require('../../src/js/store').configureStore;
const performContainerStaticMethod = require('../../src/js/utils/performContainerStaticMethod').default;

const match = ReactRouter.match;
const RouterContext = ReactRouter.RouterContext;
const createMemoryHistory = ReactRouter.createMemoryHistory;

nunjucks.configure(path.join(process.cwd(), '/views'));

router.get('/*', function(req, res) {
  const memoryHistory = createMemoryHistory(req.url);
  const store = configureStore(memoryHistory);
  const history = syncHistoryWithStore(memoryHistory, store);

  match({ history, routes, location: req.url }, (error, redirectLocation, renderProps) => {
    const providerFactory = React.createFactory(Provider);
    const routerContextFactory = React.createFactory(RouterContext);

    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      performContainerStaticMethod(renderProps, store).then(() => {
        const body = renderToString(providerFactory({
          store,
        }, routerContextFactory(renderProps)));

        nunjucks.render('index.html', {
          body,
          state: serialize(store.getState()),
        }, function (err, data) {
          res.send(data);
        });
      });
    } else {
      res.sendStatus(404);
    }
  });
});

module.exports = router;
