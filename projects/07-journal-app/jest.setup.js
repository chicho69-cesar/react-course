/* eslint-disable no-undef */
import dotenv from 'dotenv'
import 'setimmediate'
import { TextDecoder, TextEncoder } from 'util'
import 'whatwg-fetch'

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

dotenv.config({
  path: '.env.test'
})

jest.mock('./src/helpers/getEnvironments.js', () => ({
  getEnvVariables: () => ({ ...process.env })
}))
