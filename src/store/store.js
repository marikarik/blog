import { configureStore } from "@reduxjs/toolkit";
import { articlesAPI } from "./articlesAPI";
import authReducer from './authSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
   [ articlesAPI.reducerPath]: articlesAPI.reducer,
  },
  middleware: (getDefaultMiddlware) => getDefaultMiddlware().concat(articlesAPI.middleware)
})

export default store