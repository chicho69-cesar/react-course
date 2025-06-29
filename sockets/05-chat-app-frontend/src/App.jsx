import { AuthProvider } from './context/auth/auth-provider'
import { ChatProvider } from './context/chat/chat-provider'
import { SocketProvider } from './context/sockets/socket-provider'
import Router from './router/Router'

function App() {
  return (
    <ChatProvider>
      <AuthProvider>
        <SocketProvider>
          <Router />
        </SocketProvider>
      </AuthProvider>
    </ChatProvider>
  )
}

export default App
