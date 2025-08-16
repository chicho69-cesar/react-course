import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, test, vi } from "vitest"
import MyCounterApp from "./my-counter-app"

const handleAddMock = vi.fn()
const handleSubtractMock = vi.fn()
const handleResetMock = vi.fn()

vi.mock("../hooks/use-counter.ts", () => ({
  useCounter: () => ({
    counter: 10,
    handleAdd: handleAddMock,
    handleSubtract: handleSubtractMock,
    handleReset: handleResetMock,
  })
}))

describe("MyCounterApp", () => {
  test("Should render the component", () => {
    render(<MyCounterApp />)

    expect(screen.getByRole('heading', { level: 1 }).innerHTML).toContain(
      `counter: 10`
    )

    expect(screen.getByRole('button', { name: '+1' })).toBeDefined()
    expect(screen.getByRole('button', { name: '-1' })).toBeDefined()
    expect(screen.getByRole('button', { name: 'Reset' })).toBeDefined()
  })

  test("Should increment the counter", () => {
    render(<MyCounterApp />)

    const labelH1 = screen.getByRole('heading', { level: 1 })
    const button = screen.getByRole('button', { name: '+1' })

    fireEvent.click(button)

    expect(labelH1.innerHTML).toContain(`counter: 11`)
  })

  test("Should decrement the counter", () => {
    render(<MyCounterApp />)

    const labelH1 = screen.getByRole('heading', { level: 1 })
    const button = screen.getByRole('button', { name: '-1' })

    fireEvent.click(button)

    expect(labelH1.innerHTML).toContain(`counter: 9`)
  })

  test("Should call actions", () => {
    render(<MyCounterApp />)

    const addButton = screen.getByRole('button', { name: '+1' })
    const subtractButton = screen.getByRole('button', { name: '-1' })
    const resetButton = screen.getByRole('button', { name: 'Reset' })

    fireEvent.click(addButton)
    expect(handleAddMock).toHaveBeenCalled()
    expect(handleAddMock).toHaveBeenCalledTimes(1)

    fireEvent.click(subtractButton)
    expect(handleSubtractMock).toHaveBeenCalled()
    expect(handleSubtractMock).toHaveBeenCalledTimes(1)

    fireEvent.click(resetButton)
    expect(handleResetMock).toHaveBeenCalled()
    expect(handleResetMock).toHaveBeenCalledTimes(1)
  })
})
