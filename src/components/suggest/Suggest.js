import css from './Suggest.module.css'
import { Link } from 'react-router-dom'

const {suggest, suggestText, suggestLink} = css

const Suggest = props => {
    return (
        <div className={suggest}>
            <span className={suggestText}>{props.text} <Link to={props.link} className={suggestLink}>{props.linkText}</Link>.</span>
        </div>
    )
}

export default Suggest