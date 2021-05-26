import css from './SignIn.module.css'
import InputField from '../inputField/InputField'
import BlueBtn from '../blueBtn/BlueBtn'
import Suggest from '../suggest/Suggest'
import { connect } from 'react-redux';
import { useState } from 'react'
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/actions';

const { title, signIn, form } = css

const SignIn = props => {
    const [user, setUser] = useState({})

    const onFormChange = (value, text) => {
        setUser({...user, [value]: text})
    }

    const onFormSubmit = (event) => {
        event.preventDefault()
        console.log(user)
        props.onLogin(user)
    }

    return (
        <div className={signIn}>
            <div className={title}>Sign In</div>
            <form className={form} onSubmit={onFormSubmit}>
                <InputField onChange={event => onFormChange(event.target.name, event.target.value)} name="email" text="Email" />
                <InputField onChange={event => onFormChange(event.target.name, event.target.value)} name="password" text="Password" />
                <BlueBtn text="Login"/>
            </form>
            <Suggest text="Don’t have an account?" linkText="Sign Up" link="sign-up"/>
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