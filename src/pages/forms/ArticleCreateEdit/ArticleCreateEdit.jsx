import { useForm } from 'react-hook-form'
import { inputTagValidation, inputValidation } from '../../../validation/validators'
import { useState, useEffect } from 'react'
import {
  useCreateArticleMutation,
  useGetArticleBySlugQuery,
  useUpdateArticleMutation,
} from '../../../store/articlesAPI'
import { useNavigate, useParams } from 'react-router-dom'

import { Alert, Spin, Result } from 'antd'
import styles from '../form.module.scss'

export default function AcrticleCreate({ isEdit }) {
  const navigate = useNavigate()
  const { slug } = useParams()
  const [tagList, setTagList] = useState([])
  const [createArticle, { isError, isLoading }] = useCreateArticleMutation()
  const { data, isError: isErrorGetArticle } = useGetArticleBySlugQuery(slug, { skip: !slug })
  const [updateArticle, { isLoading: isLoadingUpdateArticle, isError: isErrorUpdateArticle }] =
    useUpdateArticleMutation()

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    resetField,
    reset,
  } = useForm({ defaultValues: { title: '', description: '', body: '' } })

  useEffect(() => {
    if (isEdit && data?.article) {
      const { title, description, body, tagList } = data.article
      reset({ title, description, body })
      setTagList(tagList || [])
    }
  }, [data])

  const tagValue = watch('tags')

  const addTag = (evt) => {
    evt.preventDefault()
    const inputTrim = tagValue.trim()
    if (inputTrim) {
      setTagList([inputTrim, ...tagList])
      resetField('tags')
    }
  }

  const deleteTag = (evt, i) => {
    evt.preventDefault()
    setTagList(tagList.filter((_, index) => index !== i))
  }

  const clearInputTag = (evt) => {
    evt.preventDefault()
    resetField('tag')
  }

  const onSubmit = async (data) => {
    const { body, description, title } = data
    try {
      let response
      if (!isEdit) response = await createArticle({ body, description, title, tagList }).unwrap()
      else
        response = await updateArticle({
          slug,
          data: { body, description, title, tagList },
        }).unwrap()
      const article = response.article
      navigate(`/articles/${article.slug}`)
    } catch (err) {
      console.error(err)
    }
  }

  return isErrorGetArticle ? (
    <Result
      status="404"
      subTitle="Error loading the article. Please try again. The article may have been deleted"
    />
  ) : (
    <div className={`${styles['form-wrap']} ${styles['create-article-form-wrap']}`}>
      {!isEdit ? (
        <h2 className={styles['form__header']}>Create new article</h2>
      ) : (
        <h2 className={styles['form__header']}>Edit article</h2>
      )}
      {isLoading || isLoadingUpdateArticle ? (
        <Spin style={{ marginTop: '50px' }} size="large" />
      ) : (
        <form
          className={`${styles['form']} ${styles[`create-article-form`]}`}
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className={`${styles['form__label']} ${styles['create-article-form__label']}`}>
            Title
            <input
              className={`${styles['form__input']} ${styles['create-article-form__input']}`}
              placeholder="Title"
              {...register('title', inputValidation)}
            />
            <div className={styles['form__error-message']}>
              {errors?.title && <p>{errors?.title.message}</p>}
            </div>
          </label>
          <label className={`${styles['form__label']} ${styles['create-article-form__label']}`}>
            Short description
            <input
              className={`${styles['form__input']} ${styles['create-article-form__input']}`}
              placeholder="Description"
              {...register('description', inputValidation)}
            />
            <div className={styles['form__error-message']}>
              {errors?.description && <p>{errors?.description.message}</p>}
            </div>
          </label>
          <label
            className={`${styles['form__label']} ${styles['create-article-form__label-textarea']}`}
          >
            Text
            <textarea
              className={`${styles['form__input']} ${styles['create-article-form__textarea']}`}
              placeholder="Text"
              {...register('body', inputValidation)}
            />
            <div className={styles['form__error-message']}>
              {errors?.body && <p>{errors?.body.message}</p>}
            </div>
          </label>
          <label className={`${styles['form__label']} ${styles['label-tags-wrap']}`}>
            Tags
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
                  >
                    Delete
                  </button>
                </div>
              ))}
            </>
            <div className={styles['form-tags']}>
              <input
                className={`${styles['form__input']} ${styles['form-tags__input-tag']}`}
                placeholder="Tag"
                {...register('tags', inputTagValidation)}
              />
              <button
                className={`${styles['form-tags_button']} ${styles['form-tags_button--delete']}`}
                onClick={clearInputTag}
                type="button"
              >
                Delete
              </button>
              <button
                className={`${styles['form-tags_button']} ${styles['form-tags_button--add']}`}
                onClick={addTag}
                type="button"
              >
                Add tag
              </button>
            </div>
            <div className={styles['form__error-message']}>
              {errors?.tags && <p>{errors?.tags.message}</p>}
            </div>
          </label>
          {isError ? (
            <Alert
              showIcon
              message="Oops! Something went wrong when creating your article. Please try again"
              type="error"
            />
          ) : isErrorUpdateArticle ? (
            <Alert
              showIcon
              message="Oops! Something went wrong when updeting your article. Please try again"
              type="error"
            />
          ) : null}
          <button type="onSubmit" className={styles['form__button']}>
            Save
          </button>
        </form>
      )}
    </div>
  )
}
