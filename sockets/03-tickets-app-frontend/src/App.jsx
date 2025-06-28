import { BrowserRouter } from 'react-router'

import { SocketProvider } from './context/sockets/SocketProvider'
import { UIProvider } from './context/ui/UIProvider'
import { Router } from './routes/Router'

function App() {
  return (
    <BrowserRouter>
      <SocketProvider>
        <UIProvider>
          <Router />
        </UIProvider>
      </SocketProvider>
    </BrowserRouter>
  )
}

export default App
