/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'

import { ReducerApp } from '../../src/08-use-reducer/ReducerApp'
import { useTodos } from '../../src/hooks'

jest.mock('../../src/hooks/useTodos')

describe('Test on <ReducerApp />', () => {
  useTodos.mockReturnValue({
    todos: [
      { id: 1, description: 'Todo #1', done: false },
      { id: 2, description: 'Todo #2', done: true },
    ],
    todosCount: 2,
    pendingTodosCount: 1,
    handleNewTodo: jest.fn(),
    handleDeleteTodo: jest.fn(),
    handleToggleTodo: jest.fn(),
  })

  test('Should show the component correctly', () => {
    render(<ReducerApp />)

    expect(screen.getByText('Todo #1')).toBeTruthy()
    expect(screen.getByText('Todo #2')).toBeTruthy()
    expect(screen.getByRole('textbox')).toBeTruthy()
  })
})
