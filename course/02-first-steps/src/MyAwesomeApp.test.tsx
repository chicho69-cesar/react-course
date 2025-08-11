import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import MyAwesomeApp from './MyAwesomeApp'

describe('MyAwesomeApp', () => {
  test('Should render the firstName and the lastName', () => {
    const { container } = render(<MyAwesomeApp />)

    const h1 = container.querySelector('h1')
    const h3 = container.querySelector('h3')

    expect(h1?.innerHTML).toContain('Cesar')
    expect(h3?.innerHTML).toContain('Villalobos Olmos')
  })

  test('Should render the firstName and the lastName with screen', () => {
    render(<MyAwesomeApp />)
    screen.debug()

    const name = screen.getByTestId('first-name-title')
    expect(name.innerHTML).toContain('Cesar')
  })

  test('Should match snapshot', () => {
    const { container } = render(<MyAwesomeApp />)
    expect(container).toMatchSnapshot()
  })

  test('Should match snapshot', () => {
    render(<MyAwesomeApp />)
    expect(screen.getByTestId('div-app')).toMatchSnapshot()
  })
})
