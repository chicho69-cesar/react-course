import './index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'sonner'

// import App from './App.tsx'
// import TrafficLight from './01-use-state/traffic-light'
// import TrafficLightWithEffect from './02-use-effect/traffic-light-with-effect'
// import TrafficLightWithHook from './02-use-effect/traffic-light-with-hook'
// import PokemonPage from './03-examples/pokemon-page'
// import FocusScreen from './04-use-ref/focus-screen'
// import TasksApp from './05-use-reducer/tasks-app'
// import ScrambleWordsWithState from './05-use-reducer/scramble-words-with-state'
// import ScrambleWords from './05-use-reducer/scramble-words'
// import MemoHook from './06-memos/memo-hook'
// import MemoCounter from './06-memos/memo-counter'
// import InstagromApp from './07-use-optimistic/instagrom-app'
// import { getUserAction } from './08-use-suspense/api/get-user.action'
// import ClientInformation from './08-use-suspense/client-information'
import ProfessionalApp from './09-use-context/professional-app'

const rootItem = document.querySelector('#root') as HTMLElement
const root = createRoot(rootItem)

root.render(
  <StrictMode>
    <Toaster />

    {/* <App /> */}
    {/* <TrafficLight /> */}
    {/* <TrafficLightWithEffect /> */}
    {/* <TrafficLightWithHook /> */}
    {/* <PokemonPage /> */}
    {/* <FocusScreen /> */}
    {/* <TasksApp /> */}
    {/* <ScrambleWordsWithState /> */}
    {/* <ScrambleWords /> */}
    {/* <MemoHook /> */}
    {/* <MemoCounter /> */}
    {/* <InstagromApp /> */}

    {/* <Suspense
      fallback={
        <div className="bg-gradient flex flex-col">
          <h1 className="text-2xl">Cargando</h1>
        </div>
      }
    >
      <ClientInformation getUser={getUserAction(1001)} />
    </Suspense> */}

    <ProfessionalApp />
  </StrictMode>,
)
