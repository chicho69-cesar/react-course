import { createContext } from 'react'

export const UIContext = createContext({
  showMenu: false,
  openMenu: () => { },
  closeMenu: () => { },
  toggleMenu: () => { },
})
