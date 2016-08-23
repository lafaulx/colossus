import { createStore, combineReducers, applyMiddleware } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createLogger from 'redux-logger';
import immutable from 'immutable';

import counterReducer from './reducers/counter';

export function configureStore(history, initialState) {
  const reducer = combineReducers({
    counter: counterReducer,
    routing: routerReducer,
  });

  const logger = createLogger();

  if (typeof initialState === 'object') {
    for (let key in initialState) {
      initialState[key] = immutable.fromJS(initialState[key]);
    }
  }

  const middleware = [apiMiddleware, routerMiddleware(history)];

  if (process.env.JS_ENV === 'browser') {
    middleware.push(logger);
  }

  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(...middleware)
  );

  return store;
}
