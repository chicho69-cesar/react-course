/* eslint-disable no-undef */
import { getGifts } from '../../src/helpers/get-gifts'

describe('Test on get gifts', () => {
  test('should return an array of gifts', async () => {
    const gifts = await getGifts('Dragon Ball')

    expect(gifts.length).toBeGreaterThan(0)
    expect(gifts[0]).toEqual({
      id: expect.any(String),
      title: expect.any(String),
      url: expect.any(String)
    })
  })
})
