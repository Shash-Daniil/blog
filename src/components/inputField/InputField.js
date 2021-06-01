import css from './InputField.module.css'
import Error from '../error/Error'

const { inputWrapper, inputTitle, inputField, inputError } = css

const InputField = props => {

    const { name, onChange, error, type, placeholder, text, register } = props
    
    return (
        <div className={inputWrapper}>
            <div style={{display: text ? 'block' : 'none'}} className={inputTitle}>{text}</div>
            <input 
                name={name}
                onChange={onChange} 
                className={[inputField, error ? inputError : null].join(' ')} 
                type={type ? type : "text"}
                placeholder={!placeholder ? text : placeholder}
                {...register} />
            {error ? <Error text={error.message}/> : null}
        </div>
    )
}

export default InputField