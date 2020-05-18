import React from 'react';
import PropTypes from 'prop-types';
 
function Alert(props) {
  const {text, kind} = props;

  if (text) {
    return (
      <div className={'alert alert-' + kind} 
           role="alert">
        {text}
      </div>
    );
  } else {
    return null;
  }
}

Alert.defaultProps = {
  kind: 'primary'
}

Alert.propTypes = {
  text: PropTypes.string,
  kind: PropTypes.string 
}

export default Alert;