import './index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import GifApp from './gif-app.tsx'
// import MyCounterApp from './counter/components/my-counter-app.tsx'

const rootItem = document.getElementById('root')!
const root = createRoot(rootItem)

root.render(
  <StrictMode>
    <GifApp />
    {/* <MyCounterApp /> */}
  </StrictMode>,
)
