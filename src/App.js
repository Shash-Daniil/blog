import 'antd/dist/antd.css';
import { Route, Link } from 'react-router-dom'
import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Pagination, Alert } from 'antd';
import PropTypes from 'prop-types';
import * as actions from './actions/actions';
import EditProfile from './components/editProfile/EditProfile'
import CreatePost from './components/createPost/CreatePost'
import OpenedPost from './components/openedPost/OpenedPost' 
import EditPost from './components/editPost/EditPost'
import Posts from './components/posts/Posts'
import SignUp from './components/signUp/SignUp'
import SignIn from './components/signIn/SignIn'
import HeaderMenu from './components/headerMenu/HeaderMenu'
import css from './App.module.css';

const { blohLogo, header, headerMenu, main, errorsContainer } = css

function App(props) {

  const { closeErrors, onLogOut, onLogin, getArticles, state } = props

  useEffect(() => {
    const offset = (state.page - 1) * 20
    getArticles(offset)
  }, [state.page, getArticles])

  useEffect(() => {
    if (localStorage.user) {
      onLogin(JSON.parse(localStorage.getItem("user")))
    }
  }, [onLogin])

  return (
    <div className="App">
      <header className={header}>
        <Link to="/">
          <div className={blohLogo}>
            Realworld blog
          </div>
        </Link>
        <div className={headerMenu}>
          <HeaderMenu
            user={state.user}
            onLogOut={onLogOut}
            logged={state.logged}/>
        </div>
      </header>
      <main className={main}>
        <Route path={['/','/articles']} exact render={() => <Posts />} />
        <Route path={['/','/articles']} exact render={() => <Pagination style={{marginTop: '20px'}}
                                                                        onChange={(event) => props.changePage(event)} 
                                                                        defaultCurrent={1} 
                                                                        total={500}
                                                                        showSizeChanger={false} />} />
        <Route path='/sign-in' component={SignIn} />
        <Route path='/sign-up' component={SignUp} />
        <Route path='/article/:slug' exact component={OpenedPost} />
        <Route path='/profile' component={EditProfile} />
        <Route path='/new-article' component={CreatePost} />
        <Route path='/article/edit-article' component={EditPost}/>
        <div className={errorsContainer}>
          {state.errors ? 
            Object.keys(state.errors).map(elem => <Alert message={elem}
              closable
              afterClose={closeErrors}
              description={state.errors[elem][0]} type="error" showIcon />)
            : null}
        </div>
      </main>
      
      <svg style={{display: "none"}}>
                <symbol viewBox="0 0 412.735 412.735" id="heart">
                    <g>
                        <g>
                            <path d="M295.706,35.522C295.706,35.522,295.706,35.522,295.706,35.522c-34.43-0.184-67.161,14.937-89.339,41.273
                            c-22.039-26.516-54.861-41.68-89.339-41.273C52.395,35.522,0,87.917,0,152.55C0,263.31,193.306,371.456,201.143,375.636
                            c3.162,2.113,7.286,2.113,10.449,0c7.837-4.18,201.143-110.759,201.143-223.086C412.735,87.917,360.339,35.522,295.706,35.522z
                            M206.367,354.738C176.065,336.975,20.898,242.412,20.898,152.55c0-53.091,43.039-96.131,96.131-96.131
                            c32.512-0.427,62.938,15.972,80.457,43.363c3.557,4.905,10.418,5.998,15.323,2.44c0.937-0.68,1.761-1.503,2.44-2.44
                            c29.055-44.435,88.631-56.903,133.066-27.848c27.202,17.787,43.575,48.114,43.521,80.615
                            C391.837,243.456,236.669,337.497,206.367,354.738z"/>
                        </g>
                    </g>
                </symbol>
                <symbol viewBox="0 0 391.837 391.837" id="heart-red">
                  <g>
                    <path style={{fill: '#D7443E'}} d="M285.257,35.528c58.743,0.286,106.294,47.836,106.58,106.58
                    c0,107.624-195.918,214.204-195.918,214.204S0,248.165,0,142.108c0-58.862,47.717-106.58,106.58-106.58l0,0
                    c36.032-0.281,69.718,17.842,89.339,48.065C215.674,53.517,249.273,35.441,285.257,35.528z"/>
                  </g>
                </symbol>
            </svg>
    </div>
  );
}

App.propTypes = {
  state: PropTypes.instanceOf(Object).isRequired,
  getArticles: PropTypes.func.isRequired,
  changePage: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  onLogOut: PropTypes.func.isRequired,
  closeErrors: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({ state });

const mapDispatchToProps = (dispatch) => {
  const { getArticles, changePage, onLogin, onLogOut, closeErrors } = bindActionCreators(actions, dispatch);

  return {
    getArticles,
    changePage,
    onLogin,
    onLogOut,
    closeErrors
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
