/* eslint-disable no-undef */
import { onCloseDateModal, onOpenDateModal, uiSlice } from '../../../src/store/ui/uiSlice'

describe('Tests on uiSlice', () => {
  test('Should return the default state', () => {
    expect(uiSlice.getInitialState()).toEqual({
      isDateModalOpen: false
    })
  })

  test('Should change the state correctly', () => {
    let state = uiSlice.getInitialState()
    state = uiSlice.reducer(state, onOpenDateModal())

    expect(state.isDateModalOpen).toBeTruthy()

    state = uiSlice.reducer(state, onCloseDateModal())
    expect(state.isDateModalOpen).toBeFalsy()
  })
})
