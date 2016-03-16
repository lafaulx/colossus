import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import counterReducer from './reducers/counter';

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
      promiseMiddleware,
      routerMiddleware(history)
    )
  );

  return store;
}
