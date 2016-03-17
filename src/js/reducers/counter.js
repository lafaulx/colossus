import {
  COUNTER_GET_OK,
  COUNTER_INCREMENT_OK,
  COUNTER_DECREMENT_OK,
} from '../actions/counter';

import { handleActions } from 'redux-actions';

export default handleActions({
  [COUNTER_GET_OK]: (state, action) => action.payload.counter,
  [COUNTER_INCREMENT_OK]: (state, action) => action.payload.counter,
  [COUNTER_DECREMENT_OK]: (state, action) => action.payload.counter,
}, 0);
