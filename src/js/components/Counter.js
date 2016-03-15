import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { increment, decrement } from '../actions/counter';

function Counter({ counter, onIncrement, onDecrement }) {
  return (
    <div>
      Counter: {counter}
      <button onClick={function onIncrementClick() { onIncrement(); }}>Increment</button>
      <button onClick={function onDecrementClick() { onDecrement(); }}>Decrement</button>
    </div>
  );
}

Counter.propTypes = {
  counter: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  counter: state.counter,
});

const mapDispatchToProps = (dispatch) => ({
  onIncrement: () => {dispatch(increment);},
  onDecrement: () => {dispatch(decrement);},
});

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
