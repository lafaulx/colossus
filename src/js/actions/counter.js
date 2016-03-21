import { CALL_API } from 'redux-api-middleware';

import prepareURL from '../utils/prepareURL';

export const COUNTER_GET = 'COUNTER_GET';
export const COUNTER_GET_OK = 'COUNTER_GET_OK';
export const COUNTER_GET_FAIL = 'COUNTER_GET_FAIL';

export const COUNTER_INCREMENT = 'COUNTER_INCREMENT';
export const COUNTER_INCREMENT_OK = 'COUNTER_INCREMENT_OK';
export const COUNTER_INCREMENT_FAIL = 'COUNTER_INCREMENT_FAIL';

export const COUNTER_DECREMENT = 'COUNTER_DECREMENT';
export const COUNTER_DECREMENT_OK = 'COUNTER_DECREMENT_OK';
export const COUNTER_DECREMENT_FAIL = 'COUNTER_DECREMENT_FAIL';

export const COUNTER_BAD = 'COUNTER_BAD';
export const COUNTER_BAD_OK = 'COUNTER_BAD_OK';
export const COUNTER_BAD_FAIL = 'COUNTER_BAD_FAIL';

/*
 * action creators
 */
export const get = () => ({
  [CALL_API]: {
    endpoint: prepareURL('/api/counter'),
    method: 'GET',
    types: [COUNTER_GET, COUNTER_GET_OK, COUNTER_GET_FAIL],
  },
});
export const increment = () => ({
  [CALL_API]: {
    endpoint: prepareURL('/api/counter/increment'),
    method: 'GET',
    types: [COUNTER_INCREMENT, COUNTER_INCREMENT_OK, COUNTER_INCREMENT_FAIL],
  },
});
export const decrement = () => ({
  [CALL_API]: {
    endpoint: prepareURL('/api/counter/decrement'),
    method: 'GET',
    types: [COUNTER_DECREMENT, COUNTER_DECREMENT_OK, COUNTER_DECREMENT_FAIL],
  },
});
export const bad = () => ({
  [CALL_API]: {
    endpoint: prepareURL('/api/counter/bad'),
    method: 'GET',
    types: [COUNTER_BAD, COUNTER_BAD_OK, COUNTER_BAD_FAIL],
  },
});
