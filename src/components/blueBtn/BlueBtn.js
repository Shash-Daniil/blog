import React from 'react';
import PropTypes from 'prop-types';
import css from './BlueBtn.module.css';

const { blueBtn } = css;

const BlueBtn = (props) => {
  const { text } = props;

  return <input className={blueBtn} type="submit" value={text} />;
};

BlueBtn.propTypes = {
  text: PropTypes.string.isRequired,
};

export default BlueBtn;
