import './index.css'

import '@ant-design/v5-patch-for-react-19'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'

const rootItem = document.getElementById('root')
const root = createRoot(rootItem)

root.render(
  <StrictMode>
    <App />
  </StrictMode>
)
