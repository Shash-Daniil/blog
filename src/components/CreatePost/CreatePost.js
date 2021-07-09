import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import TemplateCreatePost from '../TemplateCreatePost/TemplateCreatePost';
import { createArticle } from '../../redux/actions/actions';
import Routes from '../../Routes';

const CreatePost = (props) => {
  const defaultValue = {
    tagList: [{ value: '' }],
  };

  const { createArticle } = props;

  const history = useHistory();

  const onFormSubmit = (data) => {
    const post = { ...data };
    post.tagList = data.tagList.map((elem) => elem.value);
    createArticle(post);
    history.push(Routes.HOME_PAGE);
  };

  return <TemplateCreatePost onFormSubmit={onFormSubmit} defaultValue={defaultValue} formTitle="Create new article" />;
};

CreatePost.propTypes = {
  createArticle: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  createArticle: (article) => dispatch(createArticle(article)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);
