import React, { PropTypes } from 'react';

import { Link, IndexLink } from 'react-router';

export default function App(props) {
  return (
    <div>
      <h1>Colossus</h1>
      <nav>
        <IndexLink to="/" activeClassName="active">Index</IndexLink>
        <Link to="/counter" activeClassName="active">Counter</Link>
      </nav>

      {props.children}
    </div>
  );
}

App.propTypes = {
  children: PropTypes.object,
};
