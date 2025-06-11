import { createSlice  } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'checking', // 'checking', 'not-authenticated', 'authenticated'
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null
  },
  reducers: {
    login: (state, action) => {
      const { payload } = action

      state.status = 'authenticated'
      state.uid = payload.uid
      state.email = payload.email
      state.displayName = payload.displayName
      state.photoURL = payload.photoURL
      state.errorMessage = null
    },
    logout: (state, action) => {
      const { payload } = action

      state.status = 'not-authenticated'
      state.uid = null
      state.email = null
      state.displayName = null
      state.photoURL = null
      state.errorMessage = payload?.errorMessage || null
    },
    checkingCredentials: (state) => {
      state.status = 'checking'
    }
  }
})

export const { checkingCredentials, login, logout } = authSlice.actions
