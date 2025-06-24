import { useGetArticleBySlugQuery } from "../../store/articlesAPI"
import { useParams } from "react-router-dom"
import { Skeleton } from "antd"
import Article from "../../сomponents/Article/Article"

export default function ArticleFull () {
  const {slug} = useParams()
  const {data, isLoading} = useGetArticleBySlugQuery(slug)
  const article = data?.article

  return (
    isLoading? (<Skeleton/>) :
    article ? (<Article article={article} isFull/>) :
    null
  )

}