/* eslint-disable no-undef */
import { person } from '../../src/js/03-object-literal'

describe('Test on 03 object literal', () => {
  test('should return a person', () => {
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
