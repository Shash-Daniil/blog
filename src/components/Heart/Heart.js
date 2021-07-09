import PropTypes from 'prop-types';
import React from 'react';
import heartImg from '../../img/heartImg.svg';
import redHeartImg from '../../img/redHeartImg.svg';

import css from './Heart.module.css';

/* eslint-disable */

const { heart } = css;

const Heart = (props) => {
  // const { liked, onClick } = props;

  // <svg onClick={onClick} className={heart}>
  // <use xlinkHref={liked ? '#heart-red' : '#heart'} />
  // </svg>

  const { liked, onClick } = props;

  return (
    <div onClick={onClick}>
      <img className={heart} src={liked ? redHeartImg : heartImg} />
    </div>
  );
};

Heart.propTypes = {
  liked: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Heart;
