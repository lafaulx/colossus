import React, { PropTypes } from 'react';

export default function CriticalError({ message }) {
  return (
    <div>
      <h3>Critical error has occured: {message}</h3>
    </div>
  );
}

CriticalError.propTypes = {
  message: PropTypes.string,
};
