import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isLogged: false,
  token: null,
  userInfo: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn (state, action) {
    state.isLogged = action.payload.isLogged
    state.token = action.payload.token
    state.userInfo = action.payload.user
    },
    logOut (state) {
      state.isLogged = false
      state.token = null
      state.userInfo = null
    }
  }
})

export const {logIn, logOut} = authSlice.actions

export default authSlice.reducer