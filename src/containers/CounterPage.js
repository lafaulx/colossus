import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';

import { get, increment, decrement } from '../actions/counter';
import Counter from '../components/Counter';

function CounterPage({ counter, dispatch }) {
  const boundActionCreators = bindActionCreators({
    increment,
    decrement,
  }, dispatch);

  return (
    <DocumentTitle title="Colossus – Counter">
      <Counter
        value={counter.get('value')}
        isLoading={counter.get('isLoading')}
        isError={counter.get('isError')}
        {...boundActionCreators}
      />
    </DocumentTitle>
  );
}

CounterPage.propTypes = {
  counter: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

CounterPage.fetchData = function({ store }) {
  return store.dispatch(get());
}

const mapStateToProps = (state) => ({
  counter: state.counter,
});

export default connect(mapStateToProps)(CounterPage);
