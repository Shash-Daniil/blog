import TemplateCreatePost from '../templateCreatePost/TemplateCreatePost'
import { connect } from 'react-redux'
import { createArticle } from '../../actions/actions'


const CreatePost = props => {

    const defaultValue = {
        tagList: ['']
    }

    const onFormSubmit = (data) => {
        console.log(data)
        props.createArticle(data, props.token)
    }

    return (
        <TemplateCreatePost onFormSubmit={onFormSubmit} title='' text='' description='' defaultValue={defaultValue} formTitle="Create new article"/>
    )
}

const mapStateToProps = (state) => {
    return {
        token: state.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createArticle: (article, token) => dispatch(createArticle(article, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost)