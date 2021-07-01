import React from 'react';
import PropTypes from 'prop-types';
import css from './Error.module.css';

const { errorText } = css;

const Error = (props) => {
  const { text } = props;

  return <div className={errorText}>{text}</div>;
};

Error.propTypes = {
  text: PropTypes.string,
};

Error.defaultProps = {
  text: 'Error',
};

export default Error;
