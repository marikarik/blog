import { Link } from "react-router-dom"
import { useGetUserInfoQuery } from "../../store/articlesAPI"

import styles from './header.module.scss'
import { Button } from "antd"

export default function Header () {
  const token = localStorage.getItem('userToken')
  const {data, isLoading, isError} = useGetUserInfoQuery(token, {skip: !token})
  console.log(data);

  return (
    <header className={`${styles.header}`}>
      <Link to='/' className={`${styles.header__link}`}>Realworld Blog</Link>
      
      {!data ? (
        <>
          <Link to='/sign-in' className={`${styles.header__link}`}>Sign In</Link>
          <Link to='/sign-up' className={`${styles.header__link_signup} ${styles.header__button_create}`}>Sign Up</Link>
        </>) : 
        (
          <>
            <Link to='/' className={`${styles.header__link_createArticle} ${styles.header__button_create}`}>Create article</Link>
            <Link to='/user-profile' className={styles['header__user']}>
              <div className={styles['header__user-name']}>{data.user.username}</div>
              <img src='#' className={styles['header__user-img']} alt='image user'/>
            </Link>
            <button className={styles['header__button-logout']}>Log Out</button>
          </>
        )
      }
      
    </header>
  )
}