/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { MainApp } from '../../src/09-use-context/MainApp'

describe('Test on <MainApp />', () => {
  test('Should show HomePage', () => {
    render(
      <MemoryRouter>
        <MainApp />
      </MemoryRouter>
    )

    expect(screen.getByText('HomePage')).toBeTruthy()
  })

  test('Should show LoginPage', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <MainApp />
      </MemoryRouter>
    )

    expect(screen.getByText('LoginPage')).toBeTruthy()
  })
})
