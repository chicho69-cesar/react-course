/* eslint-disable no-undef */
import { getImage } from '../../src/js/11-async-await.js'

describe('Test on 11 async await', () => {
  test('getImage should return an error if there is not apiKey', async () => {
    const resp = await getImage()
    expect(resp).toBe('No se encontro la imagen')
  })
})
