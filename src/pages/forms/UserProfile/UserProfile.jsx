import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { userValidation, emailValidation, newPasswordValidation, urlValidation } from '../../../validation/validators'
import { useUpdateUserInfoMutation, useGetUserInfoQuery } from '../../../store/articlesAPI'

import { Alert, Spin } from 'antd'
import styles from '../form.module.scss'

export default function UserProfile () {
  const [updateUserInfo, {isLoading, isSuccess, isError}] = useUpdateUserInfoMutation()
  const token = localStorage.getItem('userToken')
  const user = localStorage.getItem('user')
  const {username, email} = JSON.parse(user)


  const {
    register,
    formState: {errors},
    handleSubmit,
    reset
  } = useForm()


  const onSubmit = async (data) => {
    const {username, email, newPassword: password, url: image} = data
    const newUserInfo = {'user': {email, username, image, password}}
    try {
      const response = await updateUserInfo(newUserInfo).unwrap()
      localStorage.setItem('user', JSON.stringify(response.user))
      reset({
        username: response.user.username,
        email: response.user.email
      })
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className={styles['form-wrap']}>
      <h2 className={styles['form__header']}>Edit Profile</h2>
      {isLoading ? <Spin style={{marginTop: '50px'}} size="large"/> :
        <form className={styles['form']} onSubmit={handleSubmit(onSubmit)}>
          <label className={styles['form__label']}>Username
            <input className={styles['form__input']} placeholder='Username' defaultValue={username}
              {...register('username', userValidation)}
            />
            <div className={styles['form__error-message']}>{errors?.username && 
              <p>{errors?.username.message}</p>}
            </div>          
          </label>
          <label className={styles['form__label']}>Email address
            <input className={styles['form__input']} placeholder='Email' defaultValue={email}
              {...register('email', emailValidation)}
            />
            <div className={styles['form__error-message']}>{errors?.email && 
              <p>{errors?.email.message}</p>}
            </div> 
          </label>
          <label className={styles['form__label']}>New password
            <input className={styles['form__input']} placeholder='New password'
              {...register('newPassword', newPasswordValidation)}
            />
            <div className={styles['form__error-message']}>{errors?.newPassword && 
              <p>{errors?.newPassword.message}</p>}
            </div>
          </label>
          <label className={styles['form__label']}>Avatar image(url)
            <input className={styles['form__input']} placeholder='Avatar image'
              {...register('url', urlValidation)}
            />
            <div className={styles['form__error-message']}>{errors?.url && 
              <p>{errors?.url.message}</p>}
            </div>
          </label>
          {
            isSuccess ? <Alert style={{borderRadius: '4px', width: '320px'}} message="Data updated successfully" type="info"/> :
            isError ? <Alert style={{borderRadius: '4px', width: '320px'}} message="An error occurred while updating your data" type="error"/>
            : null
          } 
          <button className={styles['form__button']}>Save</button>                
        </form>  
      }   
    </div>
  )
}