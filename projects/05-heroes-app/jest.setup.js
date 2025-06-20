/* eslint-disable no-undef */
import { TextDecoder, TextEncoder } from 'util'
import 'whatwg-fetch'

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder
