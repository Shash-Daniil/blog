import css from './TagInput.module.css'
import InputField from '../inputField/InputField'
import Btn from '../btn/Btn'

const { byda, container } = css

const TagInput = props => {

    const { register, value, append, remove } = props

    return (
        <div className={byda}>
            <div className={container}>
                <InputField
                    defaultValue={value}
                    placeholder="tag"
                    register={register}/>
            </div>
            {props.aloneTag ? null : <Btn onClick={remove} text="Delete" color="red" border fontSize="16px"/>}
            {props.last ? <Btn onClick={append} text="Add tag" color="#1890FF" border fontSize="16px"/> : null}
        </div>
    )
}

export default TagInput