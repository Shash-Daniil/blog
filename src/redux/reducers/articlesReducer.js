const initialState = {
  articles: [],
};

const articlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LIKE': {
      const index = state.articles.findIndex((elem) => elem.slug === action.slug);
      const newArticles = [...state.articles];
      newArticles[index] = action.article.article;
      return { ...state, articles: newArticles };
    }
    case 'UNLIKE': {
      const index = state.articles.findIndex((elem) => elem.slug === action.slug);
      const newArticles = [...state.articles];
      newArticles[index] = action.article.article;
      return { ...state, articles: newArticles };
    }
    case 'SET_SLUG':
      return { ...state, slug: action.currentSlug };
    case 'RECEIVE_ARTICLES':
      return { ...state, articles: action.articles };
    case 'RECEIVE_OPENED_ARTICLE':
      return { ...state, article: action.article };
    default:
      return state;
  }
};

export default articlesReducer;
