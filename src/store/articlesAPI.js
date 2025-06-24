import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const articlesAPI = createApi({
  reducerPath: 'articlesAPI',
  baseQuery: fetchBaseQuery({baseUrl: 'https://blog-platform.kata.academy/api/'}),
  endpoints: (build) => ({
    getArticles: build.query({
      query: (offset) => ({
        url: 'articles',
        params: {limit: 5, offset}
      })
    }),
    getArticleBySlug: build.query({
      query: (slug) => `articles/${slug}`
    })
  })
})

export const { useGetArticlesQuery, useGetArticleBySlugQuery } = articlesAPI