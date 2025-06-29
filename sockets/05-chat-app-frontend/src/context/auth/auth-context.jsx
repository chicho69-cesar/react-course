import { createContext } from 'react'

export const AuthContext = createContext({
  auth: null,
  login: async () => {},
  logout: () => {},
  register: async () => {},
  verifyToken: () => {},
})
