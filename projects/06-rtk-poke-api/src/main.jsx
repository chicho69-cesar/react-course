import './index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import { store } from './store'
// import App from './App.jsx'
// import PokemonApp from './PokemonApp.jsx'
import TodoApp from './TodoApp.jsx'

const rootItem = document.getElementById('root')
const root = createRoot(rootItem)

root.render(
  <StrictMode>
    <Provider store={store}>
      {/* <App /> */}
      {/* <PokemonApp /> */}
      <TodoApp />
    </Provider>
  </StrictMode>,
)
