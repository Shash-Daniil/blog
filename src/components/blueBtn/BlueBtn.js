import css from './BlueBtn.module.css'

const {blueBtn} = css

const BlueBtn = props => {
    return (
        <input className={blueBtn} type="submit" value={props.text}/>
    )
}

export default BlueBtn