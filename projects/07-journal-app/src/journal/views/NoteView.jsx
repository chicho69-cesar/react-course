import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material'
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import { useEffect, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'

import { useForm } from '../../hooks/useForm'
import { setActiveNote } from '../../store/journal/journalSlice'
import { startDeletingNote, startSaveNote, startUploadingFiles } from '../../store/journal/thunks'
import { ImageGallery } from '../components'

export const NoteView = () => {
  const dispatch = useDispatch()
  const { active: note, messageSaved, isSaving } = useSelector((state) => state.journal)

  const { body, title, date, onInputChange, formState } = useForm(note)

  const dateString = useMemo(() => {
    const newDate = new Date(date)
    return newDate.toUTCString()
  }, [date])

  const fileInputRef = useRef()

  useEffect(() => {
    dispatch(setActiveNote(formState))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState])

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire('Nota actualizada', messageSaved, 'success')
    }
  }, [messageSaved])

  const handleSaveNote = () => {
    dispatch(startSaveNote(formState))
  }

  const handleFileInputChange = ({ target }) => {
    if (target.files.length === 0) return
    dispatch(startUploadingFiles(target.files))
  }

  const handleDelete = () => {
    dispatch(startDeletingNote())
  }

  return (
    <Grid
      container
      direction='row'
      justifyContent='space-between'
      alignItems='center'
      sx={{ mb: 1 }}
      className='animate__animated animate__fadeIn animate__faster'
    >
      <Grid item>
        <Typography fontSize={39} fontWeight='light' >{dateString}</Typography>
      </Grid>

      <Grid item>
        <input
          type="file"
          multiple
          ref={fileInputRef}
          onChange={handleFileInputChange}
          style={{ display: 'none' }}
        />

        <IconButton
          color="primary"
          disabled={isSaving}
          onClick={() => fileInputRef.current.click()}
        >
          <UploadOutlined />
        </IconButton>

        <Button
          disabled={isSaving}
          onClick={handleSaveNote}
          color="primary"
          sx={{ padding: 2 }}
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Ingrese un título"
          label="Título"
          sx={{ border: 'none', mb: 1 }}
          name="title"
          value={title}
          onChange={onInputChange}
        />

        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="¿Qué sucedió en el día de hoy?"
          minRows={5}
          name="body"
          value={body}
          onChange={onInputChange}
        />
      </Grid>

      <Grid container justifyContent='end'>
        <Button
          onClick={handleDelete}
          sx={{ mt: 2 }}
          color="error"
        >
          <DeleteOutline />
          Borrar
        </Button>
      </Grid>

      <ImageGallery images={note.imageUrls} />
    </Grid>
  )
}
