import { act, renderHook } from "@testing-library/react"
import { describe, expect, test } from "vitest"
import useCounter from "./use-counter"

describe("useCounter", () => {
  // let result

  // beforeEach(() => {
  //   const { result: hookValue } = renderHook(() => useCounter())
  //   result = hookValue
  // })

  test("Should initialize with a count of 10", () => {
    const { result } = renderHook(() => useCounter())
    expect(result.current.counter).toBe(10)
  })

  test("Should initialize with value of 20", () => {
    const initialValue = 20
    const { result } = renderHook(() => useCounter(initialValue))
    expect(result.current.counter).toBe(initialValue)
  })

  test("Should increment the counter by 1", () => {
    const { result } = renderHook(() => useCounter())

    act(() => {
      result.current.handleAdd()
    })

    expect(result.current.counter).toBe(11)
  })

  test("Should decrement counter when handleSubtract is called", () => {
    const { result } = renderHook(() => useCounter())

    act(() => {
      result.current.handleSubtract()
    })

    expect(result.current.counter).toBe(9)
  })

  test("Should reset to initialValue the counter when handleReset is called", () => {
    const { result } = renderHook(() => useCounter())

    act(() => {
      result.current.handleSubtract()
      result.current.handleSubtract()
      result.current.handleSubtract()
      result.current.handleSubtract()
      result.current.handleSubtract()
    })

    expect(result.current.counter).toBe(5)

    act(() => {
      result.current.handleReset()
    })

    expect(result.current.counter).toBe(10)
  })
})
