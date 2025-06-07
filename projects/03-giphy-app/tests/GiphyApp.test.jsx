/* eslint-disable no-undef */
import { render, screen, fireEvent } from '@testing-library/react'
import GiphyApp from '../src/GiphyApp'

describe('Test on <GiphyApp />', () => {
  test('should render the component correctly', () => {
    const { container } = render(<GiphyApp />)
    expect(container).toMatchSnapshot()
  })

  test('should show the title of the app', () => {
    render(<GiphyApp />)
    expect(document.querySelector('h1').innerHTML).toBe('Giphy App!')
  })

  test('should render initial category', () => {
    render(<GiphyApp />)
    expect(screen.getByText('Dragon Ball'))
  })

  test('should show search category', () => {
    const inputValue = 'Goku'

    render(<GiphyApp />)

    const input = screen.getByRole('textbox')
    const form = screen.getByRole('form', { name: 'form' })

    fireEvent.input(input, { target: { value: inputValue } })
    fireEvent.submit(form)

    expect(input.value).toBe('')

    expect(screen.getByText(inputValue))
    expect(screen.getAllByText(inputValue).length).toBe(1)
  })
})
