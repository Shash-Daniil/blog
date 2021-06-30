import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types';
import TemplateCreatePost from '../templateCreatePost/TemplateCreatePost'
import { createArticle } from '../../actions/actions'


const CreatePost = props => {

    const defaultValue = {
        tagList: [{value: ''}]
    }

    const { createArticle } = props

    const history = useHistory()

    const onFormSubmit = (data) => {
        const user = {...data}
        user.tagList = data.tagList.map(elem => elem.value)
        createArticle(user)
        history.push('/')
    }

    return (
        <TemplateCreatePost onFormSubmit={onFormSubmit} title='' text='' description='' defaultValue={defaultValue} formTitle="Create new article"/>
    )
}

CreatePost.propTypes = {
    createArticle: PropTypes.func.isRequired
}

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch) => ({
        createArticle: (article) => dispatch(createArticle(article))
    })

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost)