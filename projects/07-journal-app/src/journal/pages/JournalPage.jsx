import { AddOutlined } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import { startNewNote } from '../../store/journal/thunks'
import { JournalLayout } from '../layout/JournalLayout'
import { NoteView } from '../views/NoteView'
import { NothingSelectedView } from '../views/NothingSelectedView'

export const JournalPage = () => {
  const dispatch = useDispatch()
  const { isSaving, active } = useSelector((state) => state.journal)

  const handleClickNewNote = () => {
    dispatch(startNewNote())
  }

  return (
    <JournalLayout>
      {active ? (
        <NoteView />
      ) : (
        <NothingSelectedView />
      )}

      <IconButton
        onClick={handleClickNewNote}
        size='large'
        disabled={isSaving}
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>
    </JournalLayout>
  )
}
