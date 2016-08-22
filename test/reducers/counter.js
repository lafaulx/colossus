import expect from 'expect';
import { Map } from 'immutable';
import expectImmutable from 'expect-immutable';

expect.extend(expectImmutable);

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
} from '../../src/js/actions/counter';
import reducer from '../../src/js/reducers/counter';

describe('Counter reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, Map({}))
    ).toEqualImmutable(Map({
      value: 0,
      isLoading: false,
      isError: false,
    }))
  });

  it('should handle COUNTER_GET', () => {
    expect(
      reducer(Map({
        value: 0,
        isLoading: false,
        isError: false,
      }), {
        type: COUNTER_GET,
      })
    ).toEqualImmutable(Map({
      value: 0,
      isLoading: true,
      isError: false,
    }))
  });

  it('should handle COUNTER_GET_OK', () => {
    expect(
      reducer(Map({
        value: 0,
        isLoading: true,
        isError: false,
      }), {
        type: COUNTER_GET_OK,
        payload: {
          counter: 10
        }
      })
    ).toEqualImmutable(Map({
      value: 10,
      isLoading: false,
      isError: false,
    }));
  });

  it('should handle COUNTER_GET_FAIL', () => {
    expect(
      reducer(Map({
        value: 0,
        isLoading: true,
        isError: false,
      }), {
        type: COUNTER_GET_FAIL,
      })
    ).toEqualImmutable(Map({
      value: 0,
      isLoading: false,
      isError: true,
    }));
  });

  it('should handle COUNTER_INCREMENT', () => {
    expect(
      reducer(Map({
        value: 10,
        isLoading: false,
        isError: false,
      }), {
        type: COUNTER_INCREMENT,
      })
    ).toEqualImmutable(Map({
      value: 10,
      isLoading: true,
      isError: false,
    }))
  });

  it('should handle COUNTER_INCREMENT_OK', () => {
    expect(
      reducer(Map({
        value: 10,
        isLoading: true,
        isError: false,
      }), {
        type: COUNTER_INCREMENT_OK,
        payload: {
          counter: 11
        }
      })
    ).toEqualImmutable(Map({
      value: 11,
      isLoading: false,
      isError: false,
    }));
  });

  it('should handle COUNTER_INCREMENT_FAIL', () => {
    expect(
      reducer(Map({
        value: 0,
        isLoading: true,
        isError: false,
      }), {
        type: COUNTER_INCREMENT_FAIL,
      })
    ).toEqualImmutable(Map({
      value: 0,
      isLoading: false,
      isError: true,
    }));
  });

  it('should handle COUNTER_DECREMENT', () => {
    expect(
      reducer(Map({
        value: 0,
        isLoading: false,
        isError: false,
      }), {
        type: COUNTER_DECREMENT,
      })
    ).toEqualImmutable(Map({
      value: 0,
      isLoading: true,
      isError: false,
    }))
  });

  it('should handle COUNTER_DECREMENT_OK', () => {
    expect(
      reducer(Map({
        value: 10,
        isLoading: true,
        isError: false,
      }), {
        type: COUNTER_DECREMENT_OK,
        payload: {
          counter: 9
        }
      })
    ).toEqualImmutable(Map({
      value: 9,
      isLoading: false,
      isError: false,
    }));
  });

  it('should handle COUNTER_DECREMENT_FAIL', () => {
    expect(
      reducer(Map({
        value: 0,
        isLoading: true,
        isError: false,
      }), {
        type: COUNTER_DECREMENT_FAIL,
      })
    ).toEqualImmutable(Map({
      value: 0,
      isLoading: false,
      isError: true,
    }));
  });
});
