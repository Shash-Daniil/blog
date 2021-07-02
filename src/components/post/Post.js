import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Avatar } from 'antd';
import { uniqueId } from 'lodash';
import format from 'date-fns/format';
import Heart from '../Heart/Heart';
import Tag from '../Tag/Tag';
import { setSlug, likePost, unlikePost } from '../../redux/actions/actions';
import css from './Post.module.css';

const {
  post,
  postMain,
  mainHeader,
  postTitle,
  likes,
  tags,
  postContentText,
  postInfo,
  name,
  postDate,
  avatar,
  dopInfo,
} = css;

const Post = (props) => {
  const { article, setSlug, likePost, unlikePost, logged } = props;

  const { title, description, slug, tagList, favorited, favoritesCount, author, createdAt } = article;

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

  return (
    <article className={post}>
      <div className={postMain}>
        <div className={mainHeader}>
          <Link onClick={() => setSlug(slug)} to={`/article/${slug}`} className={postTitle}>
            {title}
          </Link>
          <div className={likes}>
            <Heart onClick={onHeartClick} liked={favorited} />
            <div>{favoritesCount}</div>
          </div>
        </div>
        <div className={tags}>
          {tagList ? tagList.map((elem) => <Tag key={uniqueId('id')} tagText={elem} />) : null}
        </div>
        <div className={postContentText}>{description}</div>
      </div>
      <div className={postInfo}>
        <div className={dopInfo}>
          <div className={name}>{author.username}</div>
          <div className={postDate}>{format(new Date(createdAt), 'MMMM dd, yyyy')}</div>
        </div>
        <div className={avatar}>
          <Avatar size={46} icon={<img src={author.image} alt="avatar" />} />
        </div>
      </div>
    </article>
  );
};

Post.propTypes = {
  article: PropTypes.instanceOf(Object).isRequired,
  setSlug: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
  logged: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  logged: state.userReducer.logged,
});

const mapDispatchToProps = (dispatch) => ({
  setSlug: (slug) => dispatch(setSlug(slug)),
  likePost: (slug) => dispatch(likePost(slug)),
  unlikePost: (slug) => dispatch(unlikePost(slug)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
