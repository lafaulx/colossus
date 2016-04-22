import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router, match } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

import routes from './routes';
import { configureStore } from './store';
import performContainerStaticMethod from './utils/performContainerStaticMethod';
import RadiumWrapper from './helpers/RadiumWrapper';

const store = configureStore(browserHistory, window.__initialState__);
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <RadiumWrapper>
      <Router routes={routes} history={history} />
    </RadiumWrapper>
  </Provider>,
  document.getElementById('app')
);

history.listen((location) =>
  match({ history, routes, location: location.path }, (error, redirectLocation, renderProps) =>
    performContainerStaticMethod(renderProps, store))
);
