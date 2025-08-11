import { render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'
import App from './App'

// vi.mock('./shopping-cart/ItemCounter.tsx', () => ({
//   ItemCounter: () => <div data-testid='ItemCounter' />,
// }))

// vi.mock('./shopping-cart/ItemCounter.tsx', () => ({
//   default: () => <div data-testid='ItemCounter' />,
// }))

const mockItemCounter = vi.fn((props: unknown) => {
  console.log('Mocked ItemCounter called with props:', props)
  return <div data-testid='ItemCounter' />
})

vi.mock('./shopping-cart/ItemCounter.tsx', () => ({
  default: (props: unknown) => mockItemCounter(props),
}))

describe('App', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  test('Should match snapshot', () => {
    const { container } = render(<App />)
    expect(container).toMatchSnapshot()
  })

  test('should render the correct number of ItemCounter components', () => {
    render(<App />)

    const itemCounters = screen.getAllByTestId('ItemCounter')

    expect(itemCounters.length).toBe(4)
    screen.debug()
  })

  test('Should render ItemCounter with correct props', () => {
    render(<App />)

    expect(mockItemCounter).toHaveBeenCalledTimes(4)

    expect(mockItemCounter).toHaveBeenCalledWith({
      name: 'Nintendo Switch 2',
      quantity: 1,
    })

    expect(mockItemCounter).toHaveBeenCalledWith({
      name: 'Pro Controller',
      quantity: 2,
    })

    expect(mockItemCounter).toHaveBeenCalledWith({
      name: 'Super Smash',
      quantity: 3,
    })

    expect(mockItemCounter).toHaveBeenCalledWith({
      name: 'Super Mario',
      quantity: 3,
    })
  })
})
