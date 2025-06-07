export const todosReducer = (state = [], action) => {
  const { type, payload } = action

  switch (type) {
    case '[TODO] Add Todo':
      return [...state, payload]

    case '[TODO] Remove Todo':
      return state.filter((todo) => todo.id !== payload)

    case '[TODO] Toggle Todo':
      return state.map((todo) => {
        if (todo.id !== payload) return todo

        return {
          ...todo,
          done: !todo.done
        }
      })
    
    default:
      return state
  }
}
