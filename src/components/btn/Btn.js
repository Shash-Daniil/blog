import React from 'react'
import PropTypes from 'prop-types';
import css from './Btn.module.css'

const {btn, bordered} = css

const Btn = props => {
    const classes = [btn]

    const { onClick, border, text, fontSize, color } = props

    if (border) {
        classes.push(bordered)
    }
        
    return (
        <button type="button" onClick={onClick} style={{fontSize, color, borderColor: color || '#D9D9D9'}}
        className={classes.join(' ')}>{text}</button>
    )
}

Btn.propTypes = {
    onClick: PropTypes.func.isRequired,
    border: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    fontSize: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
}

export default Btn