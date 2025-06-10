import { Suspense } from 'react'

import { getPlanets } from './actions/get-planets.action'
import Planets from './pages/Planets'
import { ErrorBoundary } from './shared/ErrorBoundary'

function App() {
  return (
    <main className='p-4'>
      <h1 className='text-3xl font-bold mb-4'>Planetas del Sistema Solar</h1>

      <ErrorBoundary fallback={<p>Error on loading planets...</p>}>
        <Suspense fallback={<p>Loading...</p>}>
          <Planets getPlanets={getPlanets()} />
        </Suspense>
      </ErrorBoundary>
    </main>
  )
}

export default App
