import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import Post from '../post/Post';

const Posts = (props) => {
  const { articles, loading } = props;

  const articlesList = articles.map((article) => <Post article={article} key={article.slug} />);

  return <div>{loading ? <Spin /> : articlesList}</div>;
};

Posts.propTypes = {
  articles: PropTypes.instanceOf(Object).isRequired,
  loading: PropTypes.bool,
};

Posts.defaultProps = {
  loading: false,
};

const mapStateToProps = (state) => ({
  articles: state.articles,
  loading: state.loading,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
