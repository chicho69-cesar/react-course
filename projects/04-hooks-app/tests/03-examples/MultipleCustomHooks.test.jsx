/* eslint-disable no-undef */
import { fireEvent, render, screen } from '@testing-library/react'

import { MultipleCustomHooks } from '../../src/03-examples/MultipleCustomHooks'
import { useCounter } from '../../src/hooks/useCounter'
import { useFetch } from '../../src/hooks/useFetch'

/* Hacemos mock de nuestros custom hooks */
jest.mock('../../src/hooks/useCounter')
jest.mock('../../src/hooks/useFetch')

describe('Test on <MultipleCustomHooks />', () => {
  /* Creamos un mock de una función para usarla en todos los tests */
  const mockIncrement = jest.fn()

  /* Hacemos un mock del hook useCounter para usar el valor mockeado
  en todos los tests */
  useCounter.mockReturnValue({
    counter: 1,
    increment: mockIncrement
  })

  /* Antes de cada prueba limpiamos los mocks, para que estos regresen a 
  su valor original que definimos previamente */
  beforeEach(() => {
    jest.clearAllMocks()
  })

  /* También existen las funciones beforeAll, afterEach, afterAll */

  test('Should show the default component', () => {
    useFetch.mockReturnValue({
      data: null,
      isLoading: true,
      hasError: null,
    })

    render(<MultipleCustomHooks />)

    expect(screen.getByText('Loading ...'))
    expect(screen.getByText('PokeApi'))

    const nextButton = screen.getByRole('button', { name: 'Next Quote' })
    expect(nextButton.disabled).toBeTruthy()
  })

  test('Should show a pokemon', () => {
    useFetch.mockReturnValue({
      data: {
        name: 'Pikachu',
        sprites: {
          front_default: 'https://example.com/front_default.png',
          front_shiny: 'https://example.com/front_shiny.png',
          back_default: 'https://example.com/back_default.png',
          back_shiny: 'https://example.com/back_shiny.png',
        }
      },
      isLoading: false,
      hasError: null,
    })

    render(<MultipleCustomHooks />)
    expect(screen.getByText('#1 - Pikachu')).toBeTruthy()

    const nextButton = screen.getByRole('button', { name: 'Next Quote' })
    expect(nextButton.disabled).toBeFalsy()
  })

  test('Should call the increment function', () => {
    useFetch.mockReturnValue({
      data: {
        name: 'Pikachu',
        sprites: {
          front_default: 'https://example.com/front_default.png',
          front_shiny: 'https://example.com/front_shiny.png',
          back_default: 'https://example.com/back_default.png',
          back_shiny: 'https://example.com/back_shiny.png',
        }
      },
      isLoading: false,
      hasError: null,
    })

    render(<MultipleCustomHooks />)
    const nextButton = screen.getByRole('button', { name: 'Next Quote' })

    fireEvent.click(nextButton)
    expect(mockIncrement).toHaveBeenCalled()
  })
})
