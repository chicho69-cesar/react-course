/* eslint-disable no-undef */
import { act, renderHook } from '@testing-library/react'
import { useCounter } from '../../src/hooks/useCounter'

describe('Test on useCounter', () => {
  test('Should return default values', () => {
    const { result } = renderHook(() => useCounter())
    const { counter, increment, decrement, reset } = result.current

    expect(counter).toBe(10)
    expect(increment).toEqual(expect.any(Function))
    expect(decrement).toEqual(expect.any(Function))
    expect(reset).toEqual(expect.any(Function))
  })

  test('Should generate counter with value 100', () => {
    const { result } = renderHook(() => useCounter(100))
    expect(result.current.counter).toBe(100)
  })

  test('Should increment the counter', () => {
    const { result } = renderHook(() => useCounter(100))
    const { increment } = result.current

    /* Cuando queremos ejecutar funciones que son expuestas por un custom 
    hook, estas funciones deben de ejecutarse dentro del callback de 
    un act, el cual nos va a permitir ejecutar estas funciones */
    act(() => {
      increment()
      increment(2)
    })

    expect(result.current.counter).toBe(103)
  })

  test('Should decrement the counter', () => {
    const { result } = renderHook(() => useCounter(100))
    const { decrement } = result.current

    act(() => {
      decrement()
      decrement(2)
    })

    expect(result.current.counter).toBe(97)
  })

  test('Should reset the counter', () => {
    const { result } = renderHook(() => useCounter(100))
    const { increment, reset } = result.current

    act(() => {
      increment(11)
      reset()
    })

    expect(result.current.counter).toBe(100)
  })
})
