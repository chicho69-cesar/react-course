import { planetsApi } from '../api/planetsApi'
import type { Planet } from '../interfaces/planet.interface'

const sleep = (ms: number) => {
  return new Promise<boolean>((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, ms)
  })
}

export const updatePlanetAction = async (planet: Planet) => {
  await sleep(2000)

  try {
    const response = await planetsApi.patch<Planet>(`/${planet.id}`, planet)
    const data = response.data

    return data
  } catch (error) {
    console.error('Error updating planet:', error)
    throw new Error('Failed to update planet')
  }
}
