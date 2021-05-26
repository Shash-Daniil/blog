import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown'
import css from '../../App.module.css';
import avatarImg from '../../img/avatar.png'
import Heart from '../Heart/Heart'
import Tag from '../Tag/Tag'
import { getOpenedArticle, receiveOpenedArticle } from '../../actions/actions';
import { connect } from 'react-redux';
import { Avatar } from 'antd';
import format from 'date-fns/format'

const { post, postMain, mainHeader, postTitle, likes, tags, postContentText,
   postInfo, name, postDate, avatar, dopInfo, postDescription } = css

const OpenedPost = props => {
    const { slug, getOpenedArticle, article = {}, receiveOpenedArticle } = props

    useEffect(() => {
        getOpenedArticle(slug)
        return () => {
            receiveOpenedArticle({})
        }
    }, [])

    if (JSON.stringify(article).length === 2)
        return <div>loading</div>

    const { title, description, body, tagList, favorited, favoritesCount, author, createdAt } = article

    return (
        <article className={post}>
            <div className={postMain}>
                <div className={mainHeader}>
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
                <div className={postContentText}>
                    {body}
                </div>
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

const mapStateToProps = (state) => ({ 
    slug: state.slug,
    article: state.article
});

const mapDispatchToProps = (dispatch) => ({
    getOpenedArticle: (slug) => dispatch(getOpenedArticle(slug)),
    receiveOpenedArticle: (article) => dispatch(receiveOpenedArticle(article))
})

export default connect(mapStateToProps, mapDispatchToProps)(OpenedPost);