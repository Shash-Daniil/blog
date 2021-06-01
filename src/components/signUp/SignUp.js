import css from './SignUp.module.css';
import InputField from '../inputField/InputField'
import BlueBtn from '../blueBtn/BlueBtn'
import Suggest from '../suggest/Suggest'
import { useState } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/actions';
import { useForm } from 'react-hook-form' 
import { validation } from '../../validation/validation'

const { signUp, title, form, agreeLabel, agreeText, checkbox } = css

const SignUp = props => {
    const { register, handleSubmit, formState: {errors} } = useForm()

    const onFormSubmit = (data) => {
        console.log(data)
        props.onRegister(data)
    }

    return (
        <div className={signUp}>
            <div className={title}>Create new account</div>
            <form className={form} onSubmit={handleSubmit(onFormSubmit)}>
                <InputField
                    name="username" 
                    text="Username"
                    register={register('username', {...validation.username})}
                    error={errors.username} />
                <InputField 
                    name="email"
                    type="email"
                    text="Email address"
                    register={register('email', {...validation.email})}
                    error={errors.email} />
                <InputField 
                    name="password" 
                    text="Password"
                    type="password"
                    register={register('password', {...validation.password})}
                    error={errors.password} />
                <InputField 
                    text="Repeat Password"
                    type="password"
                    error={errors.password} />
                <label className={agreeLabel}>
                    <input 
                        className={checkbox}
                        type="checkbox"
                        register={register('checkbox', {...validation.checkbox})} />
                    <div className={agreeText}>I agree to the processing of my personal 
                    information</div>
                </label>

                <BlueBtn text="Create"/>
            </form>
            <Suggest text="Already have an account?" linkText="Sign In" link="sign-in"/>
        </div>
    )
}

const mapStateToProps = (state) => ({ state });

const mapDispatchToProps = (dispatch) => {
    const { onRegister } = bindActionCreators(actions, dispatch);
  
    return {
        onRegister
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);