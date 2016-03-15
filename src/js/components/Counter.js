import React, { PropTypes } from 'react';
require('isomorphic-fetch');

class Counter extends React.Component {
  static loadProps(params, cb) {
    fetch('http://localhost:3000/api/counter')
    .then((response) => response.json())
    .then((counter) => {
      cb(null, {
        counter,
      });
    });
  }

  render() {
    const { counter } = this.props;
    return (
      <div>
        Counter: {counter}
      </div>
    );
  }
}

Counter.propTypes = {
  counter: PropTypes.number.isRequired,
};

export default Counter;
