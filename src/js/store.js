import { createStore, combineReducers, applyMiddleware } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createLogger from 'redux-logger';

import counterReducer from './reducers/counter';

export function configureStore(history, initialState) {
  const reducer = combineReducers({
    counter: counterReducer,
    routing: routerReducer,
  });

  const logger = createLogger();

  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(
      apiMiddleware,
      routerMiddleware(history),
      logger
    )
  );

  return store;
}
