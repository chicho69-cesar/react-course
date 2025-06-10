import { useActionState } from 'react'
import type { Planet } from '../../interfaces/planet.interface'
import { createPlanetActionForm } from '../../actions/create-planet.action'
import { SubmitButton } from './SubmitButton'

interface EditPlanetFormProps {
  onAddPlanet: (planet: Planet) => void
}

export const EditPlanetForm = ({ onAddPlanet }: EditPlanetFormProps) => {
  const [state, formAction, isPending] = useActionState(
    async (prevState: unknown, queryData: FormData) => {
      const planet = await createPlanetActionForm(prevState, queryData)
      onAddPlanet(planet)
    },
    null
  )

  return (
    <form className='mb-4 flex flex-col md:flex-row' action={formAction}>
      <input
        type='text'
        placeholder='Nombre del planeta'
        className='mb-2 md:mb-0 md:mr-2 p-2 border border-gray-300 rounded flex-1'
        name='name'
        required
      />
      
      <input
        type='text'
        placeholder='Tipo de planeta'
        className='mb-2 md:mb-0 md:mr-2 p-2 border border-gray-300 rounded flex-1'
        name='type'
        required
      />

      <input
        type='text'
        placeholder='Distancia del sol'
        className='mb-2 md:mb-0 md:mr-2 p-2 border border-gray-300 rounded flex-1'
        name='distanceFromSun'
        required
      />

      <SubmitButton />
    </form>
  )
}