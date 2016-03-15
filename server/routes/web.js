require('babel-register')({
  presets: ['es2015', 'react'],
});

const React = require('react');
const renderToString = require('react-dom/server').renderToString;
const ReactRouter = require('react-router');
const AsyncPropsReq = require('async-props');

const routes = require('../../src/js/routes').default;

const match = ReactRouter.match;
const loadPropsOnServer = AsyncPropsReq.loadPropsOnServer;
const AsyncProps = AsyncPropsReq.default;

module.exports = function *ssr() {
  const data = yield new Promise((resolve) => {
    match({ routes, location: this.url }, (errMatch, redirect, renderProps) => {
      loadPropsOnServer(renderProps, {}, (errAsync, asyncProps, script) => {
        const handlerFactory = React.createFactory(AsyncProps);
        const ctx = Object.assign({}, renderProps, asyncProps);
        const body = renderToString(handlerFactory(ctx));

        resolve({
          body, script,
        });
      });
    });
  });

  yield this.render('index', {
    body: data.body,
    script: data.script,
  });
};
