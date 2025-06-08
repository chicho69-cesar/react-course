import './index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'

import HeroesApp from './HeroesApp.jsx'

const rootItem = document.getElementById('root')
const root = createRoot(rootItem)

root.render(
  <StrictMode>
    <BrowserRouter>
      <HeroesApp />
    </BrowserRouter>
  </StrictMode>,
)
