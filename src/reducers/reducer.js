const initialState = {
    page: 1,
    articles: [],
    user: null,
    errors: {}
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
            return {...state, user: action.user, logged: true, token: action.user.token}
        case 'SET_ERRORS':
            return {...state, errors: action.errors }
        case 'SET_SLUG':
            return {...state, slug: action.currentSlug}
        case 'LOGOUT': {
            return {...state, user: "", logged: false}
        }
        case 'ON_CLOSE_ERROR': {
            return {...state, errors: null}
        }
        default:
            return state;
    }
};

export default reducer;
  