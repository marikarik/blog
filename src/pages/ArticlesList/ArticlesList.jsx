import Article from "../../сomponents/Article/Article"
import { useGetArticlesQuery } from "../../store/articlesAPI"
import { useState } from "react"

import { Pagination, Skeleton, Result } from "antd"
import styles from './articlesList.module.scss'

export default function ArticlesList () {
  const [offset, setOffset] = useState(0)
  const changePage = (page) => {
    setOffset((page - 1) * 5)
  }
  console.log('рисуем список');
  const {data, isLoading, isError} = useGetArticlesQuery(offset)
  const articles = data?.articles
  return (
    
    <>
    {isLoading && !isError && (<Skeleton/>)}
    {isError ? <Result
      status="500"
      subTitle="An unexpected error occurred. Please refresh the page and try again"/>: null
    }
    {!isLoading && !isError && (
      <>
      <ul className={`${styles.articleList}`}>
        {articles.map((article) => {
          return (
            <li key={article.slug}>
              <Article article={article}/>
            </li>)
        })}
      </ul>
      <Pagination align="center" defaultCurrent={1} pageSize={5} total={data.articlesCount} showSizeChanger={false}
      onChange={changePage}/>
      </>
      )
    }
    </>
  )
}