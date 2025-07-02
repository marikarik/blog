import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import {
  userValidation,
  emailValidation,
  passwordValidation,
  passwordRepeatValidation,
  checkboxValidation,
} from '../../../validation/validators'
import { useCreateUserMutation } from '../../../store/articlesAPI'
import { Result, Alert } from 'antd'

import styles from '../form.module.scss'

export default function SignUp() {
  const [serverError, setServerEror] = useState()
  const [errorStatus, setErrorStatus] = useState()

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm()

  const [createUser, { isSuccess }] = useCreateUserMutation()

  const onSubmit = async (data) => {
    const { username, email, password } = data
    const userInfo = { user: { username, email, password } }

    try {
      await createUser(userInfo).unwrap()
    } catch (error) {
      const err = error.data.errors
      setServerEror(err)
      setErrorStatus(error.status)
    }
  }

  const password = watch('password')

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
                className={styles['login-form__checkbox']}
                {...register('checkbox', checkboxValidation)}
              />
              I agree to the processing of my personal information
            </label>
            <div className={styles['form__error-message']}>
              {errors?.checkbox && <p>{errors?.checkbox.message}</p>}
            </div>
            {isSuccess ? (
              <Alert
                message="Registration successful! You can now log in to your profiless Text"
                type="success"
              />
            ) : null}
            <button className={styles['form__button']}>Create</button>
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
