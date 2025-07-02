import { useToggleLikeMutation } from '../../store/articlesAPI'
import { useNavigate } from 'react-router-dom'

import HeartFilled from './HeartFilled.svg?react'
import HeartOutlined from './HeartOutlined.svg?react'
import styles from './buttonLike.module.scss'

export default function ButtonLike({ favorited, slug }) {
  const navigate = useNavigate()
  const [toggleLike] = useToggleLikeMutation()

  const handleToggleLike = async () => {
    if (!localStorage.getItem('userToken')) navigate('/sign-in')
    else {
      await toggleLike({ slug, favorited }).unwrap()
    }
  }
  return (
    <button className={styles['button-like']} onClick={handleToggleLike}>
      {favorited ? <HeartFilled /> : <HeartOutlined />}
    </button>
  )
}
