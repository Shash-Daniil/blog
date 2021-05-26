import css from './InputField.module.css'
import Error from '../error/Error'
import { useState } from 'react'

const { inputWrapper, inputTitle, inputField, inputError } = css

const InputField = props => {
    const [error, setError] = useState(props.error)

    return (
        <div className={inputWrapper}>
            <div style={{display: props.text ? 'block' : 'none'}} className={inputTitle}>{props.text}</div>
            <input name={props.name} onChange={props.onChange} className={[inputField, error ? inputError : null].join(' ')} type="text"
                placeholder={!props.placeholder ? props.text : props.placeholder} />
            {error ? <Error text="Wrong pizdec suka blyad"/> : null}
        </div>
    )
}

export default InputField