require('babel-register')({
  presets: ['es2015', 'react'],
});

const React = require('react');
const renderToString = require('react-dom/server').renderToString;
const ReactRouter = require('react-router');

const routes = require('../../src/js/routes').default;

const match = ReactRouter.match;
const RouterContext = ReactRouter.RouterContext;

module.exports = function *ssr() {
  const body = yield new Promise((resolve) => {
    match({ routes, location: this.url }, (err, redirect, props) => {
      const handlerFactory = React.createFactory(RouterContext);

      resolve(renderToString(handlerFactory(props)));
    });
  });

  yield this.render('index', {
    body,
  });
};
