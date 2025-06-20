/* eslint-disable no-undef */
import { render } from '@testing-library/react'
import { FirstApp } from '../src/FirstApp'

describe('Test on <FirstApp />', () => {
  test('should be match with the snapshot', () => {
    const title = 'Hola, soy Goku'
    const subtitle = 'Soy un subtitulo'
    const name = 'Goku'

    const { container } = render(
      <FirstApp title={title} subtitle={subtitle} name={name} />
    )

    expect(container).toMatchSnapshot()
  })

  test('should show title on h1', () => {
    const title = 'Hola, soy Goku'
    const subtitle = 'Soy un subtitulo'
    const name = 'Goku'

    const { getByText, getByTestId } = render(
      <FirstApp title={title} subtitle={subtitle} name={name} />
    )

    expect(getByText(title)).toBeTruthy()
    /* Extraemos el elemento del DOM en base a su data-testid */
    expect(getByTestId('test-title').innerHTML).toContain(title)
  })

  test('should show the subtitle send by props', () => {
    const title = 'Hola, soy Goku'
    const subtitle = 'Soy un subtitulo'
    const name = 'Goku'

    const { getAllByText } = render(
      <FirstApp title={title} subtitle={subtitle} name={name} />
    )

    expect(getAllByText(subtitle).length).toBe(2)
  })
})
