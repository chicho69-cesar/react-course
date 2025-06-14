import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'checking', // 'checking', 'authenticated', 'not-authenticated'
    user: {},
    errorMessage: undefined,
  },
  reducers: {
    onChecking: (state) => {
      state.status = 'checking'
      state.user = {}
      state.errorMessage = undefined
    },
    onLogin: (state, action) => {
      const { payload } = action

      state.status = 'authenticated'
      state.user = payload
      state.errorMessage = undefined
    },
    onLogout: (state, action) => {
      const { payload } = action

      state.status = 'not-authenticated'
      state.user = {}
      state.errorMessage = payload || undefined
    },
    clearErrorMessage: (state) => {
      state.errorMessage = undefined
    }
  }
})

export const {
  onChecking,
  onLogin,
  onLogout,
  clearErrorMessage
} = authSlice.actions
