const initialState = {
    page: 1,
    articles: [],
    user: null
};
  
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'RECEIVE_ARTICLES':
            return {...state, articles: action.articles}
        case 'RECEIVE_OPENED_ARTICLE':
            return {...state, article: action.article}
        case 'CHANGE_PAGE':
            return {...state, page: action.page}
        case 'SET_USER':
            return {...state, user: action.user, logged: true}
        case 'SET_ERRORS':
            return {...state, errors: action.errors }
        case 'SET_SLUG':
            return {...state, slug: action.currentSlug}
        default:
            return state;
    }
};

export default reducer;
  