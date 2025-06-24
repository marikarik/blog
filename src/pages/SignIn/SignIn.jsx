import { Link } from 'react-router-dom'
import styles from './signIn.module.scss'

export default function SignIn () {
  return (
    <div className={styles['form-wrap']}>
      <h2 className={styles['login-form__header']}>Sign In</h2>
      <form className={styles['login-form']}>
        <label className={styles['login-form__label']}>Email address
          <input className={styles['login-form__input']} placeholder='Email address'></input>
        </label>
        <label className={styles['login-form__label']}>Password
          <input className={styles['login-form__input']} placeholder='Password'></input>
        </label>

        <button className={styles['login-form__button']}>Login</button>
        <p>Don’t have an account?
          <Link> Sign Up</Link>
        </p>
      </form>
    </div>
  )
}