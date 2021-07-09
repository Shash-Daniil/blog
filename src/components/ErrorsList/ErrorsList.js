import React from 'react';
import { Alert } from 'antd';
import PropTypes from 'prop-types';
import css from './ErrorsList.module.css';

const { errorsContainer } = css;

const ErrorsList = (props) => {
  const { errors, closeErrors } = props;

  return (
    <div className={errorsContainer}>
      {errors
        ? Object.keys(errors).map((elem) => (
            <Alert
              message={elem}
              closable
              afterClose={closeErrors}
              description={errors[elem][0]}
              type="error"
              showIcon
            />
          ))
        : null}
    </div>
  );
};

ErrorsList.propTypes = {
  errors: PropTypes.instanceOf(Object),
  closeErrors: PropTypes.func.isRequired,
};

ErrorsList.defaultProps = {
  errors: null,
};

export default ErrorsList;
