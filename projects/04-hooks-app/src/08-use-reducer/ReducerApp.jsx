import { useTodos } from '../hooks'
import { TodoAdd } from './TodoAdd'
import { TodoList } from './TodoList'

export const ReducerApp = () => {
  const { todos, todosCount, pendingTodosCount, handleNewTodo, handleDeleteTodo, handleToggleTodo } = useTodos()

  return (
    <>
      <h1>
        Todo App: {todosCount}, <small>Pending: {pendingTodosCount}</small>
      </h1>

      <hr />

      <div className="row">
        <div className="col-7">
          <TodoList
            todos={todos}
            onDeleteTodo={handleDeleteTodo}
            onToggleTodo={handleToggleTodo}
          />
        </div>

        <div className="col-5">
          <h4>
            Agregar Todo
          </h4>

          <hr />

          <TodoAdd
            onNewTodo={handleNewTodo}
          />
        </div>
      </div>
    </>
  )
}
