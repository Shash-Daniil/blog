import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import { Spin, Avatar, Popconfirm } from 'antd';
import ReactMarkdown from 'react-markdown';
import Heart from '../Heart/Heart';
import Tag from '../Tag/Tag';
import Btn from '../Btn/Btn';
import { getOpenedArticle, deleteArticle, likePost, unlikePost } from '../../redux/actions/actions';
import Routes from '../../Routes';
import css from './SinglePost.module.css';

const {
  post,
  postOpened,
  postInfoHeader,
  postTitle,
  likes,
  tags,
  name,
  postDate,
  avatar,
  dopInfo,
  postDescription,
  userInfo,
  postInfo,
  postInfo1,
  postInfo2,
  postBody,
  postActions,
} = css;

const OpenedPost = (props) => {
  const { slug, getOpenedArticle, article, deleteArticle, user, loading, logged, likePost, unlikePost, articles } =
    props;

  const { title, description, body, tagList, favorited, favoritesCount, author, createdAt } = article;

  const history = useHistory();

  const confirm = () => {
    deleteArticle(slug);
    history.push(Routes.HOME_PAGE);
  };

  const onHeartClick = () => {
    if (logged) {
      if (favorited) {
        unlikePost(slug);
      } else {
        likePost(slug);
      }
    } else {
      alert('u need to log in');
    }
  };

  useEffect(() => {
    getOpenedArticle(slug);
  }, [articles]);

  if (JSON.stringify(article).length === 2 || loading) {
    return <Spin />;
  }

  return (
    <article className={[post, postOpened].join(' ')}>
      <div className={postInfo}>
        <div className={postInfo1}>
          <div className={postInfoHeader}>
            <div className={postTitle}>{title}</div>
            <div className={likes}>
              <Heart onClick={onHeartClick} liked={favorited} />
              <div>{favoritesCount}</div>
            </div>
          </div>
          <div className={tags}>{tagList ? tagList.map((elem) => <Tag tagText={elem} />) : null}</div>
          <div className={postDescription}>{description}</div>
        </div>
        <div className={postInfo2}>
          <div className={userInfo}>
            <div className={dopInfo}>
              <div className={name}>{author.username}</div>
              <div className={postDate}>{format(new Date(createdAt), 'MMMM dd, yyyy')}</div>
            </div>
            <div className={avatar}>
              <Avatar size={46} icon={<img src={author.image} alt="avatar" />} />
            </div>
          </div>
          {author.username === user.username ? (
            <div className={postActions}>
              <Popconfirm title="Are you sure to delete this article?" onConfirm={confirm} okText="Yes" cancelText="No">
                <Btn text="Delete" color="red" border fontSize="14px" />
              </Popconfirm>
              <Link to={`${Routes.EDIT_ARTICLE_PAGE}/${slug}`}>
                <Btn text="Edit" color="#52C41A" border fontSize="14px" />
              </Link>
            </div>
          ) : null}
        </div>
      </div>
      <div className={postBody}>
        <ReactMarkdown>{body}</ReactMarkdown>
      </div>
    </article>
  );
};

OpenedPost.propTypes = {
  slug: PropTypes.string.isRequired,
  getOpenedArticle: PropTypes.func.isRequired,
  article: PropTypes.instanceOf(Object),
  articles: PropTypes.instanceOf(Object).isRequired,
  deleteArticle: PropTypes.func.isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
  loading: PropTypes.bool.isRequired,
  logged: PropTypes.bool.isRequired,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
};

OpenedPost.defaultProps = {
  article: {},
};

const mapStateToProps = (state) => ({
  slug: state.articlesReducer.slug,
  article: state.articlesReducer.article,
  articles: state.articlesReducer.articles,
  user: state.userReducer.user,
  loading: state.reducer.loading,
  logged: state.userReducer.logged,
});

const mapDispatchToProps = (dispatch) => ({
  getOpenedArticle: (slug) => dispatch(getOpenedArticle(slug)),
  deleteArticle: (slug, token) => dispatch(deleteArticle(slug, token)),
  likePost: (slug) => dispatch(likePost(slug)),
  unlikePost: (slug) => dispatch(unlikePost(slug)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OpenedPost);
