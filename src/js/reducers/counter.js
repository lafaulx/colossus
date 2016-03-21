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

  COUNTER_BAD,
  COUNTER_BAD_FAIL,
} from '../actions/counter';

import { handleActions } from 'redux-actions';

const onLoadingObj = {
  isLoading: true,
  isError: false,
};

const onErrorObj = {
  isLoading: false,
  isError: true,
};

const onSuccessObj = {
  isLoading: false,
  isError: false,
};

export default handleActions({
  [COUNTER_GET]: (state) => Object.assign({}, state, onLoadingObj),
  [COUNTER_GET_OK]: (state, action) => Object.assign({}, state, onSuccessObj, { value: action.payload.counter }),
  [COUNTER_GET_FAIL]: (state) => Object.assign({}, state, onErrorObj),

  [COUNTER_INCREMENT]: (state) => Object.assign({}, state, onLoadingObj),
  [COUNTER_INCREMENT_OK]: (state, action) => Object.assign({}, state, onSuccessObj, { value: action.payload.counter }),
  [COUNTER_INCREMENT_FAIL]: (state) => Object.assign({}, state, onErrorObj),

  [COUNTER_DECREMENT]: (state) => Object.assign({}, state, onLoadingObj),
  [COUNTER_DECREMENT_OK]: (state, action) => Object.assign({}, state, onSuccessObj, { value: action.payload.counter }),
  [COUNTER_DECREMENT_FAIL]: (state) => Object.assign({}, state, onErrorObj),

  [COUNTER_BAD]: (state) => Object.assign({}, state, onLoadingObj),
  [COUNTER_BAD_FAIL]: (state) => Object.assign({}, state, onErrorObj),
}, { value: 0, isLoading: true, isError: false });
