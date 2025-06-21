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

    getState.mockReturnValue({
      auth: {
        uid: userId
      }
    })

    await startNewNote()(dispatch, getState)

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

    const notesCollection = collection(FirebaseDB, `${userId}/journal/notes`)
    const notes = await getDocs(notesCollection)

    const deletePromises = []

    notes.forEach((note) => {
      deletePromises.push(deleteDoc(note.ref))
    })

    await Promise.all(deletePromises)
  })
})