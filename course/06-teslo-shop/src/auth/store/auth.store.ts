import type { User } from "@/interfaces/user.interface"
import { create } from "zustand"
import { checkAuthAction } from "../actions/check-auth.action"
import { loginAction } from "../actions/login.action"

type AuthStatus = "authenticated" | "not-authenticated" | "checking"

interface AuthState {
  user: User | null
  token: string | null
  authStatus: AuthStatus

  isAdmin: () => boolean

  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  checkAuthStatus: () => Promise<boolean>
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  authStatus: "checking",

  isAdmin: () => {
    const roles = get().user?.roles || []
    return roles.includes("admin")
  },

  login: async (email, password) => {
    try {
      const data = await loginAction(email, password)
      localStorage.setItem("token", data.token)
      set({ user: data.user, token: data.token, authStatus: "authenticated" })

      return true
    } catch (error) {
      console.error("Login failed:", error)
      localStorage.removeItem("token")
      set({ user: null, token: null, authStatus: "not-authenticated" })
      return false
    }
  },

  logout: async () => {
    localStorage.removeItem("token")
    set({ user: null, token: null, authStatus: "not-authenticated" })
  },

  checkAuthStatus: async () => {
    try {
      const { user, token } = await checkAuthAction()
      set({ user, token, authStatus: "authenticated" })
      return true
    } catch (error) {
      console.error("Error checking auth status:", error)
      set({ user: null, token: null, authStatus: "not-authenticated" })
      return false
    }
  }
}))
