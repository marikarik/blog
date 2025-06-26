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
    }),
    createUser: build.mutation({
      query: (data) => ({
        url: 'users',
        method: 'POST',
        body: data
      })
    }),
    userLogin: build.mutation({
      query: (data) => ({
        url: 'users/login',
        method: 'POST',
        body: data
      })
    }),
    getUserInfo: build.query({
      query: (token) => ({
        url: 'user',
        headers: {
          Authorization: `Token ${token}`
        }
      })
    })
  })
})

export const { useGetArticlesQuery, useGetArticleBySlugQuery, useCreateUserMutation, useUserLoginMutation, useGetUserInfoQuery } = articlesAPI