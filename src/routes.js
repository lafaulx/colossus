import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import IndexPage from './containers/IndexPage';
import CounterPage from './containers/CounterPage';
import NotFoundPage from './containers/NotFoundPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={IndexPage} />
    <Route path="/counter" component={CounterPage} />
    <Route path="/**" component={NotFoundPage} />
  </Route>
);
