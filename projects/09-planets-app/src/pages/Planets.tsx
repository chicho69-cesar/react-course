import { type FC, use, useState } from 'react'

import { type Planet } from '../interfaces/planet.interface'
import { EditPlanetForm } from './ui/EditPlanetForm'
import { PlanetsLists } from './ui/PlanetsLists'

interface PlanetsProps {
  getPlanets: Promise<Planet[]>
}

const Planets: FC<PlanetsProps> = ({ getPlanets }) => {
  const originalPlanets = use(getPlanets)
  const [planets, setPlanets] = useState<Planet[]>(originalPlanets)

  const handleAddPlanet = async (planet: Planet) => {
    setPlanets([...planets, planet])
  }

  return (
    <div className="p-4">
      <h4 className="text-2xl font-bold mb-4">Agregar y Editar Planetas</h4>
      <hr className="border-gray-300 mb-4" />

      <EditPlanetForm onAddPlanet={handleAddPlanet} />
      <PlanetsLists planets={planets} />
    </div>
  )
}

export default Planets