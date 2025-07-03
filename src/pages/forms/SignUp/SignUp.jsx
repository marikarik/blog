import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  userValidation,
  emailValidation,
  passwordValidation,
  passwordRepeatValidation,
  checkboxValidation,
} from '../../../validation/validators'
import { useCreateUserMutation, useUserLoginMutation } from '../../../store/articlesAPI'
import { logIn } from '../../../store/authSlice'
import { Result, Alert } from 'antd'

import styles from '../form.module.scss'

export default function SignUp() {
  const [serverError, setServerError] = useState()
  const [errorStatus, setErrorStatus] = useState()
  const [userLogin] = useUserLoginMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm()

  const [createUser, { isSuccess, isLoading }] = useCreateUserMutation()

  const onSubmit = async (data) => {
    const { username, email, password } = data
    const userInfo = { user: { username, email, password } }

    try {
      const responsCreateUser = await createUser(userInfo).unwrap()
      console.log(responsCreateUser);
      const responseUserLogin = await userLogin({user: {email, password}}).unwrap()
      const { token} = responseUserLogin.user
            localStorage.setItem('userToken', token)
            localStorage.setItem('user', JSON.stringify(responseUserLogin.user))
            dispatch(
              logIn({
                isLogged: true,
                token: token,
                user: {
                  username: username,
                  email: email,
                },
              })
            )
            navigate('/')
      
    } catch (error) {
      const err = error.data.errors
      setServerError(err)
      setErrorStatus(error.status)
    }
  }

  const password = watch('password')

  const clearServerError = (fieldName) => {
  if (serverError?.[fieldName]) {
    setServerError((prev) => ({ ...prev, [fieldName]: null }))
  }
}

  return (
    <>
      {errorStatus && errorStatus !== 422 ? (
        <Result
          status="500"
          subTitle="An unexpected error occurred. Please refresh the page and try again"
        />
      ) : (
        <div className={styles['form-wrap']}>
          <h2 className={styles['form__header']}>Create new account</h2>
          <form className={styles['form']} onSubmit={handleSubmit(onSubmit)}>
            <label className={styles['form__label']}>
              Username
              <input
                className={`${styles['form__input']} ${errors?.username || serverError?.username ? styles['login-form__input-error'] : ''}`}
                placeholder="Username"
                {...register('username', userValidation)}
                onChange={(e) => {clearServerError('username')}}
              />
              <div className={styles['form__error-message']}>
                {errors?.username && <p>{errors?.username.message}</p>}
                <p>{serverError?.username && 'This username is already taken'}</p>
              </div>
            </label>
            <label className={styles['form__label']}>
              Email address
              <input
                className={`${styles['form__input']} ${errors?.email || serverError?.email ? styles['login-form__input-error'] : ''}`}
                placeholder="Email address"
                {...register('email', emailValidation)}
              />
              <div className={styles['form__error-message']}>
                {errors?.email && <p>{errors?.email.message}</p>}
                <p>{serverError?.email && 'This email address is already registered'}</p>
              </div>
            </label>
            <label className={styles['form__label']}>
              Password
              <input
                className={`${styles['form__input']} ${errors?.password ? styles['login-form__input-error'] : ''}`}
                placeholder="Password"
                type="password"
                autoComplete="new-password"
                {...register('password', passwordValidation)}
              />
              <div className={styles['form__error-message']}>
                {errors?.password && <p>{errors?.password.message}</p>}
              </div>
            </label>
            <label className={styles['form__label']}>
              Repeat Password
              <input
                className={`${styles['form__input']} ${errors?.repeatPassword ? styles['login-form__input-error'] : ''}`}
                placeholder="Repeat Password"
                type="password"
                autoComplete="new-password"
                {...register('repeatPassword', passwordRepeatValidation(password))}
              />
              <div className={styles['form__error-message']}>
                {errors?.repeatPassword && <p>{errors?.repeatPassword.message}</p>}
              </div>
            </label>

            <label className={styles['form__label-checkbox']}>
              <input
                type="checkbox"
                className={styles['form__checkbox']}
                {...register('checkbox', checkboxValidation)}
              />
              I agree to the processing of my personal information
            </label>
            <div className={styles['form__error-message']}>
              {errors?.checkbox && <p>{errors?.checkbox.message}</p>}
            </div>
            <button disabled={isLoading} className={styles['form__button']}>Create</button>
            <p className={styles['form__button-text']}>
              Already have an account?
              <Link className={styles['form__link']} to="/sign-in">
                {' '}
                Sign In
              </Link>
            </p>
          </form>
        </div>
      )}
    </>
  )
}
