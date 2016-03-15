import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import AsyncProps from 'async-props';

import routes from './routes';

require('../css/app');

ReactDOM.render(
  <Router routes={routes}
    history={browserHistory}
    render={function renderAsyncProps(props) { return (<AsyncProps {...props} />); }}
  />,
  document.getElementById('app')
);
