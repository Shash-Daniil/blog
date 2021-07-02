import PropTypes from 'prop-types';
import React from 'react';
import css from './Heart.module.css';

const { heart } = css;

const Heart = (props) => {
  const { liked, onClick } = props;

  return (
    <div>
      <svg onClick={onClick} className={heart}>
        <use xlinkHref={liked ? '#heart-red' : '#heart'} />
      </svg>
    </div>
  );
};

Heart.propTypes = {
  liked: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Heart;
