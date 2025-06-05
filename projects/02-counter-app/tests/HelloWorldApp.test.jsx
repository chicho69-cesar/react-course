/* eslint-disable no-undef */
import { render } from '@testing-library/react'
import { HelloWorldApp } from '../src/HelloWorldApp'

describe('Test on <HelloWorldApp />', () => {
  test('should show "Hola Mundo!!!" in the h1', () => {
    const title = 'Hola Mundo!!!'
    const { findByRole } = render(<HelloWorldApp />)

    findByRole('heading', { level: 1 }).then((h1) => {
      expect(h1.innerHTML).toContain(title)
    })
  })
})
