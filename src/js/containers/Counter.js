import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { get, increment, decrement, bad } from '../actions/counter';
import DocumentTitle from 'react-document-title';

class Counter extends Component {
  static fetchData({ store }) {
    return store.dispatch(get());
  }

  render() {
    const { counter, dispatch } = this.props;
    const { value, isLoading, isError } = counter.toJS();

    return (
      <DocumentTitle title="Colossus – Counter">
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
      </DocumentTitle>
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
