import { Link, Outlet } from "react-router-dom"
import styles from './layout.module.scss'

export default function Layout () {
  return (
    <>
      <header className={`${styles.header}`}>
        <Link to='/' className={`${styles.header__link}`}>Realworld Blog</Link>
        <Link to='/sign-in' className={`${styles.header__link}`}>Sign In</Link>
        <Link to='/sign-up' className={`${styles.header__link_signup}`}>Sign Up</Link>
      </header>
      <main className={`${styles.main_page}`}>
         <Outlet/> 
      </main>
    </>
  )
}