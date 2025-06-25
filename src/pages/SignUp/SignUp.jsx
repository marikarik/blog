import { Link } from 'react-router-dom'
import { Checkbox } from 'antd'
import { useForm } from 'react-hook-form'
import { userValidation, emailValidation, passwordValidation, passwordRepeatValidation, checkboxValidation } from '../../validation/signUpValidation'

import styles from './signUp.module.scss'

export default function SignUp () {
  const {
    register,
    formState: {errors},
    handleSubmit,
    watch
  } = useForm()

  const onSubmit = (data) => {
    console.log(JSON.stringify(data))
  }

  const password = watch('password')

  return (
    <div className={styles['form-wrap']}>
      <h2 className={styles['login-form__header']}>Create new account</h2>
        <form className={styles['login-form']} onSubmit={handleSubmit(onSubmit)}>
          <label className={styles['login-form__label']}>Username
            <input className={`${styles['login-form__input']} ${errors?.username ? styles['login-form__input-error'] : ''}`} placeholder='Username'
            {...register('username', userValidation)}
            />
            <div className={styles['login-form__error-message']}>{errors?.username && <p>{errors?.username.message}</p>}</div>
          </label>
          <label className={styles['login-form__label']}>Email address
            <input className={`${styles['login-form__input']} ${errors?.email ? styles['login-form__input-error'] : ''}`} placeholder='Email address'
            {...register('email', emailValidation)}/>
            <div className={styles['login-form__error-message']}>{errors?.email && <p>{errors?.email.message}</p>}</div>
          </label>
          <label className={styles['login-form__label']}>Password
            <input className={`${styles['login-form__input']} ${errors?.password ? styles['login-form__input-error'] : ''}`} placeholder='Password'
              {...register('password', passwordValidation)}
            />
            <div className={styles['login-form__error-message']}>{errors?.password && <p>{errors?.password.message}</p>}</div>
          </label>
          <label className={styles['login-form__label']}>Repeat Password
            <input className={`${styles['login-form__input']} ${errors?.repeatPassword ? styles['login-form__input-error'] : ''}`} placeholder='Repeat Password'
              {...register('repeatPassword', passwordRepeatValidation(password))}
            />
            <div className={styles['login-form__error-message']}>{errors?.repeatPassword && <p>{errors?.repeatPassword.message}</p>}</div>
          </label>
          
          <label className={styles['login-form__label-checkbox']}>
            <input type='checkbox' className={styles['login-form__checkbox']}
              {...register('checkbox', checkboxValidation)}
            />
            I agree to the processing of my personal information
            {/* <div>{errors?.checkbox && <p>{errors?.checkbox.message}</p>}</div> */}
          </label>
          <div className={styles['login-form__error-message']}>{errors?.checkbox && <p>{errors?.checkbox.message}</p>}</div>
          <button className={styles['login-form__button']}>Create</button>
          <p className={styles['login-form__button-text']}>Already have an account?
            <Link className={styles['login-form__link']} to='/sign-in'> Sign In</Link>
          </p>
        </form>
    </div>
  )
}