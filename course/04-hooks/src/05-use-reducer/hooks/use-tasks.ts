import { useEffect, useReducer } from "react"
import { getInitialState, taskReducer } from "../reducer/task-reducer"

export default function useTasks() {
  const [state, dispatch] = useReducer(taskReducer, getInitialState())

  useEffect(() => {
    localStorage.setItem('tasks-state', JSON.stringify(state))
  }, [state])

  const addTodo = (text: string) => {
    dispatch({
      type: 'ADD_TODO',
      payload: text,
    })
  }

  const updateTodo = (id: number, text: string) => {
    dispatch({
      type: 'UPDATE_TODO',
      payload: { id, text },
    })
  }

  const toggleTodo = (id: number) => {
    dispatch({
      type: 'TOGGLE_TODO',
      payload: id
    })
  }

  const removeTodo = (id: number) => {
    dispatch({
      type: 'REMOVE_TODO',
      payload: id
    })
  }

  return {
    state,
    
    todos: state.todos,
    length: state.length,
    completed: state.completed,
    pending: state.pending,

    addTodo,
    updateTodo,
    toggleTodo,
    removeTodo,
  }
}