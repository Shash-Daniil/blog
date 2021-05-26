import css from './Error.module.css';

const { errorText } = css

const Error = props => {
    return (
        <div className={errorText}>{props.text}</div>
    )
}

export default Error