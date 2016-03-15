import {
  COUNTER_GET,
  COUNTER_INCREMENT,
  COUNTER_DECREMENT,
} from '../actions/counter';

export default function counter(state = 0, action) {
  switch (action.type) {
    case COUNTER_GET:
      return action.data;
    case COUNTER_INCREMENT:
      return action.data;
    case COUNTER_DECREMENT:
      return action.data;
    default:
      return state;
  }
}
