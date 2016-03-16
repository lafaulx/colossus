import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { get, increment, decrement } from '../actions/counter';

class Counter extends Component {
  static fetchData({ store }) {
    return store.dispatch(get());
  }

  componentDidMount() {
    this.props.dispatch(get());
  }

  render() {
    const { counter, dispatch } = this.props;

    return (
      <div>
        Counter: {counter}
        <button onClick={function onIncrementClick() { dispatch(increment()); }}>Increment</button>
        <button onClick={function onDecrementClick() { dispatch(decrement()); }}>Decrement</button>
      </div>
    );
  }
}

Counter.propTypes = {
  counter: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  counter: state.counter,
});

export default connect(mapStateToProps)(Counter);
