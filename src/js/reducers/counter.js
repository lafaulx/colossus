import {
  COUNTER_GET,
  COUNTER_INCREMENT,
  COUNTER_DECREMENT,
} from '../actions/counter';

import { handleActions } from 'redux-actions';

export default handleActions({
  [COUNTER_GET]: (state, action) => action.payload,
  [COUNTER_INCREMENT]: (state, action) => action.payload,
  [COUNTER_DECREMENT]: (state, action) => action.payload,
}, 0);
