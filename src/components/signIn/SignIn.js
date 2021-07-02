import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import validation from '../../validation/validation';
import * as actions from '../../redux/actions/actions';
import InputField from '../inputField/InputField';
import BlueBtn from '../blueBtn/BlueBtn';
import Suggest from '../suggest/Suggest';
import css from './SignIn.module.css';

const { title, signIn, form } = css;

const SignIn = (props) => {
  const { onLogin, logged } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const history = useHistory();

  const onFormSubmit = (data) => {
    onLogin(data);
  };

  useEffect(() => {
    if (logged) {
      history.push('/');
    }
  }, [logged]);

  return (
    <div className={signIn}>
      <div className={title}>Sign In</div>
      <form className={form} onSubmit={handleSubmit(onFormSubmit)}>
        <InputField
          register={register('email', { ...validation.email })}
          name="email"
          text="Email"
          type="email"
          error={errors.email}
        />
        <InputField
          register={register('password', { ...validation.password })}
          error={errors.password}
          name="password"
          text="Password"
          type="password"
        />
        <BlueBtn text="Login" />
      </form>
      <Suggest text="Don’t have an account?" linkText="Sign Up" link="sign-up" />
    </div>
  );
};

SignIn.propTypes = {
  onLogin: PropTypes.func.isRequired,
  logged: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  logged: state.userReducer.logged,
});

const mapDispatchToProps = (dispatch) => {
  const { onLogin } = bindActionCreators(actions, dispatch);

  return {
    onLogin,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
