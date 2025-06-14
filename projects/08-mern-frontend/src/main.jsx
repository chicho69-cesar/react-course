import './index.css'

// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'

const rootItem = document.querySelector('#root')
const root = createRoot(rootItem)

root.render(
  // <StrictMode>
  <App />
  // </StrictMode>
)
