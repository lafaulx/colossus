import React, { PropTypes } from 'react';
import radium from 'radium';

function RadiumWrapper({ children }) {
  return (
    <div>
      {children}
    </div>
  );
}

RadiumWrapper.propTypes = {
  children: PropTypes.object.isRequired,
};

export default radium(RadiumWrapper);
