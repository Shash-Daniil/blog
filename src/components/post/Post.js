import { Link } from 'react-router-dom'
import css from '../../App.module.css';
import Heart from '../Heart/Heart'
import Tag from '../Tag/Tag'
import { setSlug } from '../../actions/actions';
import { connect } from 'react-redux';
import { Avatar } from 'antd';
import format from 'date-fns/format'

const { post, postMain, mainHeader, postTitle, likes, tags, postContentText,
   postInfo, name, postDate, avatar, dopInfo } = css

const Post = props => {
  const { title, description, slug, setSlug, tagList, favorited, favoritesCount, author, createdAt } = props

  return (
      <article className={post}>
        <div className={postMain}>
          <div className={mainHeader}>
            <Link onClick={() => setSlug(slug)} to={`/article/${slug}`} className={postTitle}>
              {title}
            </Link>
            <div className={likes}>
              <Heart liked={favorited}/>
              <div>{favoritesCount}</div>
            </div>
          </div>
          <div className={tags}>
            {tagList ? tagList.map(elem => <Tag tagText={elem}/>) : null}
          </div>
          <div className={postContentText}>{description}</div>
        </div>
        <div className={postInfo}>
            <div className={dopInfo}>
                <div className={name}>{author.username}</div>
                <div className={postDate}>{format(new Date(createdAt), "MMMM dd, yyyy")}</div>
            </div>
            <div className={avatar}>
                <Avatar size={46} icon={<img src={author.image} alt="avatar" />} />
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