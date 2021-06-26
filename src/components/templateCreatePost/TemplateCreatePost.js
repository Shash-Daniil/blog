import css from './TemplateCreatePost.module.css'
import InputField from '../inputField/InputField'
import BlueBtn from '../blueBtn/BlueBtn'
import TagInput from '../tagInput/TagInput'
import Error from '../error/Error'
import { useForm, useFieldArray } from 'react-hook-form'
import { validation } from '../../validation/validation'

const { title, createPost, form, tagsWrapper, inputWrapper, textInput, inputTitle } = css

const TemplateCreatePost = props => {

    const { onFormSubmit, formTitle, defaultValue } = props

    const { register, handleSubmit, formState: {errors}, control } = useForm({
            defaultValues: defaultValue
    })
    
    const { fields, append, remove } = useFieldArray({
            control,
            name: "tagList"
        }
    );

    const tagList = fields.map((elem, index) => {
        return <TagInput
                    key={elem.id}
                    register={register(`tagList[${index}]`)}
                    append={append}
                    remove={()=> remove(index)}
                    value={elem.value}
                    last={index === fields.length -1}
                    aloneTag={fields.length === 1}/>
    })

    return (
        <div className={createPost}>
            <div className={title}>{formTitle}</div>
            <form className={form} onSubmit={handleSubmit(onFormSubmit)}>
                <InputField
                    name="title"
                    text="Title"
                    register={register('title', {...validation.title})}/>
                <InputField
                    name="description"
                    text="Short description"
                    register={register('description', {...validation.description})}/>
                <div className={inputWrapper}>
                    <div className={inputTitle}>Text</div>
                    <textarea
                        className={textInput}
                        rows={5}
                        placeholder="Text"
                        {...register('body', {...validation.body})}></textarea>
                    {errors.body ? <Error text={errors.body.message}/> : null}
                </div>
                <div className={tagsWrapper}>
                    <div>Tags</div>
                    {tagList}
                </div>
                <BlueBtn text="Send"/>
            </form>
        </div>
    )
}

export default TemplateCreatePost