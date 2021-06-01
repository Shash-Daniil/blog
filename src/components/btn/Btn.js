import css from './Btn.module.css'

const {btn, bordered} = css

const Btn = props => {
    const classes = [btn]

    if (props.border)
        classes.push(bordered)
    
    return (
        <button onClick={props.onClick} style={{fontSize: props.fontSize, color: props.color, borderColor: props.color || '#D9D9D9'}}
        className={classes.join(' ')}>{props.text}</button>
    )
}

export default Btn