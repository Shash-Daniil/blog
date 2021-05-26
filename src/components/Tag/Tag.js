import css from './Tag.module.css'

const { tag } = css

const Tag = props => {
    const { tagText } = props

    return (
        <span className={tag}>{tagText}</span>
    )
}

export default Tag