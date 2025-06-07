import './index.css'

// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// import App from './App.jsx'
// import { CounterApp } from './01-use-state/CounterApp'
// import { CounterWithCustomHook } from './01-use-state/CounterWithCustomHook'
// import SimpleForm from './02-use-effect/SimpleForm'
// import { FormWithCustomHook } from './02-use-effect/FormWithCustomHook'
// import { Coords } from './02-use-effect/Coords'
import { MultipleCustomHooks } from './03-examples/MultipleCustomHooks'
// import { FocusScreen } from './04-use-ref/FocusScreen'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    // <App />
    // <CounterApp />
    // <CounterWithCustomHook />
    // <SimpleForm />
    // <FormWithCustomHook />
    // <Coords />
    <MultipleCustomHooks />
    // <FocusScreen />
  // </StrictMode>,
)
