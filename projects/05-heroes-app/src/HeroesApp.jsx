import { AuthProvider } from './auth/context'
import { AppRouter } from './router/AppRouter'

function HeroesApp() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  )
}

export default HeroesApp
