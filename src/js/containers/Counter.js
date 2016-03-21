import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { get, increment, decrement, bad } from '../actions/counter';

class Counter extends Component {
  static fetchData({ store }) {
    return store.dispatch(get());
  }

  render() {
    const { counter: { value, isLoading, isError }, dispatch } = this.props;

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
            <button onClick={function onIncrementClick() { dispatch(increment()); }}>
              increment
            </button>
            <button onClick={function onDecrementClick() { dispatch(decrement()); }}>
              decrement
            </button>
            <button onClick={function onDecrementClick() { dispatch(bad()); }}>
              error call
            </button>
          </div>
        }
      </div>
    );
  }
}

Counter.propTypes = {
  counter: PropTypes.shape({
    value: PropTypes.number,
    isLoading: PropTypes.boolean,
    isError: PropTypes.boolean,
  }),
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  counter: state.counter,
});

export default connect(mapStateToProps)(Counter);
