import React from 'react';
import PropTypes from 'prop-types';
import css from './SubmitBtn.module.css';

const { blueBtn } = css;

const BlueBtn = (props) => {
  const { text } = props;

  return (
    <button className={blueBtn} type="submit">
      {text}
    </button>
  );
};

BlueBtn.propTypes = {
  text: PropTypes.string.isRequired,
};

export default BlueBtn;
