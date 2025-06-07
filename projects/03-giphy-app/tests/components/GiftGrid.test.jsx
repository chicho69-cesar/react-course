/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import { GiftGrid } from '../../src/components'
import { useFetchGifts } from '../../src/hooks/use-fetch-gifts'

jest.mock('../../src/hooks/use-fetch-gifts.js')

describe('Test on <GiftGrid />', () => {
  const category = 'Dragon Ball'

  test('should show loading', () => {
    useFetchGifts.mockReturnValue({
      gifts: [],
      isLoading: true,
    })

    render(<GiftGrid category={category} />)

    expect(screen.getByText('Cargando...'))
    expect(screen.getByText(category))
  })

  test('should show the items when the hook useFetchGifts returns gifts', () => {
    const gifts = [
      {
        id: 'ABC',
        title: 'Saitama',
        url: 'https://localhost/saitama.jpg'
      },
      {
        id: '123',
        title: 'Goku',
        url: 'https://localhost/goku.jpg'
      },
    ]

    useFetchGifts.mockReturnValue({
      gifts,
      isLoading: false,
    })

    render(<GiftGrid category={category} />)

    expect(screen.getAllByRole('img').length).toBe(gifts.length)
  })
})
