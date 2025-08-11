import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'
// import MyAwesomeApp from './MyAwesomeApp.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    {/* <MyAwesomeApp /> */}
  </StrictMode>
)
