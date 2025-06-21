/* eslint-disable no-undef */
import 'setimmediate'
import { TextDecoder, TextEncoder } from 'util'
import 'whatwg-fetch'

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

require('dotenv').config({
  path: '.env.test'
})

jest.mock('./src/helpers/getEnvironments.js', () => ({
  getEnvironments: () => ({ ...process.env })
}))
