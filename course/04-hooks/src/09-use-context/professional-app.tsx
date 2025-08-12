import { RouterProvider } from 'react-router'
import UserProvider from './context/user-provider'
import { routes } from './router/router'

export default function ProfessionalApp() {
  return (
    <UserProvider>
      <div className="bg-gradient">
        <RouterProvider router={routes} />
      </div>
    </UserProvider>
  )
}
