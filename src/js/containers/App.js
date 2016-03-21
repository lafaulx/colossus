import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { Link, IndexLink } from 'react-router';

function App({ children }) {
  return (
    <div>
      <h1>Colossus</h1>
      <nav>
        <IndexLink to="/" activeClassName="active">Index</IndexLink>
        <Link to="/counter" activeClassName="active">Counter</Link>
      </nav>

      {children}
    </div>
  );
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  routing: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  routing: state.routing,
});

export default connect(mapStateToProps)(App);
