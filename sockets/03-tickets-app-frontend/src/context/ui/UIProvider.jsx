import { useState } from 'react'
import { UIContext } from './UIContext'

export function UIProvider({ children }) {
  const [showMenu, setShowMenu] = useState(false)

  const openMenu = () => setShowMenu(true)
  const closeMenu = () => setShowMenu(false)
  const toggleMenu = () => setShowMenu((prev) => !prev)

  return (
    <UIContext.Provider
      value={{
        showMenu,
        openMenu,
        closeMenu,
        toggleMenu
      }}
    >
      {children}
    </UIContext.Provider>
  )
}
