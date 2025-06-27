import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { emailValidation, passwordValidation } from '../../../validation/signInValidation'
import { useUserLoginMutation } from '../../../store/articlesAPI'

import styles from '../form.module.scss'

export default function SignIn () {
  const {
    register,
    formState: {
      errors,
    },
    handleSubmit,
    
  } = useForm()

  const [userLogin] = useUserLoginMutation()
  const navigate = useNavigate()

  const onSubmit = async(data) => {
    const user = {'user': data}
    try {
      const response = await userLogin(user).unwrap()
      const token = response.user.token
      navigate('/')
      localStorage.setItem('userToken', token)
      // console.log(userInfo)
    } catch (error) {
      console.log(error);
    }
  }
  

  return (
    <div className={styles['form-wrap']}>
      <h2 className={styles['form__header']}>Sign In</h2>
      <form className={styles['form']} onSubmit={handleSubmit(onSubmit)}>
        <label className={styles['form__label']}>Email address
          <input className={`${styles['form__input']} ${errors?.email ? styles['login-form__input-error'] : ''}`} placeholder='Email address'
            {...register('email', emailValidation)}
          />
          <div className={styles['form__error-message']}>{errors?.email && <p>{errors?.email.message}</p>}</div>
        </label>
        
        <label className={styles['form__label']}>Password
          <input className={`${styles['form__input']} ${errors?.password ? styles['login-form__input-error'] : ''}`} type='password' placeholder='Password'
            {...register('password', passwordValidation)}
          />
          <div className={styles['form__error-message']}>{errors?.password && <p>{errors?.password.message}</p>}</div>
        </label>

        <button type='submit' className={styles['form__button']}>Login</button>
        <p className={styles['form__button-text']}>Don’t have an account?
          <Link className={styles['form__link']} to='/sign-up'> Sign Up</Link>
        </p>
      </form>
    </div>
  )
}