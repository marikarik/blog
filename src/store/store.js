import { configureStore } from "@reduxjs/toolkit";
import { articlesAPI } from "./articlesAPI";

const store = configureStore({
  reducer: {
   [ articlesAPI.reducerPath]: articlesAPI.reducer
  },
  middleware: (getDefaultMiddlware) => getDefaultMiddlware().concat(articlesAPI.middleware)
})

export default store