import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { userValidation, emailValidation, passwordValidation, passwordRepeatValidation, checkboxValidation } from '../../../validation/signUpValidation'
import { useCreateUserMutation } from '../../../store/articlesAPI'
import { Result } from 'antd'

import styles from '../form.module.scss'

export default function SignUp () {

  const [serverError, setServerEror] = useState()
  const [errorStatus, setErrorStatus] = useState()

  const {
    register,
    formState: {errors},
    handleSubmit,
    watch
  } = useForm()

  const [createUser] = useCreateUserMutation()
  
  const onSubmit = async (data) => {
    const {username, email, password} = data
    const userInfo = {'user': {username, email, password}}
    
    try {
      const response = await createUser(userInfo).unwrap()
      console.log(response);
    } catch (error) {
      const err = error.data.errors
      setServerEror(err)
      setErrorStatus(error.status)
    }
    
  }

  const password = watch('password')

  return (
    <>
    {errorStatus && errorStatus !== 422 ? 
      (<Result
        status="500"
        subTitle="An unexpected error occurred. Please refresh the page and try again"
      />)
      :
      (<div className={styles['form-wrap']}>
        <h2 className={styles['login-form__header']}>Create new account</h2>
          <form className={styles['login-form']} onSubmit={handleSubmit(onSubmit)}>
            <label className={styles['login-form__label']}>Username
              <input className={`${styles['login-form__input']} ${errors?.username || serverError?.username ? styles['login-form__input-error'] : ''}`} placeholder='Username'
              {...register('username', userValidation)}
              />
              <div className={styles['login-form__error-message']}>{errors?.username && 
                <p>{errors?.username.message}</p>}
                <p>{serverError?.username && 'This username is already taken'}</p>
              </div>
            </label>
            <label className={styles['login-form__label']}>Email address
               <input className={`${styles['login-form__input']} ${errors?.email || serverError?.email ? styles['login-form__input-error'] : ''}`} placeholder='Email address'
               {...register('email', emailValidation)}/>
              <div className={styles['login-form__error-message']}>{errors?.email && 
                <p>{errors?.email.message}</p>}
                <p>{serverError?.email && 'This email address is already registered'}</p>
              </div>
            </label>
            <label className={styles['login-form__label']} >Password
              <input className={`${styles['login-form__input']} ${errors?.password ? styles['login-form__input-error'] : ''}`} placeholder='Password' type='password'
                {...register('password', passwordValidation)}
              />
              <div className={styles['login-form__error-message']}>{errors?.password && <p>{errors?.password.message}</p>}</div>
            </label>
            <label className={styles['login-form__label']}>Repeat Password
              <input className={`${styles['login-form__input']} ${errors?.repeatPassword ? styles['login-form__input-error'] : ''}`} placeholder='Repeat Password' type='password'
                {...register('repeatPassword', passwordRepeatValidation(password))}
              />
              <div className={styles['login-form__error-message']}>{errors?.repeatPassword && <p>{errors?.repeatPassword.message}</p>}</div>
            </label>
              
            <label className={styles['login-form__label-checkbox']}>
              <input type='checkbox' className={styles['login-form__checkbox']}
                {...register('checkbox', checkboxValidation)}
              />
                I agree to the processing of my personal information
            </label>
            <div className={styles['login-form__error-message']}>{errors?.checkbox && <p>{errors?.checkbox.message}</p>}</div>
            <button className={styles['login-form__button']}>Create</button>
            <p className={styles['login-form__button-text']}>Already have an account?
              <Link className={styles['login-form__link']} to='/sign-in'> Sign In</Link>
            </p>
          </form>
      </div>)}
    </>  
  )
}