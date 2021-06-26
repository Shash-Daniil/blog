import css from './InputField.module.css'
import Error from '../error/Error'

const { inputWrapper, inputTitle, inputField, inputError } = css

const InputField = props => {

    const { name, error, type, placeholder, text, register, rows } = props
    
    return (
        <div className={inputWrapper}>
            <div style={{display: text ? 'block' : 'none'}} className={inputTitle}>{text}</div>
            <input 
                name={name}
                className={[inputField, error ? inputError : null].join(' ')} 
                type={type ? type : "text"}
                placeholder={!placeholder ? text : placeholder}
                value={props.value}
                defaultValue={props.defaultValue}
                {...register} />
            {error ? <Error text={error.message}/> : null}
        </div>
    )
}

export default InputField