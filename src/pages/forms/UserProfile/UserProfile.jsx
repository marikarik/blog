import styles from '../form.module.scss'

export default function UserProfile () {

  return (
    <div className={styles['form-wrap']}>
      <h2 className={styles['login-form__header']}>Edit Profile</h2>
      <form className={styles['login-form']}>
        <label className={styles['login-form__label']}>Username
          <input className={styles['login-form__input']} placeholder='Username'/>
        </label>
        <label className={styles['login-form__label']}>Email address
          <input className={styles['login-form__input']} placeholder='Email'/>
        </label>
        <label className={styles['login-form__label']}>New password
          <input className={styles['login-form__input']} placeholder='New password'/>
        </label>
        <label className={styles['login-form__label']}>Avatar image(url)
          <input className={styles['login-form__input']} placeholder='Avatar image'/>
        </label>
        <button className={styles['login-form__button']}>Save</button>                
      </form>
    </div>
  )
}