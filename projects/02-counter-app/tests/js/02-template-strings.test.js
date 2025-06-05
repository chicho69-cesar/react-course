import { createGreeting } from "../../src/js/02-template-strings"

/* eslint-disable no-undef */
describe('Test on 02 template strings', () => {
  test('get greeting should return "Hola Cesar"', () => {
    const name = 'Cesar'
    const greeting = createGreeting(name)

    expect(greeting).toBe(`Hola ${name}`)
  })
})
