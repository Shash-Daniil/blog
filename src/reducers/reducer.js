const initialState = {
  page: 1,
  articles: [],
  user: {},
  errors: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RECEIVE_ARTICLES':
      return { ...state, articles: action.articles };
    case 'RECEIVE_OPENED_ARTICLE':
      return { ...state, article: action.article };
    case 'CHANGE_PAGE':
      return { ...state, page: action.page };
    case 'SET_USER':
      return { ...state, user: action.user, logged: true };
    case 'SET_ERRORS':
      return { ...state, errors: action.errors };
    case 'SET_SLUG':
      return { ...state, slug: action.currentSlug };
    case 'LOGOUT': {
      return { ...state, user: '', logged: false };
    }
    case 'SET_LOADING': {
      return { ...state, loading: action.loading };
    }
    case 'CHANGE_UPDATE_USER_STATUS': {
      return { ...state, updateUserStatus: action.value };
    }
    case 'ON_CLOSE_ERROR': {
      return { ...state, errors: null };
    }
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
    default:
      return state;
  }
};

export default reducer;
