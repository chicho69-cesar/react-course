import { useOptimistic, useTransition } from 'react'
import type { Planet } from '../../interfaces/planet.interface'
import { updatePlanetAction } from '../../actions/update-planet.action'

interface PlanetsListsProps {
  planets: Planet[]
}

export const PlanetsLists = ({ planets }: PlanetsListsProps) => {
  const [isPending, startTransition] = useTransition()

  const [optimisticPlanets, setOptimisticPlanets] = useOptimistic(
    planets,
    (currentState: Planet[], newPlanet: Planet) => {
      const updatedPlanets = currentState.map((planet) => {
        return planet.id === newPlanet.id ? newPlanet : planet
      })

      return updatedPlanets
    }
  )

  const handleUpdate = async (planet: Planet) => {
    startTransition(async () => {
      const dataToUpdate = {
        ...planet,
        name: planet.name.toUpperCase(),
      }
      
      try {
        setOptimisticPlanets(dataToUpdate)
        const newPlanetData = await updatePlanetAction(dataToUpdate)
        setOptimisticPlanets(newPlanetData)
      } catch (error) {
        console.log({ error })
        setOptimisticPlanets(planet)
      }
    })
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {optimisticPlanets.map((planet) => (
        <div key={planet.id} className="p-4 bg-gray-100 rounded shadow">
          <h2 className="text-xl font-semibold">{planet.name}</h2>
          <p className="text-gray-700">{planet.type}</p>
          <p className="text-gray-700">{planet.distanceFromSun}</p>

          <hr />

          <button
            className='bg-blue-500 disabled:bg-gray-500 text-white p-2 rounded w-full mt-2'
            onClick={() => handleUpdate(planet)}
            disabled={isPending}
            type='button'
          >
            Actualizar
          </button>
        </div>
      ))}
    </div>
  )
}
