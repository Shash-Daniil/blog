import css from './SignUp.module.css';
import InputField from '../inputField/InputField'
import BlueBtn from '../blueBtn/BlueBtn'
import Suggest from '../suggest/Suggest'
import { useState } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/actions';

const { signUp, title, form, agreeLabel, agreeText, checkbox } = css

const SignUp = props => {
    const [user, setUser] = useState({})

    const onFormChange = (value, text) => {
        setUser({...user, [value]: text})
    }

    const onFormSubmit = (event) => {
        event.preventDefault()
        props.onRegister(user)
    }

    return (
        <div className={signUp}>
            <div className={title}>Create new account</div>
            <form className={form} onSubmit={onFormSubmit}>
                <InputField onChange={event => onFormChange(event.target.name, event.target.value)} name="username" text="Username" />
                <InputField onChange={event => onFormChange(event.target.name, event.target.value)} name="email" text="Email address" />
                <InputField onChange={event => onFormChange(event.target.name, event.target.value)} name="password" text="Password" error={true}/>
                <InputField text="Repeat Password" error={true}/>
                <label className={agreeLabel}>
                    <input className={checkbox} type="checkbox" />
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