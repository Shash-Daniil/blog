import BlogService from '../services/BlogService'

const blogService = new BlogService()


export const receiveArticles = (articles) => ({ type: 'RECEIVE_ARTICLES', articles, loading: false })

export const receiveOpenedArticle = (article) => ({ type: 'RECEIVE_OPENED_ARTICLE', article })

export const changePage = (page) => ({ type: 'CHANGE_PAGE', page, loading: true })

export const setUser = (user) => ({ type: 'SET_USER', user })

export const closeErrors = () => ({ type: 'ON_CLOSE_ERROR', errors: null })

export const setErrors = (errors) => ({ type: 'SET_ERRORS', errors })

export const onLogOut = () => {
  localStorage.removeItem("user")
  return ({ type: 'LOGOUT' })
} 

export const setSlug = (currentSlug) => ({ type: 'SET_SLUG', currentSlug })
/* АСИНХРОННЫЕ ЭКШЕНЫ */

// eslint-disable-next-line arrow-body-style
export const getArticles = (offset) => {
  return (dispatch) => {
    blogService.getArticles(offset)
      .then(resp => dispatch(receiveArticles(resp)))
  }
}

export const getOpenedArticle = (slug) => {
  return (dispatch) => {
    blogService.getOpenedArticle(slug)
      .then(resp => dispatch(receiveOpenedArticle(resp)))
  }
}

export const onRegister = (user) => {
  return dispatch => {
    blogService.onRegister(user)
  }
}

export const updateUser = (data, token) => {
  return dispatch => {
    blogService.onUpdateUser(data, token)
      .then(resp => {
        if (!resp.errors) {
          dispatch(setUser(resp.user))
        } else {
          dispatch(setErrors(resp.errors))
        }
      })
  }
}

export const onLogin = (user) => {
  return dispatch => {
    blogService.onLogin(user)
      .then(resp => {
        if (!resp.errors) {
          dispatch(setUser(resp.user))
        } else {
          dispatch(setErrors(resp.errors))
        }
      })
  }
}

export const createArticle = (article, token) => {
  return dispatch => {
    blogService.createArticle(article, token)
      .then(resp => {
        if (resp.errors) {
          dispatch(setErrors(resp.errors))
        }
      })
  }
}

export const deleteArticle = (slug, token) => {
  return dispatch => {
    console.log('action activated')
    blogService.deleteArticle(slug, token)
  }
}