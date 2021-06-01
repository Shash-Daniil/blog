import Post from '../post/Post'

const Posts = props => {

    return (
        <div>
            {props.articles.map(article => <Post getOpenedArticle={props.getOpenedArticle}
                                                title={article.title}
                                                description={article.description}
                                                slug={article.slug}
                                                tagList={article.tagList}
                                                favorited={article.favorited}
                                                favoritesCount={article.favoritesCount}
                                                author={article.author}
                                                createdAt={article.createdAt}
                                                />)}
        </div>
    )
}

export default Posts