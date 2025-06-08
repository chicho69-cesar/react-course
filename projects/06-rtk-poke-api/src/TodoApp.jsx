import { useState } from 'react'

import { useGetTodoQuery, /* useGetTodosQuery */ } from './store/apis'

export default function TodoApp() {
  const [todoId, setTodoId] = useState(1)
  // const { data: todos = [], isLoading } = useGetTodosQuery()
  const { data: todo, isLoading } = useGetTodoQuery(todoId)

  const prevTodo = () => {
    if (todoId === 1) return
    setTodoId(todoId - 1)
  }

  const nextTodo = () => {
    setTodoId(todoId + 1)
  }

  return (
    <>
      <h1>
        Todo App
      </h1>

      <hr />

      {isLoading && (<span>Loading...</span>)}

      <pre>
        {JSON.stringify(todo, null, 2)}
      </pre>

      {/* <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <strong> {todo.completed ? 'DONE' : 'PENDING'} </strong>
            {todo.title}
          </li>
        ))}
      </ul> */}

      <button
        disabled={isLoading}
        onClick={prevTodo}
      >
        Prev
      </button>

      <button
        disabled={isLoading}
        onClick={nextTodo}
      >
        Next
      </button>
    </>
  )
}
