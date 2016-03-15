import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import App from './components/App';
import Index from './components/Index';
import Counter from './components/Counter';

require('../css/app');

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Index} />
      <Route path="/counter" component={Counter} />
    </Route>
  </Router>,
  document.getElementById('app')
);
