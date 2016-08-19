import Immutable from 'immutable';

import {
  COUNTER_GET,
  COUNTER_GET_OK,
  COUNTER_GET_FAIL,

  COUNTER_INCREMENT,
  COUNTER_INCREMENT_OK,
  COUNTER_INCREMENT_FAIL,

  COUNTER_DECREMENT,
  COUNTER_DECREMENT_OK,
  COUNTER_DECREMENT_FAIL,
} from '../actions/counter';

import { handleActions } from 'redux-actions';

const map = Immutable.Map;

const initialState = map({
  value: 0,
  isLoading: true,
  isError: false,
});

export default handleActions({
  [COUNTER_GET]: (state) =>
    state.set('isLoading', true),
  [COUNTER_GET_OK]: (state, action) =>
    state
    .set('isLoading', false)
    .set('isError', false)
    .set('value', action.payload.counter),
  [COUNTER_GET_FAIL]: (state) =>
    state
    .set('isLoading', false)
    .set('isError', true),

  [COUNTER_INCREMENT]: (state) =>
    state.set('isLoading', true),
  [COUNTER_INCREMENT_OK]: (state, action) =>
    state
    .set('isLoading', false)
    .set('isError', false)
    .set('value', action.payload.counter),
  [COUNTER_INCREMENT_FAIL]: (state) =>
    state
    .set('isLoading', false)
    .set('isError', true),

  [COUNTER_DECREMENT]: (state) =>
    state.set('isLoading', true),
  [COUNTER_DECREMENT_OK]: (state, action) =>
    state
    .set('isLoading', false)
    .set('isError', false)
    .set('value', action.payload.counter),
  [COUNTER_DECREMENT_FAIL]: (state) =>
    state
    .set('isLoading', false)
    .set('isError', true),
}, initialState);
