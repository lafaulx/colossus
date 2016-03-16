import prepareURL from '../utils/prepareURL';
import fetch from 'isomorphic-fetch';

export default {
  get: () => fetch(prepareURL('/api/counter')).then((response) => response.json()),
  increment: () => fetch(prepareURL('/api/counter/increment')).then((response) => response.json()),
  decrement: () => fetch(prepareURL('/api/counter/decrement')).then((response) => response.json()),
};
