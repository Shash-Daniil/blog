import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Avatar } from 'antd';
import { Link } from 'react-router-dom';
import Btn from '../Btn/Btn';
import { onLogOut } from '../../redux/actions/actions';
import Routes from '../../Routes';
import LocalStorageService from '../../services/LocalStorageService';
import css from './HeaderMenu.module.css';

const { userInfo, userInfoName, headerMenuWrapper, avatar, blohLogo, header, headerMenu } = css;

const HeaderMenu = (props) => {
  const storage = new LocalStorageService();

  const { onLogOut } = props;

  let { user, logged } = props;

  if (storage.getItem('user')) {
    logged = true;
    user = JSON.parse(storage.getItem('user'));
  }

  let menuToRender;

  if (logged) {
    menuToRender = (
      <div className={headerMenuWrapper}>
        <Link to={Routes.NEW_ARTICLE_PAGE}>
          <Btn border color="#52C41A" text="Create article" fontSize="14px" />
        </Link>
        <div className={userInfo}>
          <Link to={Routes.PROFILE_PAGE}>
            <div className={userInfoName}>{user.username}</div>
          </Link>
          <Link to={Routes.PROFILE_PAGE}>
            <div className={avatar}>
              <Avatar size={46} icon={<img src={user.image} alt="avatar" />} />
            </div>
          </Link>
        </div>
        <Link to={Routes.HOME_PAGE}>
          <Btn onClick={onLogOut} border color="#000000" text="Log Out" fontSize="18px" />
        </Link>
      </div>
    );
  } else {
    menuToRender = (
      <div className={headerMenuWrapper}>
        <Link to={Routes.SIGN_IN_PAGE}>
          <Btn text="Sign In" fontSize="14px" />
        </Link>
        <Link to={Routes.SIGN_UP_PAGE}>
          <Btn text="Sign Up" color="#52C41A" border fontSize="14px" />
        </Link>
      </div>
    );
  }
  return (
    <header className={header}>
      <Link to={Routes.HOME_PAGE}>
        <div className={blohLogo}>Realworld blog</div>
      </Link>
      <div className={headerMenu}>{menuToRender}</div>
    </header>
  );
};

HeaderMenu.propTypes = {
  logged: PropTypes.bool,
  user: PropTypes.instanceOf(Object).isRequired,
  onLogOut: PropTypes.func.isRequired,
};

HeaderMenu.defaultProps = {
  logged: false,
};

const mapStateToProps = (state) => ({
  user: state.userReducer.user,
  logged: state.userReducer.logged,
});

const mapDispatchToProps = (dispatch) => ({ onLogOut: () => dispatch(onLogOut()) });

export default connect(mapStateToProps, mapDispatchToProps)(HeaderMenu);
