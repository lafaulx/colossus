import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import Index from './containers/Index';
import Counter from './containers/Counter';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Index} />
    <Route path="/counter" component={Counter} />
  </Route>
);
