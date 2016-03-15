import React, { PropTypes } from 'react';

import { Link, IndexLink } from 'react-router';

export default function App(props) {
  return (
    <div>
      <h1>Colossus</h1>
      <ul role="nav">
        <li><IndexLink to="/" activeClassName="active">Index</IndexLink></li>
        <li><Link to="/counter" activeClassName="active">Counter</Link></li>
      </ul>

      {props.children}
    </div>
  );
}

App.propTypes = {
  children: PropTypes.object,
};
