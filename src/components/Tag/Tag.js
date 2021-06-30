import React from 'react'
import PropTypes from 'prop-types';
import css from './Tag.module.css'

const { tag } = css

const Tag = props => {
    const { tagText } = props

    return (
        <span className={tag}>{tagText}</span>
    )
}

Tag.propTypes = {
    tagText: PropTypes.string.isRequired
}

export default Tag