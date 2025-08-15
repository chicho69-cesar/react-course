import CustomFullscreenLoader from "@/components/custom/custom-fullscreen-loader"
import { useQuery } from "@tanstack/react-query"
import type { PropsWithChildren } from "react"
import { useAuthStore } from "../store/auth.store"

export default function CheckAuthProvider({ children }: PropsWithChildren) {
  const { checkAuthStatus } = useAuthStore()

  const { isLoading } = useQuery({
    queryKey: ['auth'],
    queryFn: checkAuthStatus,
    retry: false,
    refetchInterval: 1000 * 60 * 1.5,
    refetchOnWindowFocus: true,
  })

  if (isLoading) return <CustomFullscreenLoader />

  return children
}
