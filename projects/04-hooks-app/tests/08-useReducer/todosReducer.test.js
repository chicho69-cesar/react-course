/* eslint-disable no-undef */
import { todosReducer } from '../../src/08-use-reducer/todosReducer'

describe('Test on todoReducer', () => {
  const initialState = [
    {
      id: 1,
      description: 'Todo #1',
      done: false,
    }
  ]

  test('Should return the initial state', () => {
    const newState = todosReducer(initialState, {})
    expect(newState).toBe(initialState)
  })

  test('Should add a new todo', () => {
    const action = {
      type: '[TODO] Add Todo',
      payload: {
        id: 2,
        description: 'Todo #2',
        done: false,
      }
    }

    const newState = todosReducer(initialState, action)
    
    expect(newState.length).toBe(2)
    expect(newState).toContain(action.payload)
  })

  test('Should delete a todo', () => {
    const action = {
      type: '[TODO] Remove Todo',
      payload: 1
    }

    const newState = todosReducer(initialState, action)
    expect(newState.length).toBe(0)
  })

  test('Should toggle a todo', () => {
    const action = {
      type: '[TODO] Toggle Todo',
      payload: 1
    }

    const newState1 = todosReducer(initialState, action)
    expect(newState1[0].done).toBe(true)

    const newState2 = todosReducer(newState1, action)
    expect(newState2[0].done).toBe(false)
  })
})
