/* eslint-disable no-undef */
import { person } from '../../src/js/03-object-literal'

describe('Test on 03 object literal', () => {
  test('should return a person', () => {
    /* Para comparar objetos lo mejor es usar la aserción .toEqual, porque
    .toBe compara por referencia y nos va a marcar error si no es la misma
    referencia */
    expect(person).toEqual({
      name: 'Tony',
      lastName: 'Stark',
      age: 45,
      address: {
        city: 'New York',
        zip: 55321321,
        lat: 14.3232,
        lng: 34.9233321
      }
    })
  })
})
