import React, { PropTypes } from 'react';

function Counter({ increment, decrement, value, isLoading, isError }) {
  return (
    <div>
      {isLoading &&
        <h3>Counter is loading</h3>
      }

      {!isLoading && !isError &&
        <h3>Counter: <strong>{value}</strong></h3>
      }

      {isError &&
        <h3>An error occured – reload the page and try again</h3>
      }

      {!isLoading && !isError &&
        <div>
          <button onClick={increment}>
            increment
          </button>
          <button onClick={decrement}>
            decrement
          </button>
        </div>
      }
    </div>
  );
}

Counter.propTypes = {
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
};

export default Counter;
