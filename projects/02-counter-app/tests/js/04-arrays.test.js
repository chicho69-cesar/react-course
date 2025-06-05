/* eslint-disable no-undef */
import { array } from '../../src/js/04-arrays'

describe('Test on 04 arrays', () => {
  test('array should contain numbers from 1 to 10', () => {
    expect(array).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  })

  test('array should have a length of 10', () => {
    expect(array.length).toBe(10)
  })

  test('array should not contain negative numbers', () => {
    expect(array.every(num => num >= 1)).toBe(true)
  })
})