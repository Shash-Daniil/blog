import React from 'react'
import PropTypes from 'prop-types';
import Error from '../error/Error'
import css from './InputField.module.css'

const { inputWrapper, inputTitle, inputField, inputError } = css

const InputField = props => {

    const { name, error, type, placeholder, text, register, defaultValue, value } = props
    
    return (
        <div className={inputWrapper}>
            <div style={{display: text ? 'block' : 'none'}} className={inputTitle}>{text}</div>
            <input 
                name={name}
                className={[inputField, error ? inputError : null].join(' ')} 
                type={type ? type : "text"}
                placeholder={!placeholder ? text : placeholder}
                value={value}
                defaultValue={defaultValue}
                {...register} />
            {error ? <Error text={error.message}/> : null}
        </div>
    )
}

InputField.propTypes = {
    error: PropTypes.instanceOf(Object).isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    register: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    defaultValue: PropTypes.string.isRequired
}

export default InputField