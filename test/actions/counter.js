import configureMockStore from 'redux-mock-store';
import { apiMiddleware } from 'redux-api-middleware';
import immutable from 'immutable';
import nock from 'nock';
import expect from 'expect';
import {
  COUNTER_GET,
  COUNTER_GET_OK,

  COUNTER_INCREMENT,
  COUNTER_INCREMENT_OK,

  COUNTER_DECREMENT,
  COUNTER_DECREMENT_OK,

  get,
  increment,
  decrement
} from '../../src/js/actions/counter';

const middlewares = [apiMiddleware];
const mockStore = configureMockStore(middlewares);

describe('Counter actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates COUNTER_GET_OK when fetching counter has been done', () => {
    nock('http://localhost:3000')
      .get('/api/counter')
      .reply(200, {
        counter: 0
      });

    const expectedActions = [{
      type: COUNTER_GET,
      meta: undefined,
      payload: undefined
    }, {
      type: COUNTER_GET_OK,
      meta: undefined,
      payload: {
        counter: 0
      }
    }];

    const store = mockStore({
      counter: immutable.Map()
    });

    return store.dispatch(get())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      });
  });

  it('creates COUNTER_INCREMENT_OK when fetching counter has been done', () => {
    nock('http://localhost:3000')
      .get('/api/counter/increment')
      .reply(200, {
        counter: 1
      });

    const expectedActions = [{
      type: COUNTER_INCREMENT,
      meta: undefined,
      payload: undefined
    }, {
      type: COUNTER_INCREMENT_OK,
      meta: undefined,
      payload: {
        counter: 1
      }
    }];

    const store = mockStore({
      counter: immutable.Map()
    });

    return store.dispatch(increment())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      });
  });

  it('creates COUNTER_DECREMENT_OK when fetching counter has been done', () => {
    nock('http://localhost:3000')
      .get('/api/counter/decrement')
      .reply(200, {
        counter: -1
      });

    const expectedActions = [{
      type: COUNTER_DECREMENT,
      meta: undefined,
      payload: undefined
    }, {
      type: COUNTER_DECREMENT_OK,
      meta: undefined,
      payload: {
        counter: -1
      }
    }];

    const store = mockStore({
      counter: immutable.Map()
    });

    return store.dispatch(decrement())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      });
  });
});
