/* eslint-disable no-undef */
import { lastName, name } from '../../src/js/01-const-let'

/* Los test suites se definen usando un describe */
describe('Test on 01 const and let', () => {
  /* Por cada test suite podemos tener la cantidad de test que necesitemos,
  al igual que el describe recibe un nombre y un callback para definir el test */
  test('name and lastName should be defined', () => {
    /* la función 'expect' nos ayuda a hacer aserciones, las cuales
    si se cumplen pasa el test, pero si no se cumple falla. */
    expect(name).toBeDefined()
    /* En este caso toBeDefined nos ayuda a ver si un valor esta definido */
    expect(lastName).toBeDefined()
  })
})
