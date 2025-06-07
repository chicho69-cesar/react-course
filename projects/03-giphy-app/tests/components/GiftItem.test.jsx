/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import { GiftItem } from '../../src/components'

describe('Test on <GiftItem />', () => {
  const title = 'Saitama'
  const url = 'https://one-punch.com/saitama.jpg'

  test('should match with the snapshot', () => {
    const { container } = render(<GiftItem id={'1'} title={title} url={url} />)
    expect(container).toMatchSnapshot()
  })
  
  test('should show the image with the url and alt', () => {
    render(<GiftItem id={'1'} title={title} url={url} />)

    const { src, alt } = screen.getByRole('img')

    expect(src).toBe(url)
    expect(alt).toEqual(expect.any(String))
  })

  test('should show the title', () => {
    render(<GiftItem id={'1'} title={title} url={url} />)
    expect(screen.getByText(title)).toBeTruthy()
  })
})
