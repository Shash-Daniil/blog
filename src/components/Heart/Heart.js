import css from './Heart.module.css'

const { heart } = css

const Heart = props => {
    const { liked } = props

    return (
        <div>
            <svg className={heart}>
                <use xlinkHref={liked ? "#heart-red" : "#heart"}></use>
            </svg>
        </div>
    )
}

export default Heart