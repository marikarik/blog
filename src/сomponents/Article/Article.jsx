import { Link } from 'react-router-dom'
import Markdown from 'react-markdown'
import { format } from 'date-fns'

import { HeartOutlined } from '@ant-design/icons'
import { Tag } from 'antd'
import styles from './article.module.scss'

export default function ArticlePreview ({article, isFull = false}) {
  const formatDate = (date) => {
    return format(new Date(date), 'MMMM dd, yyyy')
  }

  if(!article) return null
  const {title, description: summary, favoritesCount, tagList, createdAt, body, author, slug} = article
  return (
    <article className={`${styles.article} ${isFull ? styles['article--full'] : ''}`}>
      <div className={`${styles.article__body} ${isFull ? styles['article__body--full'] : ''}`}>
        <div className={`${styles.article__body_info}`}>
          <div className={`${styles.article__header}`}>
            {!isFull ? (
              <Link className={`${styles.article__header_title}`} to={`/articles/${slug}`}>
                {title}
              </Link>) : (
              <h2 className={`${styles.article__header_title}`}>
                {title}
              </h2>
              )
            }
            <HeartOutlined />
            <span>{favoritesCount}</span>
          </div>
          <ul className={`${styles.article__tagsList}`}>
            {tagList.map((tag) => {
              return (
                <li>
                  <Tag>{tag}</Tag>
                </li>
              )
            })}
          </ul>
          <p className={`${styles.article__summary}`}>{summary}</p>
        </div>
        <div className={`${styles.article__meta}`}>
          <div className={`${styles.article__autor}`}>
            <span className={`${styles.article__autor_name}`}>{author.username}</span>
            <span className={`${styles.article__date}`}>{formatDate(createdAt)}</span>
          </div>
          <img className={`${styles.article__autor_image}`} alt='oops' src={author.image}></img>
        </div>
      </div>
      {isFull && (
        <Markdown>{body}</Markdown>
      )} 
    </article>
  )
}

