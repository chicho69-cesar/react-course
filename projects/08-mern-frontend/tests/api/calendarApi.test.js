/* eslint-disable no-undef */
import { calendarApi } from '../../src/api'

describe('Tests on calendar API', () => {
  test('Should have default settings', () => {
    expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL)
  })
})
