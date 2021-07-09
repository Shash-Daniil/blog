import React from 'react';
import PropTypes from 'prop-types';
import Error from '../Error/Error';
import css from './InputField.module.css';

const { inputWrapper, inputTitle, inputField, inputError } = css;

const InputField = (props) => {
  const { name, error, type, placeholder, text, register, defaultValue, value } = props;

  return (
    <div className={inputWrapper}>
      <div style={{ display: text ? 'block' : 'none' }} className={inputTitle}>
        {text}
      </div>
      <input
        name={name}
        className={[inputField, error ? inputError : null].join(' ')}
        type={type}
        placeholder={!placeholder ? text : placeholder}
        value={value}
        defaultValue={defaultValue}
        {...register}
      />
      {error ? <Error text={error.message} /> : null}
    </div>
  );
};

InputField.propTypes = {
  error: PropTypes.instanceOf(Object),
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  text: PropTypes.string,
  register: PropTypes.instanceOf(Object),
  value: PropTypes.string,
  defaultValue: PropTypes.string,
};

InputField.defaultProps = {
  error: null,
  name: '',
  type: '',
  placeholder: '',
  text: '',
  register: {},
  value: undefined,
  defaultValue: '',
};

export default InputField;
