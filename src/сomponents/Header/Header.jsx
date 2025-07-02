import { Link, useNavigate } from "react-router-dom"
import { useGetUserInfoQuery } from "../../store/articlesAPI"
import { useSelector, useDispatch } from "react-redux"
import { logIn, logOut } from "../../store/authSlice" 
import { useEffect } from "react"
 
import avatar from './avatar.png'
import styles from './header.module.scss'



export default function Header () {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {isLogged,  userInfo} = useSelector(state => state.auth)
  const token = localStorage.getItem('userToken')

  const {data, isLoading, isError, isSuccess} = useGetUserInfoQuery(token, {skip: !token})
  console.log(data);


  useEffect(() => {
    if (isSuccess && data?.user) {
      dispatch(logIn({
        isLogged: true,
        token: data.user.token,
        user: {
          username: data.user.username,
          email: data.user.email
        }
      }))
    }
} , [isSuccess, dispatch, data])

  const handleLogOut = () => {
    localStorage.clear()
    dispatch(logOut())
    navigate('/')
  }


  return (
    <header className={`${styles.header}`}>
      <Link to='/' className={`${styles.header__link}`}>Realworld Blog</Link>
      
      {!isLogged ? (
        <>
          <Link to='/sign-in' className={`${styles.header__link}`}>Sign In</Link>
          <Link to='/sign-up' className={`${styles.header__link_signup} ${styles.header__button_create}`}>Sign Up</Link>
        </>) : 
        (
          <>
            <Link to='/create-article' className={`${styles.header__link_createArticle} ${styles.header__button_create}`}>Create article</Link>
            <Link to='/user-profile' className={styles['header__user']}>
              <div className={styles['header__user-name']}>{userInfo.username}</div>
              <img src={data.user.image || avatar} className={styles['header__user-img']} alt='image user'/>
            </Link>
            <button className={styles['header__button-logout']} onClick={handleLogOut}>Log Out</button>
          </>
        )
      }
      
    </header>
  )
}