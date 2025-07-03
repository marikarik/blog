import { Link, useNavigate } from 'react-router-dom'
import Markdown from 'react-markdown'
import { format } from 'date-fns'
import { useDeleteArticleMutation } from '../../store/articlesAPI'

import ButtonLike from '../../сomponents/ButtonLike/ButtonLike'
import { Tag, Popconfirm, Alert } from 'antd'
import styles from './article.module.scss'

export default function ArticlePreview({ article, isFull = false }) {
  const [deleteArticle, { isError }] = useDeleteArticleMutation()
  const navigate = useNavigate()

  const userString = localStorage.getItem('user')
  const user = userString ? JSON.parse(userString) : null
  const nickname = user?.username

  const formatDate = (date) => {
    return format(new Date(date), 'MMMM dd, yyyy')
  }

  const handleDeleteArticle = async (slug) => {
    try {
      await deleteArticle(slug).unwrap()
      navigate('/')
    } catch (err) {
      console.error(err)
    }
  }

  const hahdleEditArticle = (slug) => {
    navigate(`/articles/${slug}/edit`)
  }

  if (!article) return null
  const {
    title,
    description: summary,
    favorited,
    favoritesCount,
    tagList,
    createdAt,
    body,
    author,
    slug,
  } = article
  return (
    <article className={`${styles.article} ${isFull ? styles['article--full'] : ''}`}>
      <div className={`${styles.article__body} ${isFull ? styles['article__body--full'] : ''}`}>
        <div className={`${styles.article__body_info}`}>
          <div className={`${styles.article__header}`}>
            {!isFull ? (
              <Link className={`${styles.article__header_title}`} to={`/articles/${slug}`}>
                {title}
              </Link>
            ) : (
              <h2 className={`${styles.article__header_title}`}>{title}</h2>
            )}
            <ButtonLike favoritesCount={favoritesCount} slug={slug} favorited={favorited} />
            <span className={styles['article__count-likes']}>{favoritesCount}</span>
          </div>
          <ul className={`${styles.article__tagsList}`}>
            {tagList.slice(0, 7).map((tag, i) => {
              return (
                <li key={`${tag} - ${i}`}>
                  <Tag>{tag}</Tag>
                </li>
              )
            })}
          </ul>
          <p className={`${styles.article__summary}`}>{summary}</p>
        </div>
        <div className={`${styles.article__meta}`}>
          <div className={styles['article__meta-wrap']}>
            <div className={`${styles.article__autor}`}>
              <span className={`${styles.article__autor_name}`}>{author.username}</span>
              <span className={`${styles.article__date}`}>{formatDate(createdAt)}</span>
            </div>
            <img className={`${styles.article__autor_image}`} alt="avatar" src={author.image}></img>
          </div>
          {nickname === author.username && isFull ? (
            <div className={styles['article-actions']}>
              <Popconfirm
                placement={'right'}
                description="Are you sure to delete this article?"
                onConfirm={() => {
                  handleDeleteArticle(slug)
                }}
                okText="Yes"
                cancelText="No"
              >
                <button
                  className={`${styles['article-actions__button']} ${styles['article-actions__button-delete']}`}
                >
                  Delete
                </button>
              </Popconfirm>
              <button
                className={`${styles['article-actions__button']} ${styles['article-actions__button-edit']}`}
                onClick={() => {
                  hahdleEditArticle(slug)
                }}
              >
                Edit
              </button>
            </div>
          ) : null}
        </div>
      </div>
      {isFull && <Markdown>{body}</Markdown>}
      {isError && nickname === author.username && isFull ? (
        <Alert
          style={{ marginTop: '15px' }}
          showIcon
          message="Oops! Something went wrong when deleting your article. Please try again"
          type="error"
        />
      ) : null}
    </article>
  )
}
