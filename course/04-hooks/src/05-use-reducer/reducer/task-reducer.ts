import * as z from 'zod/v4'

interface Todo {
  id: number
  text: string
  completed: boolean
}

interface TaskState {
  todos: Todo[]
  length: number
  completed: number
  pending: number
}

export type TaskAction =
  | { type: 'ADD_TODO', payload: string }
  | { type: 'UPDATE_TODO', payload: { id: number, text: string } }
  | { type: 'TOGGLE_TODO', payload: number }
  | { type: 'REMOVE_TODO', payload: number }

const todoSchema = z.object({
  id: z.number(),
  text: z.string(),
  completed: z.boolean(),
})

const taskStateSchema = z.object({
  todos: z.array(todoSchema),
  length: z.number(),
  completed: z.number(),
  pending: z.number(),
})

export function getInitialState(): TaskState {
  const localStorageState = localStorage.getItem('tasks-state')

  if (!localStorageState) {
    return {
      todos: [],
      length: 0,
      completed: 0,
      pending: 0,
    }
  }

  const parsedState = JSON.parse(localStorageState)
  const result = taskStateSchema.safeParse(parsedState)

  if (result.error) {
    return {
      todos: [],
      length: 0,
      completed: 0,
      pending: 0,
    }
  }

  return result.data
}

export function taskReducer(state: TaskState, action: TaskAction): TaskState {
  const { type } = action

  switch (type) {
    case 'ADD_TODO': {
      const newTodo: Todo = {
        id: Date.now(),
        text: action.payload,
        completed: false,
      }

      return {
        ...state,
        todos: [...state.todos, newTodo],
        length: state.length + 1,
        pending: state.pending + 1,
      }
    }

    case 'UPDATE_TODO': {
      const updatedTodos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, text: action.payload.text }
        }

        return todo
      })

      return {
        ...state,
        todos: updatedTodos,
      }
    }

    case 'REMOVE_TODO': {
      const currentTodos = state.todos.filter((todo) => todo.id !== action.payload)

      return {
        ...state,
        todos: currentTodos,
        length: state.length - 1,
        completed: currentTodos.filter((todo) => todo.completed).length,
        pending: currentTodos.filter((todo) => !todo.completed).length,
      }
    }

    case 'TOGGLE_TODO': {
      const updatedTodos = state.todos.map((todo) => {
        if (todo.id === action.payload) {
          return {
            ...todo,
            completed: !todo.completed,
          }
        }

        return todo
      })

      return {
        ...state,
        todos: updatedTodos,
        completed: updatedTodos.filter((todo) => todo.completed).length,
        pending: updatedTodos.filter((todo) => !todo.completed).length,
      }
    }

    default: {
      return state
    }
  }
}
