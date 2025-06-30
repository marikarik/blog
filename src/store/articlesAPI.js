import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const articlesAPI = createApi({
  reducerPath: 'articlesAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://blog-platform.kata.academy/api/',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('userToken')
      if(token) {
        headers.set('Authorization', `Token ${token}`)
      }
      return headers
    }
  }),
  tagTypes: ['User'],
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
      query: () => ({
        url: 'user',
      }),
      providesTags: ['User']
    }),
    updateUserInfo: build.mutation({
      query: (data) => ({
        url: 'user',
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['User']
    })
  })
})

export const { useGetArticlesQuery, 
  useGetArticleBySlugQuery, 
  useCreateUserMutation, 
  useUserLoginMutation, 
  useGetUserInfoQuery, 
  useUpdateUserInfoMutation,
  
} = articlesAPI