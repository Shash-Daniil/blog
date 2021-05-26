import css from './EditProfile.module.css'
import InputField from '../inputField/InputField'
import BlueBtn from '../blueBtn/BlueBtn'

const { title, editProfile, form } = css

const EditProfile = props => {
    return (
        <div className={editProfile}>
            <div className={title}>Edit Profile</div>
            <form className={form}>
                <InputField text="Username" error={true}/>
                <InputField text="Email address" />
                <InputField text="New password" />
                <InputField text="Avatar image (url)" error={true}/>
                <BlueBtn text="Save"/>
            </form>
        </div>
    )
}

export default EditProfile