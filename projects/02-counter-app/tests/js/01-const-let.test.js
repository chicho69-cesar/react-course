/* eslint-disable no-undef */
import { lastName, name } from '../../src/js/01-const-let'

describe('Test on 01 const and let', () => {
  test('name and lastName should be defined', () => {
    expect(name).toBeDefined()
    expect(lastName).toBeDefined()
  })
})
