/* eslint-disable no-undef */
import 'setimmediate'
import { TextDecoder, TextEncoder } from 'util'
import 'whatwg-fetch'

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

require('dotenv').config({
  path: '.env.test'
})

jest.mock('./src/helpers/getEnvVariables.js', () => ({
  getEnvVariables: () => ({ ...process.env })
}))

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})
