import React from 'react';

import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';

export default function IndexPage() {
  return (
    <DocumentTitle title="Colossus – Index">
      <div>
        <h3>Index Page</h3>
        <p>
          Nothing special, just a link to simulate
          <Link to="/nonexisting">non-existing route</Link>.
        </p>
      </div>
    </DocumentTitle>
  );
}
