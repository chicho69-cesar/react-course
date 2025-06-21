/* eslint-disable no-undef */
import { collection, deleteDoc, getDocs } from 'firebase/firestore/lite'

import { FirebaseDB } from '../../../src/firebase/config'
import { addNewEmptyNote, savingNewNote, setActiveNote } from '../../../src/store/journal/journalSlice'
import { startNewNote } from '../../../src/store/journal/thunks'

describe('Tests on journal thunks', () => {
  const dispatch = jest.fn()
  const getState = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Should startNewNote create a new empty note', async () => {
    const userId = 'TEST-USER-ID'

    /* Hacemos un mock del valor del estado de auth para cuando las funciones
    thunks la llamen, sea este el valor que obtienen */
    getState.mockReturnValue({
      auth: {
        uid: userId
      }
    })

    /* Las funciones thunks al ser clousures que regresan funciones, para probarlas
    debemos de ejecutar la función y el clousure que regresa */
    await startNewNote()(dispatch, getState)

    /* Verificamos que se haya echo dispatch de la función savingNewNote */
    expect(dispatch).toHaveBeenCalledWith(savingNewNote())

    expect(dispatch).toHaveBeenCalledWith(addNewEmptyNote({
      title: '',
      body: '',
      date: expect.any(Number),
      id: expect.any(String)
    }))

    expect(dispatch).toHaveBeenCalledWith(setActiveNote({
      title: '',
      body: '',
      date: expect.any(Number),
      id: expect.any(String)
    }))

    /* Como los tests hacen cambios reales sobre nuestra base de datos de pruebas, es
    muy recomendable hacer la limpieza de las colecciones creadas */
    const notesCollection = collection(FirebaseDB, `${userId}/journal/notes`)
    const notes = await getDocs(notesCollection)

    const deletePromises = []

    notes.forEach((note) => {
      deletePromises.push(deleteDoc(note.ref))
    })

    await Promise.all(deletePromises)
  })
})