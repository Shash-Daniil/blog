import css from './CreatePost.module.css'
import InputField from '../inputField/InputField'
import BlueBtn from '../blueBtn/BlueBtn'
import Btn from '../btn/Btn'

const { title, createPost, form, tagsWrapper, byda, container } = css

const CreatePost = props => {
    return (
        <div className={createPost}>
            <div className={title}>Create new article</div>
            <form className={form}>
                <InputField text="Title" />
                <InputField text="Short description" />
                <InputField text="Text" />
                <InputField text="Avatar image (url)" />
                <div className={tagsWrapper}>
                    <div>Tags</div>
                    <div className={byda}>
                        <div className={container}>
                            <InputField placeholder="Tag" />
                        </div>
                        <Btn text="Delete" color="red" border fontSize="16px"/>
                        <Btn text="Add tag" color="#1890FF" border fontSize="16px"/>
                    </div>
                </div>
                <BlueBtn text="Send"/>
            </form>
        </div>
    )
}

export default CreatePost