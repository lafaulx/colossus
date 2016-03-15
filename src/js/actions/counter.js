import CounterAPI from '../api/CounterAPI';
import { createAction } from 'redux-actions';

export const COUNTER_GET = 'COUNTER_GET';
export const COUNTER_INCREMENT = 'COUNTER_INCREMENT';
export const COUNTER_DECREMENT = 'COUNTER_DECREMENT';

/*
 * action creators
 */
export const get = createAction(COUNTER_GET, CounterAPI.get);
export const increment = createAction(COUNTER_INCREMENT, CounterAPI.increment);
export const decrement = createAction(COUNTER_DECREMENT, CounterAPI.decrement);
