import BlogService from '../../services/BlogService';

const blogService = new BlogService();

export const receiveArticles = (articles) => ({ type: 'RECEIVE_ARTICLES', articles });

export const receiveOpenedArticle = (article) => ({ type: 'RECEIVE_OPENED_ARTICLE', article });

export const changePage = (page) => ({ type: 'CHANGE_PAGE', page });

export const receiveUser = (user) => ({ type: 'SET_USER', user });

export const setUser = (user) => (dispatch) => {
  dispatch(receiveUser(user));
  localStorage.setItem('token', user.token);
};

export const closeErrors = () => ({ type: 'ON_CLOSE_ERROR', errors: null });

export const setErrors = (errors) => ({ type: 'SET_ERRORS', errors });

const setLoading = (status) => ({ type: 'SET_LOADING', loading: status });

const successLiked = (slug, article) => ({ type: 'LIKE', slug, article });

const changeUpdateUserStatus = (value) => ({ type: 'CHANGE_UPDATE_USER_STATUS', value });

export const onLogOut = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  return { type: 'LOGOUT' };
};

export const setSlug = (currentSlug) => ({ type: 'SET_SLUG', currentSlug });
/* АСИНХРОННЫЕ ЭКШЕНЫ */

// eslint-disable-next-line arrow-body-style
export const getArticles = (offset) => (dispatch) => {
  dispatch(setLoading(true));
  blogService
    .getArticles(offset)
    .then((resp) => dispatch(receiveArticles(resp)))
    .then(() => dispatch(setLoading(false)))
    .catch((err) => dispatch(setErrors({ [err.message]: '' })));
};

export const getOpenedArticle = (slug) => (dispatch) => {
  dispatch(setLoading(true));
  blogService
    .getOpenedArticle(slug)
    .then((resp) => dispatch(receiveOpenedArticle(resp)))
    .then(() => dispatch(setLoading(false)))
    .catch((err) => dispatch(setErrors({ [err.message]: '' })));
};

export const onRegister = (user) => (dispatch) => {
  blogService
    .onRegister(user)
    .then((resp) => {
      if (!resp.errors) {
        dispatch(setUser(resp.user));
      } else {
        dispatch(setErrors(resp.errors));
      }
    })
    .catch((err) => dispatch(setErrors({ [err.message]: '' })));
};

export const updateUser = (data) => (dispatch) => {
  dispatch(changeUpdateUserStatus(true));
  blogService
    .onUpdateUser(data)
    .then((resp) => {
      if (!resp.errors) {
        dispatch(setUser(resp.user));
        dispatch(changeUpdateUserStatus(false));
      } else {
        dispatch(setErrors(resp.errors));
      }
    })
    .catch((err) => dispatch(setErrors({ [err.message]: '' })));
};

export const onLogin = (user) => (dispatch) => {
  blogService
    .onLogin(user)
    .then((resp) => {
      if (!resp.errors) {
        dispatch(setUser(resp.user));
      } else {
        dispatch(setErrors(resp.errors));
      }
    })
    .catch((err) => dispatch(setErrors({ [err.message]: '' })));
};

export const createArticle = (article) => (dispatch) => {
  dispatch(setLoading(true));
  blogService
    .createArticle(article)
    .then((resp) => {
      if (resp.errors) {
        dispatch(setErrors(resp.errors));
      }
    })
    .then(() => dispatch(getArticles(1)))
    .catch((err) => dispatch(setErrors({ [err.message]: '' })));
};

export const editArticle = (slug, article) => (dispatch) => {
  dispatch(setLoading(true));
  blogService
    .editArticle(slug, article)
    .then(() => dispatch(getArticles(1)))
    .catch((err) => dispatch(setErrors({ [err.message]: '' })));
};

export const deleteArticle = (slug) => (dispatch) => {
  dispatch(setLoading(true));
  blogService
    .deleteArticle(slug)
    .then(() => dispatch(getArticles(1)))
    .catch((err) => dispatch(setErrors({ [err.message]: '' })));
};

export const likePost = (slug) => (dispatch) => {
  blogService
    .likePost(slug)
    .then((article) => dispatch(successLiked(slug, article)))
    .catch((err) => dispatch(setErrors({ [err.message]: '' })));
};

export const unlikePost = (slug) => (dispatch) => {
  blogService
    .unlikePost(slug)
    .then((article) => dispatch(successLiked(slug, article)))
    .catch((err) => dispatch(setErrors({ [err.message]: '' })));
};
