import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import validation from '../../validation/validation';
import { updateUser } from '../../redux/actions/actions';
import InputField from '../InputField/InputField';
import BlueBtn from '../SubmitBtn/SubmitBtn';
import Routes from '../../Routes';
import css from './EditProfile.module.css';

const { title, editProfile, form } = css;

const EditProfile = (props) => {
  const { updateUser, updateUserStatus } = props;

  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onFormSubmit = (data) => {
    updateUser(data);
  };

  // const lastUpdate = localStorage.getItem('')

  useEffect(() => {
    if (!updateUserStatus) {
      history.push(Routes.HOME_PAGE);
    }
  }, [updateUserStatus]);

  return (
    <div className={editProfile}>
      <div className={title}>Edit Profile</div>
      <form className={form} onSubmit={handleSubmit(onFormSubmit)}>
        <InputField
          name="username"
          text="Username"
          register={register('username', { ...validation.username })}
          error={errors.username}
        />
        <InputField
          name="email"
          type="email"
          text="Email address"
          register={register('email', { ...validation.email })}
          error={errors.email}
        />
        <InputField
          name="password"
          text="New Password"
          type="password"
          register={register('password', { ...validation.password })}
          error={errors.password}
        />
        <InputField
          text="Avatar image (url)"
          name="image"
          type="text"
          register={register('image', { ...validation.image })}
          error={errors.image}
        />
        <BlueBtn text="Save" />
      </form>
    </div>
  );
};

EditProfile.propTypes = {
  updateUser: PropTypes.func.isRequired,
  updateUserStatus: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({ user: state.user, updateUserStatus: state.userReducer.updateUserStatus });

const mapDispatchToProps = (dispatch) => ({ updateUser: (data) => dispatch(updateUser(data)) });

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
