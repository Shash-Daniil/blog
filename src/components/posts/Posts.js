import Post from '../post/Post'
import { connect } from 'react-redux';
import { Spin } from 'antd';

const Posts = props => {
    const { articles, loading } = props

    const articlesList = articles.map(article => <Post article={article} key={article.slug}/>)

    return (
        <div>
            {loading ? <Spin /> : articlesList}
        </div>
    )
}

const mapStateToProps = (state) => ({
    articles: state.articles,
    loading: state.loading
});

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);