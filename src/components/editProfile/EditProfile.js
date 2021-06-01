import css from './EditProfile.module.css'
import InputField from '../inputField/InputField'
import BlueBtn from '../blueBtn/BlueBtn'
import { updateUser } from '../../actions/actions'
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form' 
import { validation } from '../../validation/validation'

const { title, editProfile, form } = css

const EditProfile = props => {
    const { updateUser, state } = props

    const { register, handleSubmit, formState: {errors} } = useForm()

    const onFormSubmit = (data) => {
        console.log(data)
        updateUser(data, state.token)
    }

    return (
        <div className={editProfile}>
            <div className={title}>Edit Profile</div>
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
                    text="New Password"
                    type="password"
                    register={register('password', {...validation.password})}
                    error={errors.password} />
                <InputField
                    text="Avatar image (url)"
                    name="image" 
                    type="text"
                    register={register('image', {...validation.image})}
                    error={errors.image} />
                <BlueBtn text="Save"/>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {state}
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUser: (data, token) => dispatch(updateUser(data, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)