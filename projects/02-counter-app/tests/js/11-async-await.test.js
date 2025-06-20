/* eslint-disable no-undef */
import { getImage } from '../../src/js/11-async-await.js'

describe('Test on 11 async await', () => {
  /* Para no tener que usar .then o .catch con promesas dentro de un test,
  el callback que recibe un test puede ser asíncrono */
  test('getImage should return an error if there is not apiKey', async () => {
    const resp = await getImage()
    expect(resp).toBe('No se encontró la imagen')
  })
})
