/* eslint-disable no-undef */
import { AUTH_TYPES } from '../../../src/auth/types/types'

describe('Test on Types.js', () => {
  test('Should return correct types', () => {
    expect(AUTH_TYPES).toEqual({
      login: '[Auth] Login',
      logout: '[Auth] Logout',
    })
  })
})
