import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import { editArticle } from '../../redux/actions/actions';
import TemplateCreatePost from '../TemplateCreatePost/TemplateCreatePost';
import Routes from '../../Routes';

const EditPost = (props) => {
  const { article, editArticle } = props;

  const { title, body, tagList, description, slug } = article;

  const tags = tagList ? tagList.map((elem) => ({ value: elem })) : [{ value: '' }];

  const defaultValue = {
    tagList: tags,
  };

  const history = useHistory();

  const onFormSubmit = (data) => {
    const post = { ...data };
    post.tagList = data.tagList.map((elem) => elem.value);
    editArticle(slug, post);
    history.push(Routes.HOME_PAGE);
  };

  return (
    <TemplateCreatePost
      onFormSubmit={onFormSubmit}
      title={title}
      text={body}
      description={description}
      defaultValue={defaultValue}
      formTitle="Edit article"
    />
  );
};

EditPost.propTypes = {
  article: PropTypes.instanceOf(Object).isRequired,
  editArticle: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  article: state.articlesReducer.article,
});

const mapDispatchToProps = (dispatch) => ({
  editArticle: (slug, article) => dispatch(editArticle(slug, article)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);
