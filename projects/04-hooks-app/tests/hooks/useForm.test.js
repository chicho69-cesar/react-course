/* eslint-disable no-undef */
import { act, renderHook } from '@testing-library/react'
import { useForm } from '../../src/hooks/useForm'

describe('Test on useForm', () => {
  const initialForm = {
    name: 'Cesar',
    email: 'cesar@google.com'
  }

  test('Should return default values', () => {
    const { result } = renderHook(() => useForm(initialForm))

    expect(result.current).toEqual({
      name: initialForm.name,
      email: initialForm.email,
      formState: initialForm,
      onInputChange: expect.any(Function),
      onResetForm: expect.any(Function)
    })
  })

  test('Should change the name in the form', () => {
    const { result } = renderHook(() => useForm(initialForm))
    const { onInputChange } = result.current

    act(() => {
      onInputChange({ target: { name: 'name', value: 'Juan' } })
    })

    expect(result.current.name).toBe('Juan')
    expect(result.current.formState.name).toBe('Juan')
  })

  test('Should reset the values of the form', () => {
    const { result } = renderHook(() => useForm(initialForm))
    const { onInputChange, onResetForm } = result.current

    act(() => {
      onInputChange({ target: { name: 'name', value: 'Juan' } })
      onResetForm()
    })

    expect(result.current.name).toBe(initialForm.name)
    expect(result.current.formState.name).toBe(initialForm.name)
  })
})
