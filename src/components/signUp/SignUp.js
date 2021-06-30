import css from './SignUp.module.css';
import InputField from '../inputField/InputField'
import BlueBtn from '../blueBtn/BlueBtn'
import Suggest from '../suggest/Suggest'
import Error from '../error/Error'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/actions';
import { useForm } from 'react-hook-form' 
import { validation } from '../../validation/validation'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react';

const { signUp, title, form, agreeLabel, agreeText, checkbox } = css

const SignUp = props => {
    const { watch, register, handleSubmit, formState: {errors} } = useForm()

    const { user } = props

    const history = useHistory()

    const onFormSubmit = (data) => {
        const { username, email, password } = data
        const user = {
            username,
            email,
            password
        }
        props.onRegister(user)
    }

    useEffect(() => {
        if (user) {
            history.push('/')
        }
    }, [user])

    const currentPassword = watch('password')

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
                    error={errors.repeatPassword}
                    register={register('repeatPassword', {validate: value => value === currentPassword})} />
                <label className={agreeLabel}>
                    <input 
                        className={checkbox}
                        type="checkbox"
                        {...register('checkbox', {...validation.checkbox})}/>
                    <div className={agreeText}>I agree to the processing of my personal 
                    information</div>
                    {errors.checkbox ? <Error text={errors.checkbox.message}/> : null}
                </label>

                <BlueBtn text="Create"/>
            </form>
            <Suggest text="Already have an account?" linkText="Sign In" link="sign-in"/>
        </div>
    )
}

const mapStateToProps = (state) => ({ 
    user: state.user
 });

const mapDispatchToProps = (dispatch) => {
    const { onRegister } = bindActionCreators(actions, dispatch);
  
    return {
        onRegister
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);