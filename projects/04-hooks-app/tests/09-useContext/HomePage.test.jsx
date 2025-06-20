/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import { UserContext } from '../../src/09-use-context/context/UserContext'
import { HomePage } from '../../src/09-use-context/HomePage'

describe('Test on <HomePage />', () => {
  const user = {
    id: 1,
    name: 'Cesar'
  }

  test('Should show the component without user', () => {
    /* Si nuestra aplicación necesita de un contexto para funcionar, ya que
    requiere el valor del estado del contexto, podemos envolver el 
    elemento que queremos probar dentro de dicho contexto */
    render(
      <UserContext.Provider value={{ user: null }}>
        <HomePage />
      </UserContext.Provider>
    )

    const preTag = screen.getByLabelText('pre')
    expect(preTag.innerHTML).toBe('null')
  })

  test('Should show the component with user', () => {
    render(
      <UserContext.Provider value={{ user }}>
        <HomePage />
      </UserContext.Provider>
    )

    const preTag = screen.getByLabelText('pre')
    expect(preTag.innerHTML).toContain(user.name)
    expect(preTag.innerHTML).toContain(`${user.id}`)
  })
})
