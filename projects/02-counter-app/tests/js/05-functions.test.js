/* eslint-disable no-undef */
import { getActiveUser, getUser } from '../../src/js/05-functions'

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

    /* La aserción .toStrictEqual compara profundamente los objetos y los
    arrays para ver si todos sus datos son estrictamente iguales */
    expect(activeUser).toStrictEqual({
      uid: 'ABC567',
      username: name
    })
  })
})
