import './index.css'

// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// import App from './App.jsx'
// import { CounterApp } from './01-use-state/CounterApp'
// import { CounterWithCustomHook } from './01-use-state/CounterWithCustomHook'
// import SimpleForm from './02-use-effect/SimpleForm'
// import { FormWithCustomHook } from './02-use-effect/FormWithCustomHook'
// import { Coords } from './02-use-effect/Coords'
// import { MultipleCustomHooks } from './03-examples/MultipleCustomHooks'
// import { FocusScreen } from './04-use-ref/FocusScreen'
// import LayoutEffect from './05-use-layout-effect/LayoutEffect'
// import { Memoize } from './06-memoization/Memoize'
// import { MemoHook } from './06-memoization/MemoHook'
// import { CallbackHook } from './06-memoization/CallbackHook'
import { MemoFather } from './07-homework-memo/MemoFather'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    // <App />
    // <CounterApp />
    // <CounterWithCustomHook />
    // <SimpleForm />
    // <FormWithCustomHook />
    // <Coords />
    // <MultipleCustomHooks />
    // <FocusScreen />
    // <LayoutEffect />
    // <Memoize />
    // <MemoHook />
    // <CallbackHook />
    <MemoFather />
  // </StrictMode>,
)
