import { createGreeting } from "../../src/js/02-template-strings"

/* eslint-disable no-undef */
describe('Test on 02 template strings', () => {
  test('get greeting should return "Hola Cesar"', () => {
    const name = 'Cesar'
    const greeting = createGreeting(name)

    /* La aserción .toBe nos ayuda a ver si un valor es exactamente
    igual al que se esta comparando, pero debemos tener cuidado porque
    toBe compara por valor y referencia, es decir, los objetos/arrays
    deben de compararse con si mismos */
    expect(greeting).toBe(`Hola ${name}`)
  })
})
