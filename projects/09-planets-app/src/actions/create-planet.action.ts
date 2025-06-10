import { planetsApi } from '../api/planetsApi'
import type { Planet } from '../interfaces/planet.interface'

export const createPlanetAction = async (planet: Partial<Planet>) => {
  try {
    const response = await planetsApi.post<Planet>('/', planet)
    const data = response.data

    return data
  } catch (error) {
    console.error('Error creating planet:', error)
    return null
  }
}

export const createPlanetActionForm = async (prevState: unknown, queryData: FormData) => {
  console.log('Creating planet', { prevState, queryData })
  const formData = Object.fromEntries(queryData.entries())

  try {
    const response = await planetsApi.post<Planet>('/', formData)
    const data = response.data

    return data
  } catch (error) {
    console.error('Error creating planet with form data:', error)
    throw new Error('Failed to create planet with form data')
  }
}