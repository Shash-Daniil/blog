import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import Post from '../Post/Post';
import css from './Posts.module.css';

const Posts = (props) => {
  const { articles, loading } = props;

  const { articleList } = css;

  const articlesList = articles.map((article) => <Post article={article} key={article.slug} />);

  return <div className={articleList}>{loading ? <Spin /> : articlesList}</div>;
};

Posts.propTypes = {
  articles: PropTypes.instanceOf(Object).isRequired,
  loading: PropTypes.bool,
};

Posts.defaultProps = {
  loading: false,
};

const mapStateToProps = (state) => ({
  articles: state.articlesReducer.articles,
  loading: state.reducer.loading,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
