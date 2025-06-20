/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { MainApp } from '../../src/09-use-context/MainApp'

describe('Test on <MainApp />', () => {
  test('Should show HomePage', () => {
    /* Cuando queremos hacer pruebas sobre una aplicación que utiliza 
    react router para hacer la navegación dentro de la aplicación, debemos
    de envolver nuestro app renderizada en un MemoryRouter */
    render(
      <MemoryRouter>
        <MainApp />
      </MemoryRouter>
    )

    expect(screen.getByText('HomePage')).toBeTruthy()
  })

  test('Should show LoginPage', () => {
    /* Con la prop initialEntries podemos decir en que url se renderice
    nuestra aplicación */
    render(
      <MemoryRouter initialEntries={['/login']}>
        <MainApp />
      </MemoryRouter>
    )

    expect(screen.getByText('LoginPage')).toBeTruthy()
  })
})
