import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    counter: 10,
    times: 0,
  },
  reducers: {
    increment: (state) => {
      state.counter += 1
    },
    incrementBy: (state, action) => {
      state.counter += action.payload
    },
    decrement: (state) => {
      state.counter -= 1
    },
    decrementBy: (state, action) => {
      state.counter -= action.payload
    },
  }
})

export const { decrement, decrementBy, increment, incrementBy } = counterSlice.actions
