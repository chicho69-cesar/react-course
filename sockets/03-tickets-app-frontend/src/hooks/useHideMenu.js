import { useEffect } from "react"
import { useUI } from "../context/ui/useUI"

export const useHideMenu = (hide) => {
  const { openMenu, closeMenu } = useUI()
  
  useEffect(() => {
    if (hide) {
      closeMenu()
    } else {
      openMenu()
    }
  }, [hide, openMenu, closeMenu])
}
