import { useUser } from "@/09-use-context/context/use-user"
import { Button } from "@/components/ui/button"

export const ProfilePage = () => {
  const { user, logout } = useUser()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl">Perfil del usuario</h1>
      <hr />

      <pre className="my-4 w-[80%] overflow-x-auto">
        {JSON.stringify(user, null, 2)}
      </pre>

      <Button variant="destructive" onClick={logout}>
        Salir
      </Button>
    </div>
  )
}
