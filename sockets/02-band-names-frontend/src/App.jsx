import { SocketsProvider } from './context/SocketsProvider'
import HomePage from './pages/HomePage'

function App() {
  return (
    <SocketsProvider>
      <HomePage />
    </SocketsProvider>
  )
}

export default App
