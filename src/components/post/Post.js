import { Link } from 'react-router-dom'
import css from '../../App.module.css';
import avatarImg from '../../img/avatar.png'
import Heart from '../Heart/Heart'
import Tag from '../Tag/Tag'
import { setSlug } from '../../actions/actions';
import { connect } from 'react-redux';

const { post, postMain, mainHeader, postTitle, likes, tags, postDescription,
   postInfo, name, postDate, avatar, dopInfo } = css

const Post = props => {
  const { title, description, slug, setSlug, tagList } = props

  return (
      <article className={post}>
        <div className={postMain}>
          <div className={mainHeader}>
            <Link onClick={() => setSlug(slug)} to={`/article/${slug}`} className={postTitle}>{title}</Link>
            <div className={likes}>
              <Heart liked/>
              12
            </div>
          </div>
          <div className={tags}>
            {tagList ? tagList.map(elem => <Tag tagText={elem}/>) : null}
          </div>
          <div className={postDescription}>{description}</div>
        </div>
        <div className={postInfo}>
          <div className={dopInfo}>
            <div className={name}>John Doe</div>
            <div className={postDate}>March 5, 2020 </div>
          </div>
          <div className={avatar}>
            <img src={avatarImg} alt="avatar" />
          </div>
        </div>
      </article>
    )
}

const mapStateToProps = (state) => ({ state })

const mapDispatchToProps = (dispatch) => ({
  setSlug: (slug) => dispatch(setSlug(slug))
})

export default connect(mapStateToProps, mapDispatchToProps)(Post);