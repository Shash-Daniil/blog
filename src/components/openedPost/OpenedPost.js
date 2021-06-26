import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown'
import css from '../../App.module.css';
import Heart from '../Heart/Heart'
import Tag from '../Tag/Tag'
import Btn from '../btn/Btn'
import { getOpenedArticle, receiveOpenedArticle, deleteArticle } from '../../actions/actions';
import { connect } from 'react-redux';
import { Avatar, Popconfirm } from 'antd';
import format from 'date-fns/format'

const { post, post_opened, postMain, postInfoHeader, postTitle, likes, tags, postContentText, 
    name, postDate, avatar, dopInfo, postDescription, userInfo, postInfo, postInfo1, postInfo2, postBody, postActions } = css

const OpenedPost = props => {
    const { slug, getOpenedArticle, article = {}, receiveOpenedArticle, token, deleteArticle, user } = props

    const confirm = () => {
        deleteArticle(slug, token)
        console.log('deleted')
    }

    useEffect(() => {
        getOpenedArticle(slug)
        return () => {
            receiveOpenedArticle({})
        }
    }, [slug])

    if (JSON.stringify(article).length === 2)
        return <div>loading</div>

    const { title, description, body, tagList, favorited, favoritesCount, author, createdAt } = article

    return (
        <article className={[post, post_opened].join(" ")}>
            <div className={postInfo}>
                <div className={postInfo1}>
                    <div className={postInfoHeader}>
                        <div className={postTitle}>{title}</div>
                        <div className={likes}>
                            <Heart liked={favorited}/>
                            <div>{favoritesCount}</div>
                        </div>
                    </div>
                    <div className={tags}>
                        {tagList ? tagList.map(elem => <Tag tagText={elem}/>) : null}
                    </div>
                    <div className={postDescription}>{description}</div>
                </div>
                <div className={postInfo2}>
                    <div className={userInfo}>
                        <div className={dopInfo}>
                            <div className={name}>{author.username}</div>
                            <div className={postDate}>{format(new Date(createdAt), "MMMM dd, yyyy")}</div>
                        </div>
                        <div className={avatar}>
                            <Avatar size={46} icon={<img src={author.image} alt="avatar" />} />
                        </div>
                    </div>
                    {author.username === user.username ? <div className={postActions}>
                        <Popconfirm
                            title="Are you sure to delete this article?"
                            onConfirm={confirm}
                            okText="Yes"
                            cancelText="No">
                                <Btn text="Delete" color="red" border fontSize="14px"/>
                        </Popconfirm>
                        <Btn text="Edit" color="#52C41A" border fontSize="14px"/>
                    </div> : ''}
                </div>
            </div>
            <div className={postBody}>
                <ReactMarkdown>{body}</ReactMarkdown>
            </div>
        </article>
    )
}

const mapStateToProps = (state) => ({ 
    slug: state.slug,
    article: state.article,
    token: state.token,
    user: state.user
});

const mapDispatchToProps = (dispatch) => ({
    getOpenedArticle: (slug) => dispatch(getOpenedArticle(slug)),
    receiveOpenedArticle: (article) => dispatch(receiveOpenedArticle(article)),
    deleteArticle: (slug, token) => dispatch(deleteArticle(slug, token))
})

export default connect(mapStateToProps, mapDispatchToProps)(OpenedPost);