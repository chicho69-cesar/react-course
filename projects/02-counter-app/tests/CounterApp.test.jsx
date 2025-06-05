/* eslint-disable no-undef */
import { render, screen, fireEvent } from '@testing-library/react'
import { CounterApp } from '../src/CounterApp'

describe('Tests in <CounterApp />', () => {
  const initialValue = 10

  test('should match the snapshot', () => {
    const { container } = render(<CounterApp value={initialValue} />)
    expect(container).toMatchSnapshot()
  })

  test('should display the initial value of 100', () => {
    render(<CounterApp value={100} />)

    expect(screen.getByText(100)).toBeTruthy()
    expect(screen.getByRole('heading', { level: 2 }).innerHTML).toContain('100')
  })

  test('should increment by 1 when the +1 button is clicked', () => {
    render(<CounterApp value={initialValue} />)

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

    fireEvent.click(screen.getByRole('button', { name: 'btn-reset' }))

    expect(screen.getByText(350)).toBeTruthy()
  })
})