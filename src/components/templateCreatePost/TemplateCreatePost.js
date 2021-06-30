import css from './TemplateCreatePost.module.css'
import InputField from '../inputField/InputField'
import BlueBtn from '../blueBtn/BlueBtn'
import TagInput from '../tagInput/TagInput'
import Error from '../error/Error'
import { useForm, useFieldArray } from 'react-hook-form'
import { validation } from '../../validation/validation'

const { createPost, form, tagsWrapper, inputWrapper, textInput, inputTitle, textInputError } = css

const TemplateCreatePost = props => {

    const { onFormSubmit, formTitle, defaultValue, title, text, description } = props

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
                    value={elem.value}
                    key={elem.id}
                    register={register(`tagList[${index}].value`)}
                    append={append}
                    remove={()=> remove(index)}
                    last={index === fields.length -1}
                    aloneTag={fields.length === 1}/>
    })

    return (
        <div className={createPost}>
            <div className={css.formTitle}>{formTitle}</div>
            <form className={form} onSubmit={handleSubmit(onFormSubmit)}>
                <InputField
                    name="title"
                    text="Title"
                    defaultValue={title}
                    error={errors.title}
                    register={register('title', {...validation.title})}/>
                <InputField
                    name="description"
                    text="Short description"
                    defaultValue={description}
                    error={errors.description}
                    register={register('description', {...validation.description})}/>
                <div className={inputWrapper}>
                    <div className={inputTitle}>Text</div>
                    <textarea
                        className={[textInput, (errors.body ? textInputError : null)].join(' ')}
                        rows={5}
                        placeholder="Text"
                        {...register('body', {...validation.body})}>{text}</textarea>
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