import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { emailValidation, passwordValidation } from '../../validation/signInValidation'

import styles from './signIn.module.scss'

export default function SignIn () {
  const {
    register,
    formState: {
      errors,
    },
    handleSubmit,
    watch
  } = useForm()

  const onSubmit = (data) => {
    console.log(JSON.stringify(data))
  }
  

  return (
    <div className={styles['form-wrap']}>
      <h2 className={styles['login-form__header']}>Sign In</h2>
      <form className={styles['login-form']} onSubmit={handleSubmit(onSubmit)}>
        <label className={styles['login-form__label']}>Email address
          <input className={`${styles['login-form__input']} ${errors?.email ? styles['login-form__input-error'] : ''}`} placeholder='Email address'
            {...register('email', emailValidation)}
          />
          <div className={styles['login-form__error-message']}>{errors?.email && <p>{errors?.email.message}</p>}</div>
        </label>
        
        <label className={styles['login-form__label']}>Password
          <input className={`${styles['login-form__input']} ${errors?.password ? styles['login-form__input-error'] : ''}`} type='password' placeholder='Password'
            {...register('password', passwordValidation)}
          />
          <div className={styles['login-form__error-message']}>{errors?.password && <p>{errors?.password.message}</p>}</div>
        </label>

        <button type='submit' className={styles['login-form__button']}>Login</button>
        <p className={styles['login-form__button-text']}>Don’t have an account?
          <Link className={styles['login-form__link']} to='/sign-up'> Sign Up</Link>
        </p>
      </form>
    </div>
  )
}