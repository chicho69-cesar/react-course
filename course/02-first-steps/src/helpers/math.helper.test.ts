import { describe, expect, test } from 'vitest'
import { add, divide, multiply, subtract } from './math.helper'

describe('Tests for Add', () => {
  test('Should sum two positive numbers', () => {
    const a = 1
    const b = 2

    const sum = add(a, b)

    expect(sum).toBe(a + b)
  })

  test('Should add two negative numbers', () => {
    // ! 1. Arrange
    const a = -2
    const b = -4

    // ! 2. Act
    const result = add(a, b)

    // ! 3. Assert
    expect(result).toBe(a + b)
  })
})

describe('Tests for Subtract', () => {
  test('Should subtract two positive numbers', () => {
    const a = 2
    const b = 4

    const result = subtract(a, b)

    expect(result).toBe(a - b)
  })

  test('Should subtract two negative numbers', () => {
    const a = -2
    const b = -4

    const result = subtract(a, b)

    expect(result).toBe(a - b)
  })
})

describe('Tests for Multiply', () => {
  test('Should multiply two positive numbers', () => {
    const a = 2
    const b = 4

    const result = multiply(a, b)

    expect(result).toBe(a * b)
  })
  
  test('Should multiply two negative numbers', () => {
    const a = -2
    const b = -4

    const result = multiply(a, b)

    expect(result).toBe(a * b)
  })
})

describe('Tests on Divide', () => {
  test('Should divide two positive numbers', () => {
    const a = 2
    const b = 4

    const result = divide(a, b)

    expect(result).toBe(a / b)
  })
})
