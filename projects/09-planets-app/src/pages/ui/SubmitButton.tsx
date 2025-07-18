import { useFormStatus } from "react-dom"

export const SubmitButton = () => {
  const formStatus = useFormStatus()

  return (
    <button
      type="submit"
      className="bg-blue-500 disabled:bg-gray-500 text-white p-2 rounded flex-1 sm:flex-none"
      disabled={formStatus.pending}
    >
      Agregar planeta
    </button>
  )
}
