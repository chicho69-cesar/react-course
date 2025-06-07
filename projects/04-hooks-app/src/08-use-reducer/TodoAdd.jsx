import { useForm } from "../hooks"

export const TodoAdd = ({ onNewTodo }) => {
  const { description, onInputChange, onResetForm } = useForm({
    description: ''
  })

  const handleFormSubmit = (event) => {
    event.preventDefault()

    const newTodo = {
      id: new Date().getTime(),
      description: description.trim(),
      done: false
    }

    onNewTodo(newTodo)
    onResetForm()
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        placeholder="¿Qué hay que hacer?"
        className="form-control"
        name="description"
        value={description}
        onChange={onInputChange}
      />

      <button
        type="submit"
        className="btn btn-outline-primary mt-1"
      >
        Agregar
      </button>
    </form>
  )
}
