import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const articlesAPI = createApi({
  reducerPath: 'articlesAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://blog-platform.kata.academy/api/',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('userToken')
      if (token) {
        headers.set('Authorization', `Token ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['User', 'Article'],
  endpoints: (build) => ({
    getArticles: build.query({
      query: (offset) => ({
        url: 'articles',
        params: { limit: 5, offset },
      }),
      providesTags: [{ type: 'Article', id: 'LIST' }],
    }),
    getArticleBySlug: build.query({
      query: (slug) => `articles/${slug}`,
      providesTags: (result, error, slug) => [{ type: 'Article', id: slug }],
    }),
    createUser: build.mutation({
      query: (data) => ({
        url: 'users',
        method: 'POST',
        body: data,
      }),
    }),
    userLogin: build.mutation({
      query: (data) => ({
        url: 'users/login',
        method: 'POST',
        body: data,
      }),
    }),
    getUserInfo: build.query({
      query: () => ({
        url: 'user',
      }),
      providesTags: ['User'],
    }),
    updateUserInfo: build.mutation({
      query: (data) => ({
        url: 'user',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    createArticle: build.mutation({
      query: (data) => ({
        url: 'articles',
        method: 'POST',
        body: { article: data },
      }),
      invalidatesTags: [{ type: 'Article', id: 'LIST' }],
    }),
    deleteArticle: build.mutation({
      query: (slug) => ({
        url: `articles/${slug}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Article', id: 'LIST' }],
    }),
    updateArticle: build.mutation({
      query: ({ slug, data }) => ({
        url: `articles/${slug}`,
        method: 'PUT',
        body: { article: data },
      }),
      invalidatesTags: (result, error, { slug }) => [
        { type: 'Article', id: 'LIST' },
        { type: 'Article', id: slug },
      ],
    }),
    toggleLike: build.mutation({
      query: ({ slug, favorited }) => ({
        url: `articles/${slug}/favorite`,
        method: !favorited ? 'POST' : 'DELETE',
      }),
      invalidatesTags: (result, error, { slug }) => [
        { type: 'Article', id: 'LIST' },
        { type: 'Article', id: slug },
      ],
    }),
  }),
})

export const {
  useGetArticlesQuery,
  useGetArticleBySlugQuery,
  useCreateUserMutation,
  useUserLoginMutation,
  useGetUserInfoQuery,
  useUpdateUserInfoMutation,
  useCreateArticleMutation,
  useDeleteArticleMutation,
  useUpdateArticleMutation,
  useToggleLikeMutation,
} = articlesAPI
