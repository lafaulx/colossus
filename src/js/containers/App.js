import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import radium from 'radium';

import { Link } from 'react-router';

const WLink = radium(Link);

const styles = {
  link: {
    base: {
      display: 'inline-block',
      marginRight: '10px',
    },
    last: {
      marginRight: 0,
    },
    active: {
      color: 'red',
    },
  },
};

function App({ children, location }, { router: { isActive } }) {
  const { link: { base, last, active } } = styles;

  return (
    <div>
      <h1>Colossus</h1>
      <nav>
        <WLink to="/" style={[base, isActive('/', true) ? active : undefined]}>Index</WLink>
        <WLink to="/counter" style={[base, last, isActive('/counter') ? active : undefined]}>
          Counter
        </WLink>
      </nav>

      {children}
    </div>
  );
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  routing: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

App.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  routing: state.routing,
});

export default connect(mapStateToProps)(radium(App));
