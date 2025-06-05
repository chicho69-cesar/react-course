/* eslint-disable no-undef */
import { character1, character2, character3 } from '../../src/js/07-destructuring-arrays'

describe('Test on 07 destructuring arrays', () => {
  test('should return the first character', () => {
    expect(character1).toBe('Goku')
  })

  test('should return the second character', () => {
    expect(character2).toBe('Vegeta')
  })

  test('should return the third character', () => {
    expect(character3).toBe('Trunks')
  })
})
