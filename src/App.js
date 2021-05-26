import css from './App.module.css';
import Post from './components/post/Post'
import Posts from './components/posts/Posts'
import SignUp from './components/signUp/SignUp'
import SignIn from './components/signIn/SignIn'
import EditProfile from './components/editProfile/EditProfile'
import CreatePost from './components/createPost/CreatePost'
import OpenedPost from './components/openedPost/OpenedPost' 
import Btn from './components/btn/Btn'
import { Route, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions/actions';
import { Pagination } from 'antd';
import '../node_modules/antd/dist/antd.css';
import avatarImg from './img/avatar.png'

const { blohLogo, header, headerMenu, main, userInfo, userInfo__name, headerMenuWrapper } = css

function App(props) {

  useEffect(() => {
    const offset = (props.state.page - 1) * 20
    props.getArticles(offset)
  }, [props.state.page])

  useEffect(() => {
    if (localStorage.user)
      props.onLogin(JSON.parse(localStorage.getItem("user")))
  }, [])

  let logged

  if (props.state.logged) {
    logged = <div className={headerMenuWrapper}>
      <Link to="/">
        <Btn border color="#52C41A" text="Create article" fontSize="14px"/>
      </Link>
      <div className={userInfo}>
        <div className={userInfo__name}>{props.state.user.username}</div>
        <img src={props.state.user.image} srcSet={avatarImg} />
      </div>
      <Link to="/">
        <Btn border color="#000000" text="Log Out" fontSize="18px"/>
      </Link>
    </div>
  }

  const notLogged = <div className={headerMenuWrapper}>
    <Link to="/sign-in">
      <Btn text="Sign In" fontSize="14px"/>
    </Link>
    <Link to="/sign-up">
      <Btn text="Sign Up" color="#52C41A" border fontSize="14px"/>
    </Link>
  </div>

  return (
    <div className="App">
      <header className={header}>
        <div className={blohLogo}>Realworld blog</div>
        <div className={headerMenu}>
          {props.state.logged ? logged : notLogged}
        </div>
      </header>
      <main className={main}>
        <Route path={['/','/articles']} exact render={() => <Posts articles={props.state.articles}/>} />
        <Route path={['/','/articles']} exact render={() => <Pagination style={{marginTop: '20px'}}
                                                                        onChange={(event) => props.changePage(event)} 
                                                                        defaultCurrent={1} 
                                                                        total={500}
                                                                        showSizeChanger={false} />} />
        <Route path='/sign-in' component={SignIn} />
        <Route path='/sign-up' component={SignUp} />
        <Route path='/article/:slug' component={OpenedPost} />
        
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

const mapStateToProps = (state) => ({ state });

const mapDispatchToProps = (dispatch) => {
  const { getArticles, changePage, onLogin } = bindActionCreators(actions, dispatch);

  return {
    getArticles,
    changePage,
    onLogin
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
