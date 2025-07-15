import './index.css'

import mapboxgl from 'mapbox-gl'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN

import App from './App.tsx'

const rootItem = document.getElementById('root')
const root = createRoot(rootItem!)

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)
