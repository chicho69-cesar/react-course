import { createContext } from "react"
import { type User } from "../data/user-mock.data"

export type AuthStatus = "checking" | "authenticated" | "not-authenticated"

export interface UserContextProps {
  // state
  authStatus: AuthStatus
  user: User | null
  isAuthenticated: boolean

  // Methods
  login: (userId: number) => boolean
  logout: () => void
}

export const UserContext = createContext({} as UserContextProps)
