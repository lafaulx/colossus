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

module.exports = function *ssr(next) {
  const memoryHistory = createMemoryHistory(this.url);
  const store = configureStore(memoryHistory);
  const history = syncHistoryWithStore(memoryHistory, store);

  const data = yield new Promise((resolve) => {
    match({ history, routes, location: this.url }, (error, redirectLocation, renderProps) => {
      const providerFactory = React.createFactory(Provider);
      const routerContextFactory = React.createFactory(RouterContext);

      if (error) {
        resolve({ status: 500, message: error.message }).status(500).send(error.message);
      } else if (redirectLocation) {
        resolve({ status: 302, location: redirectLocation.pathname + redirectLocation.search });
      } else if (renderProps) {
        performContainerStaticMethod(renderProps, store).then(() => {
          const body = renderToString(providerFactory({
            store,
          }, routerContextFactory(renderProps)));

          resolve({
            status: 200,
            body,
            state: serialize(store.getState()),
          });
        });
      } else {
        resolve({ status: 404 });
      }
    });
  });

  switch (data.status) {
    case 200: yield this.render('index', {
      body: data.body,
      state: data.state,
    }); break;
    case 302: this.redirect(data.location); break;
    case 404: yield next; break;
    case 500: this.throw(data.message, 500); break;
    default: yield next;
  }
};
