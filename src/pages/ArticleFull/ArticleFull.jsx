import { useGetArticleBySlugQuery } from '../../store/articlesAPI'
import { useParams } from 'react-router-dom'
import { Skeleton, Result } from 'antd'
import Article from '../../сomponents/Article/Article'

export default function ArticleFull() {
  const { slug } = useParams()
  const { data, isLoading, isError } = useGetArticleBySlugQuery(slug)
  const article = data?.article

  return isLoading ? (
    <Skeleton />
  ) : isError ? (
    <Result
      status="404"
      subTitle="Error loading the article. Please try again. The article may have been deleted"
    />
  ) : article ? (
    <Article article={article} isFull />
  ) : null
}
