'use strict';

require('babel-register')({
  presets: ['es2015', 'react'],
});

const serialize = require('serialize-javascript');
const React = require('react');
const ReactRouter = require('react-router');
const Provider = require('react-redux').Provider;
const renderToString = require('react-dom/server').renderToString;
const syncHistoryWithStore = require('react-router-redux').syncHistoryWithStore;

const routes = require('../../src/js/routes').default;
const configureStore = require('../../src/js/store').configureStore;
const performContainerStaticMethod = require('../../src/js/utils/performContainerStaticMethod').default;

const match = ReactRouter.match;
const RouterContext = ReactRouter.RouterContext;
const createMemoryHistory = ReactRouter.createMemoryHistory;

module.exports = function *ssr() {
  const memoryHistory = createMemoryHistory(this.url);
  let store = configureStore(memoryHistory);
  const history = syncHistoryWithStore(memoryHistory, store);

  const data = yield new Promise((resolve) => {
    match({ history, routes, location: this.url }, (error, redirectLocation, renderProps) => {
      const providerFactory = React.createFactory(Provider);
      const routerContextFactory = React.createFactory(RouterContext);

      performContainerStaticMethod(renderProps, store, `${this.protocol}://${this.host}`).then(() => {
        store = configureStore(memoryHistory, store.getState());

        const body = renderToString(providerFactory({
          store,
        }, routerContextFactory(renderProps)));

        resolve({
          body,
          state: serialize(store.getState()),
        });
      });
    });
  });

  yield this.render('index', {
    body: data.body,
    state: data.state,
  });
};
