/* eslint-disable no-undef */
import { name, keyName, age } from '../../src/js/06-destructuring-objects'

describe('Test on 06 destructuring', () => {
  test('should return an object with the name, age and keyName', () => {
    expect(name).toBe('Tony')
    expect(age).toBe(45)
    expect(keyName).toBe('Ironman')
  })
})
