import { useForm } from 'react-hook-form'
import { inputValidation } from '../../../validation/validators'
import { useState } from 'react'

import styles from '../form.module.scss'


export default function  AcrticleCreate () {

  const [tagList, setTagList] = useState([])

  const {
    register,
    formState: {
      errors
    },
    handleSubmit,
    watch,
    resetField
  } = useForm()


  const tagValue = watch('tags')

  const addTag = (evt) => {
    evt.preventDefault()
    const inputTrim = tagValue.trim()
    if(inputTrim) {
      setTagList([inputTrim, ...tagList])
      resetField('tags')
    }
    console.log(tagList)
  }

  const deleteTag = (evt, i) => {
    evt.preventDefault()
    setTagList(tagList.filter((_, index) => index !== i))
  }

  const clearInputTag = (evt) => {
    evt.preventDefault()
    resetField('tag')
  }

  const onSubmit = (data) => {
    console.log({...data, tags: tagList})
  }

  return (
    <div className={`${styles['form-wrap']} ${styles['create-article-form-wrap']}`}>
      <h2 className={styles['form__header']}>Create new article</h2>
      <form className={`${styles['form']} ${styles[`create-article-form`]}`} onSubmit={handleSubmit(onSubmit)}>
        <label className={`${styles['form__label']} ${styles['create-article-form__label']}`}>Title
          <input className={`${styles['form__input']} ${styles['create-article-form__input']}`} placeholder='Title'
          {...register('title', inputValidation)}
          />
          <div className={styles['form__error-message']}>{errors?.title && <p>{errors?.title.message}</p>}</div>
        </label>
        <label className={`${styles['form__label']} ${styles['create-article-form__label']}`}>Short description
          <input className={`${styles['form__input']} ${styles['create-article-form__input']}`} placeholder='Description'
          {...register('description', inputValidation)}
          />
          <div className={styles['form__error-message']}>{errors?.description && <p>{errors?.description.message}</p>}</div>
        </label>
        <label className={`${styles['form__label']} ${styles['create-article-form__label-textarea']}`}>Text
          <textarea className={`${styles['form__input']} ${styles['create-article-form__textarea']}`} placeholder='Text'
          {...register('body', inputValidation)}
          />
          <div className={styles['form__error-message']}>{errors?.body && <p>{errors?.body.message}</p>}</div>
        </label>
        <label className={`${styles['form__label']} ${styles['label-tags-wrap']}`}>Tags
         <>
          {tagList.map((tag, i) => (
            <div key={i} className={styles['form-tags']}> 
            <input 
                className={`${styles['form__input']} ${styles['form-tags__input-tag']}`}
                value={tag}
                readOnly
              />
              <button 
                className={`${styles['form-tags_button']} ${styles['form-tags_button--delete']}`} 
                onClick={(e) => deleteTag(e, i)}
              >Delete</button>
            </div>
          ))} 
        </>
          <div className={styles['form-tags']}>
            <input className={`${styles['form__input']} ${styles['form-tags__input-tag']}`} placeholder='Tag'
            {...register('tags', inputValidation)}
            />
            <button className={`${styles['form-tags_button']} ${styles['form-tags_button--delete']}`} onClick={clearInputTag}>Delete</button>
            <button className={`${styles['form-tags_button']} ${styles['form-tags_button--add']}`} onClick={addTag}>Add tag</button>
          </div>
          <div className={styles['form__error-message']}>{errors?.tags && <p>{errors?.tags.message}</p>}</div>
        </label>        
        <button type='onSubmit' className={styles['form__button']}>Save</button>                
      </form>
    </div>
  )
}
