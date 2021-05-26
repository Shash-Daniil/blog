import Post from '../post/Post'

const Posts = props => {
    return (
        <div>
            {props.articles.map(article => <Post getOpenedArticle={props.getOpenedArticle}
                                                title={article.title}
                                                description={article.description}
                                                slug={article.slug}
                                                tagList={article.tagList}/>)}
        </div>
    )
}

export default Posts