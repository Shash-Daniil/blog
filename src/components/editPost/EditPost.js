import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import React from 'react'
import PropTypes from 'prop-types';
import { editArticle, getArticles } from '../../actions/actions'
import TemplateCreatePost from '../templateCreatePost/TemplateCreatePost'

const EditPost = props => {
    const { article, getArticles, editArticle } = props

    const { title, body, tagList, description, slug } = article

    const tags = tagList ? tagList.map(elem => ({value: elem})) : [{value: ''}]

    const defaultValue = {
        tagList: tags
    }

    const history = useHistory()

    const onFormSubmit = (data) => {
        const post = {...data}
        post.tagList = data.tagList.map(elem => elem.value)
        editArticle(slug, data)
        history.push('/')
    }

    return (
        <TemplateCreatePost onFormSubmit={onFormSubmit} title={title} text={body} description={description} defaultValue={defaultValue} formTitle="Edit article"/>
    )
}

EditPost.propTypes = {
    article: PropTypes.instanceOf(Object).isRequired,
    editArticle: PropTypes.func.isRequired,
    getArticles: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    article: state.article
})

const mapDispatchToProps = (dispatch) => ({
    editArticle: (slug, article) => dispatch(editArticle(slug, article)),
    getArticles: (offset) => dispatch(getArticles(offset))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);
