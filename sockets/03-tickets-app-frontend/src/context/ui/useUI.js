import { useContext } from 'react'
import { UIContext } from './UIContext'

export const useUI = () => useContext(UIContext)
