import React from 'react';
import PropTypes from 'prop-types';
import InputField from '../inputField/InputField';
import Btn from '../btn/Btn';
import css from './TagInput.module.css';

const { byda, container } = css;

const TagInput = (props) => {
  const { register, value, append, remove, aloneTag, last } = props;

  return (
    <div className={byda}>
      <div className={container}>
        <InputField defaultValue={value} placeholder="tag" register={register} />
      </div>
      {aloneTag ? null : <Btn onClick={remove} text="Delete" color="red" border fontSize="16px" />}
      {last ? <Btn onClick={append} text="Add tag" color="#1890FF" border fontSize="16px" /> : null}
    </div>
  );
};

TagInput.propTypes = {
  register: PropTypes.instanceOf(Object).isRequired,
  value: PropTypes.string.isRequired,
  append: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  aloneTag: PropTypes.bool.isRequired,
  last: PropTypes.bool.isRequired,
};

export default TagInput;
