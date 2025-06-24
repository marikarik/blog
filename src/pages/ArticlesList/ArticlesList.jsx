import Article from "../../сomponents/Article/Article"
import { Pagination, Skeleton } from "antd"
import { useGetArticlesQuery } from "../../store/articlesAPI"
import { useState } from "react"

import styles from './articlesList.module.scss'

export default function ArticlesList () {
  const [offset, setOffset] = useState(0)
  const changePage = (page) => {
    setOffset((page - 1) * 5)
  }
  console.log('рисуем список');
  const {data, isLoading, isError} = useGetArticlesQuery(offset)
  const articles = data?.articles
  // console.log(data.articlesCount);
  return (
    <>
    {!articles && (<Skeleton/>)}
    {!isLoading && (      
      <ul className={`${styles.articleList}`}>
        {articles.map((article) => {
          return (
            <li key={article.slug}>
              <Article article={article}/>
            </li>)
        })}
      </ul>)}
    {!isLoading && (<Pagination align="center" defaultCurrent={1} pageSize={5} total={data.articlesCount} showSizeChanger={false}
      onChange={changePage}/>)}
    </>
  )
}