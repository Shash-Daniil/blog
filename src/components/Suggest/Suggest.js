import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import css from './Suggest.module.css';

const { suggest, suggestText, suggestLink } = css;

const Suggest = (props) => {
  const { text, link, linkText } = props;

  return (
    <div className={suggest}>
      <span className={suggestText}>
        {text}{' '}
        <Link to={link} className={suggestLink}>
          {linkText}
        </Link>
        .
      </span>
    </div>
  );
};

Suggest.propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
};

export default Suggest;
