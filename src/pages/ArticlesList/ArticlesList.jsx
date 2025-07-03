import Article from '../../сomponents/Article/Article'
import { useGetArticlesQuery } from '../../store/articlesAPI'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Pagination, Skeleton, Result } from 'antd'
import styles from './articlesList.module.scss'

export default function ArticlesList() {
  const [searchParams, setSearchParams] = useSearchParams()
  console.log(searchParams)
  const currentPage = Number(searchParams.get('page')) || 1

  const offset = (currentPage - 1) * 5

  const { data, isLoading, isError } = useGetArticlesQuery(offset)
  const articles = data?.articles
  return (
    <>
      {isLoading && !isError && <Skeleton />}
      {isError ? (
        <Result
          status="500"
          subTitle="An unexpected error occurred. Please refresh the page and try again"
        />
      ) : null}
      {!isLoading && !isError && (
        <>
          <ul className={`${styles.articleList}`}>
            {articles.map((article) => {
              return (
                <li key={article.slug}>
                  <Article article={article} />
                </li>
              )
            })}
          </ul>
          <Pagination
            align="center"
            defaultCurrent={1}
            pageSize={5}
            total={data.articlesCount}
            showSizeChanger={false}
            current={currentPage}
            onChange={(page) => setSearchParams({ page })}
          />
        </>
      )}
    </>
  )
}
