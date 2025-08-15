import { tesloApi } from "@/api/teslo-api"
import type { AuthResponse } from "../interfaces/auth.response"

export async function loginAction(email: string, password: string) {
  try {
    const { data } = await tesloApi.post<AuthResponse>("/auth/login", {
      email,
      password,
    })

    return data
  } catch (error) {
    console.log(error)
    throw error
  }
}