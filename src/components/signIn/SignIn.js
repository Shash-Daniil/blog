import css from './SignIn.module.css'
import InputField from '../inputField/InputField'
import BlueBtn from '../blueBtn/BlueBtn'
import Suggest from '../suggest/Suggest'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/actions';
import { useForm } from 'react-hook-form' 
import { validation } from '../../validation/validation'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react';

const { title, signIn, form } = css

const SignIn = props => {

    const { register, handleSubmit, formState: {errors} } = useForm()

    const history = useHistory()
    
    const onFormSubmit = (data) => {
        props.onLogin(data)
    }

    useEffect(() => {
        if (props.state.user) {
            history.push('/')
        }
    },[props.state.user])
    
    return (
        <div className={signIn}>
            <div className={title}>Sign In</div>
            <form className={form} onSubmit={handleSubmit(onFormSubmit)}>
                <InputField 
                    register={register('email', {...validation.email})}
                    name="email" 
                    text="Email"
                    type="email"
                    error={errors.email}/>
                <InputField
                    register={register('password', {...validation.password})}
                    error={errors.password}
                    name="password" 
                    text="Password"
                    type="password"/>
                <BlueBtn text="Login"/>
            </form>
            <Suggest 
                text="Don’t have an account?" 
                linkText="Sign Up" 
                link="sign-up"/>
        </div>
    )
}

const mapStateToProps = (state) => ({ state });

const mapDispatchToProps = (dispatch) => {
    const { onLogin } = bindActionCreators(actions, dispatch);
  
    return {
        onLogin
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);