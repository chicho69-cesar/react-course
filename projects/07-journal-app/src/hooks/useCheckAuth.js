import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { FirebaseAuth } from '../firebase/config'
import { login, logout } from '../store/auth'
import { startLoadingNotes } from '../store/journal'

export const useCheckAuth = () => {
  const { status } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      console.log('useCheckAuth', user)

      if (!user) {
        return dispatch(logout())
      }

      const { uid, displayName, photoURL, email } = user

      dispatch(login({ uid, email, displayName, photoURL }))
      dispatch(startLoadingNotes())
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return status
}
