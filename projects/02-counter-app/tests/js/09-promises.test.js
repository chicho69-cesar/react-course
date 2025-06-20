/* eslint-disable no-undef */
import { getHeroByIdAsync } from '../../src/js/09-promises'

describe('Test on 09 promises', () => {
  test('getHeroByIdAsync should return a hero', (done) => {
    const id = 1

    getHeroByIdAsync(id)
      .then((hero) => {
        /* Podemos hacer aserciones dentro de una promesa, para comparar
        el resultado de dicha promesa. */
        expect(hero).toEqual({
          id: 1,
          name: 'Batman',
          owner: 'DC'
        })

        /* Si usamos aserciones dentro de una promesa que se resuelve, debemos
        de ejecutar la función done para indicarle al test que ya terminamos
        de hacer dichas pruebas. */
        done()
      })
  })

  test('getHeroByIdAsync should get an error if the hero does not exists', (done) => {
    const id = 100

    getHeroByIdAsync(id)
      .then((hero) => {
        expect(hero).toBeFalsy()
        done()
      })
      .catch((error) => {
        expect(error).toBe(`No se pudo encontrar el héroe con el ID: ${id}`)
        done()
      })
  })
})
