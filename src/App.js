import 'antd/dist/antd.css';
import { Route } from 'react-router-dom';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Pagination } from 'antd';
import PropTypes from 'prop-types';
import * as actions from './redux/actions/actions';
import EditProfile from './components/EditProfile/EditProfile';
import CreatePost from './components/CreatePost/CreatePost';
import OpenedPost from './components/SinglePost/SinglePost';
import EditPost from './components/EditPost/EditPost';
import Posts from './components/Posts/Posts';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import ErrorsList from './components/ErrorsList/ErrorsList';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import HeaderMenu from './components/HeaderMenu/HeaderMenu';
import Routes from './Routes';
import LocalStorageService from './services/LocalStorageService';
import css from './App.module.css';

const { main, pagination } = css;

function App(props) {
  const { closeErrors, onLogin, getArticles, state } = props;

  const storage = new LocalStorageService();

  useEffect(() => {
    getArticles(state.reducer.page);
  }, [state.reducer.page, getArticles]);

  useEffect(() => {
    if (storage.getItem('user')) {
      onLogin(JSON.parse(storage.getItem('user')));
    }
  }, [onLogin]);

  return (
    <div className="App">
      <HeaderMenu />
      <main className={main}>
        <ErrorBoundary>
          <Route path={[Routes.HOME_PAGE, Routes.ARTICLES_PAGE]} exact render={() => <Posts />} />
          <Route
            path={[Routes.HOME_PAGE, Routes.ARTICLES_PAGE]}
            exact
            render={() =>
              state.reducer.loading ? null : (
                <Pagination
                  className={pagination}
                  onChange={(event) => props.changePage(event)}
                  defaultCurrent={1}
                  current={state.reducer.page}
                  total={500}
                  showSizeChanger={false}
                />
              )
            }
          />
          <Route path={Routes.SIGN_IN_PAGE} component={SignIn} />
          <Route path={Routes.SIGN_UP_PAGE} component={SignUp} />
          <Route path={`${Routes.SINGLE_ARTICLE_PAGE}/:slug`} exact component={OpenedPost} />
          <PrivateRoute path={Routes.NEW_ARTICLE_PAGE}>
            <CreatePost />
          </PrivateRoute>
          <PrivateRoute path={Routes.EDIT_ARTICLE_PAGE}>
            <EditPost />
          </PrivateRoute>
          <PrivateRoute path={Routes.PROFILE_PAGE}>
            <EditProfile />
          </PrivateRoute>
        </ErrorBoundary>
        <ErrorsList errors={state.errorsReducer.errors} closeErrors={closeErrors} />
      </main>
    </div>
  );
}

App.propTypes = {
  state: PropTypes.instanceOf(Object).isRequired,
  getArticles: PropTypes.func.isRequired,
  changePage: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  closeErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ state });

const mapDispatchToProps = (dispatch) => {
  const { getArticles, changePage, onLogin, onLogOut, closeErrors } = bindActionCreators(actions, dispatch);

  return {
    getArticles,
    changePage,
    onLogin,
    onLogOut,
    closeErrors,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
