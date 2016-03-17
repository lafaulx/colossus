import { createStore, combineReducers, applyMiddleware } from 'redux';
import counterReducer from './reducers/counter';
import { apiMiddleware } from 'redux-api-middleware';

import { routerReducer, routerMiddleware } from 'react-router-redux';

export function configureStore(history, initialState) {
  const reducer = combineReducers({
    counter: counterReducer,
    routing: routerReducer,
  });

  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(
      apiMiddleware,
      routerMiddleware(history)
    )
  );

  return store;
}
