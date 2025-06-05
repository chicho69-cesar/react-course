import './index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CounterApp } from './CounterApp'

// import { HelloWorldApp } from './HelloWorldApp.jsx'
// import { FirstApp } from './FirstApp'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

root.render(
  <StrictMode>
    {/* <HelloWorldApp /> */}
    
    {/* <FirstApp
      title={'Hola, soy Goku'}
      subtitle={'Soy un subtítulo'}
      name={'Goku'}
    /> */}

    <CounterApp value={10} />
  </StrictMode>,
)
