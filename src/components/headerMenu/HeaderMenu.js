import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'antd';
import { Link } from 'react-router-dom';
import Btn from '../btn/Btn';
import css from '../../App.module.css';

const { userInfo, userInfoName, headerMenuWrapper, avatar } = css;

const HeaderMenu = (props) => {
  const { logged, user, onLogOut } = props;

  if (logged) {
    return (
      <div className={headerMenuWrapper}>
        <Link to="/new-article">
          <Btn border color="#52C41A" text="Create article" fontSize="14px" />
        </Link>
        <div className={userInfo}>
          <Link to="/profile">
            <div className={userInfoName}>{user.username}</div>
          </Link>
          <Link to="/profile">
            <div className={avatar}>
              <Avatar size={46} icon={<img src={user.image} alt="avatar" />} />
            </div>
          </Link>
        </div>
        <Link to="/">
          <Btn onClick={onLogOut} border color="#000000" text="Log Out" fontSize="18px" />
        </Link>
      </div>
    );
  }
  return (
    <div className={headerMenuWrapper}>
      <Link to="/sign-in">
        <Btn text="Sign In" fontSize="14px" />
      </Link>
      <Link to="/sign-up">
        <Btn text="Sign Up" color="#52C41A" border fontSize="14px" />
      </Link>
    </div>
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

export default HeaderMenu;
