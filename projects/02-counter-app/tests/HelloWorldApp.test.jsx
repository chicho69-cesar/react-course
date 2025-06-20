/* eslint-disable no-undef */
import { render } from '@testing-library/react'
import { HelloWorldApp } from '../src/HelloWorldApp'

describe('Test on <HelloWorldApp />', () => {
  test('should show "Hola Mundo!!!" in the h1', () => {
    const title = 'Hola Mundo!!!'
    /* Cuando renderizamos un componente podemos recuperar las funciones
    que tenemos disponibles en screen */
    const { findByRole } = render(<HelloWorldApp />)

    /* Cuando usamos funciones findBy, estas nos regresas los elementos
    del DOM pero en formato promesa, por que o usamos promesas, o tener el 
    test asíncrono */
    findByRole('heading', { level: 1 }).then((h1) => {
      expect(h1.innerHTML).toContain(title)
      done()
    })
  })
})
