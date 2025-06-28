import SocketProvider from './context/sockets/SocketProvider'
import MapsPage from './pages/MapsPage'

function App() {
  return (
    <SocketProvider>
      <MapsPage />
    </SocketProvider>
  )
}

export default App
