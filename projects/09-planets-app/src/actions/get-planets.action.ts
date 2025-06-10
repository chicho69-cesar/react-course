import { planetsApi } from '../api/planetsApi'
import type { Planet } from '../interfaces/planet.interface'

export const getPlanets = async (): Promise<Planet[]> => {
  try {
    const response = await planetsApi.get<Planet[]>('/')
    const data = response.data

    return data
  } catch (error) {
    console.error('Error fetching planets:', error)
    throw new Error('Failed to fetch planets')
  }
}
