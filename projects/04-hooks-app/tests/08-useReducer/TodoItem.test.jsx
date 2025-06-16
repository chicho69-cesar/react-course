/* eslint-disable no-undef */
import { fireEvent, render, screen } from '@testing-library/react'
import { TodoItem } from '../../src/08-use-reducer/TodoItem'

describe('Test on <TodoItem />', () => {
  const todo = {
    id: 1,
    description: 'Todo #1',
    done: false,
  }

  const onDeleteTodoMock = jest.fn()
  const onToggleTodoMock = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Should show the pending todo', () => {
    render(
      <TodoItem
        todo={todo}
        onDeleteTodo={onDeleteTodoMock}
        onToggleTodo={onToggleTodoMock}
      />
    )

    const liItem = screen.getByRole('listitem')
    expect(liItem.className).toBe('list-group-item d-flex justify-content-between')

    const span = screen.getByLabelText('span')
    expect(span.className).toContain('align-self-center')
    expect(span.className).not.toContain('text-decoration-line-through')
  })

  test('Should show the complete todo', () => {
    todo.done = true

    render(
      <TodoItem
        todo={todo}
        onDeleteTodo={onDeleteTodoMock}
        onToggleTodo={onToggleTodoMock}
      />
    )

    const span = screen.getByLabelText('span')
    expect(span.className).toContain('text-decoration-line-through')
  })

  test('Should call the toggle todo when it is clicked', () => {
    render(
      <TodoItem
        todo={todo}
        onDeleteTodo={onDeleteTodoMock}
        onToggleTodo={onToggleTodoMock}
      />
    )

    const span = screen.getByLabelText('span')

    fireEvent.click(span)
    expect(onToggleTodoMock).toHaveBeenCalledWith(todo.id)
  })

  test('Should call the delete todo when button is clicked', () => {
    render(
      <TodoItem
        todo={todo}
        onDeleteTodo={onDeleteTodoMock}
        onToggleTodo={onToggleTodoMock}
      />
    )

    const button = screen.getByRole('button')

    fireEvent.click(button)
    expect(onDeleteTodoMock).toHaveBeenCalledWith(todo.id)
  })
})
