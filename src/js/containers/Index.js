import React from 'react';

import { Link } from 'react-router';

export default function Index() {
  return (
    <div>
      <h3>Index Page</h3>
      <p>Nothing special, just a link to simulate <Link to="/nonexisting">non-existing route</Link>.</p>
    </div>
  );
}
