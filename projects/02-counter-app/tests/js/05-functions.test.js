/* eslint-disable no-undef */
import { getUser, getActiveUser } from '../../src/js/05-functions'

describe('Test on 05 functions', () => {
  test('getUser should return an object', () => {
    const testUser = {
      uid: 'ABC123',
      username: 'El_Papi1502'
    }
    const user = getUser()

    expect(user).toEqual(testUser)
  })

  test('getActiveUser should return an object with the uid and username', () => {
    const name = 'Cesar'
    const activeUser = getActiveUser(name)

    expect(activeUser).toStrictEqual({
      uid: 'ABC567',
      username: name
    })
  })
})
