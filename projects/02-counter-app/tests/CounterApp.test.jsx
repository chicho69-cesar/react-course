/* eslint-disable no-undef */
import { fireEvent, render, screen } from '@testing-library/react'
import { CounterApp } from '../src/CounterApp'

describe('Tests in <CounterApp />', () => {
  const initialValue = 10

  test('should match the snapshot', () => {
    /* La función render lo que hace es renderizar virtualmente nuestro
    componente para poder ejecutar los tests con el. */
    const { container } = render(<CounterApp value={initialValue} />)
    /* La aserción .toMatchSnapshot es la más simple y común en tests de
    componentes, esta lo que hace es comparar si se cambio el código del
    componente desde la ultima vez que se ejecutaron los tests. */
    expect(container).toMatchSnapshot()
  })

  test('should display the initial value of 100', () => {
    render(<CounterApp value={100} />)

    /* Una vez que renderizamos un componente podemos utilizar
    screen para manipular el componente renderizado virtualmente,
    esta variable tiene muchos métodos para extraer elementos del 
    componente renderizado */
    expect(screen.getByText(100)).toBeTruthy()
    /* La función getByRole nos ayuda a recuperar elementos en base a su
    tipo de etiqueta en el DOM, por ejemplo los headings son h1, h2, h3... */
    expect(screen.getByRole('heading', { level: 2 }).innerHTML).toContain('100')
  })

  test('should increment by 1 when the +1 button is clicked', () => {
    render(<CounterApp value={initialValue} />)

    /* fireEvent nos ayuda a lanzar eventos dentro del componente
    renderizado, en este caso se pueden ejecutar clicks, submits de formularios,
    escribir en un input, etc. */
    fireEvent.click(screen.getByText('+1'))
    expect(screen.getByText('11')).toBeTruthy()
  })

  test('should decrement by 1 when the -1 button is clicked', () => {
    render(<CounterApp value={initialValue} />)

    fireEvent.click(screen.getByText('-1'))
    expect(screen.getByText('9')).toBeTruthy()
  })

  test('should reset to the initial value when the reset button is clicked', () => {
    render(<CounterApp value={350} />)

    fireEvent.click(screen.getByText('+1'))
    fireEvent.click(screen.getByText('+1'))
    fireEvent.click(screen.getByText('+1'))

    /* Cuando queremos recuperar un elemento dentro del componente renderizado,
    en este caso como tenemos varios botones podemos recuperar los elementos en
    base a su aria-label. */
    fireEvent.click(screen.getByRole('button', { name: 'btn-reset' }))

    expect(screen.getByText(350)).toBeTruthy()
  })
})