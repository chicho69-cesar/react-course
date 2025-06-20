/* eslint-disable no-undef */
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { SearchPage } from '../../../src/heroes'

const mockNavigate = jest.fn()

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigate,
}))

describe('Test on <SearchPage />', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Should show with default values', () => {
    const { container } = render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    )

    expect(container).toMatchSnapshot()
  })

  test('Should show a hero an input value with query string', () => {
    render(
      <MemoryRouter initialEntries={['/search?q=batman']}>
        <SearchPage />
      </MemoryRouter>
    )

    const input = screen.getByRole('textbox')
    expect(input.value).toBe('batman')

    const img = screen.getByRole('img')
    expect(img.src).toContain('/heroes/dc-batman.jpg')

    const alert = screen.getByLabelText('alert-danger')
    expect(alert.style.display).toBe('none')
  })

  test('Should show an error if hero is not found', () => {
    render(
      <MemoryRouter initialEntries={['/search?q=batman123']}>
        <SearchPage />
      </MemoryRouter>
    )

    const alert = screen.getByLabelText('alert-danger')
    expect(alert.style.display).toBe('')
  })

  test('Should call navigate to the new value', () => {
    const inputValue = 'superman'

    render(
      <MemoryRouter initialEntries={['/search']}>
        <SearchPage />
      </MemoryRouter>
    )

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: inputValue, name: 'searchText' } })

    const form = screen.getByRole('form')
    fireEvent.submit(form)

    expect(mockNavigate).toHaveBeenCalledWith(`?q=${inputValue.toLowerCase().trim()}`)
  })
})
