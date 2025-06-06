import './index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import GiphyApp from './GiphyApp.jsx'

const rootItem = document.getElementById('root')
const root = createRoot(rootItem)

root.render(
  <StrictMode>
    <GiphyApp />
  </StrictMode>,
)
