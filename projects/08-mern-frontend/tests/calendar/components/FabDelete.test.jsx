/* eslint-disable no-undef */
import { fireEvent, render, screen } from '@testing-library/react'
import { FabDelete } from '../../../src/calendar'
import { useCalendarStore } from '../../../src/hooks/useCalendarStore'

jest.mock('../../../src/hooks/useCalendarStore')

describe('Tests on <FabDelete />', () => {
  const mockStartDeletingEvent = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Should show the component correctly', () => {
    useCalendarStore.mockReturnValue({
      hasEventSelected: false,
    })

    render(<FabDelete />)

    const button = screen.getByLabelText('btn-delete')

    expect(button.className).toContain('btn')
    expect(button.className).toContain('btn-danger')
    expect(button.className).toContain('fab-danger')
    expect(button.style.display).toBe('none')
  })

  test('Should show the button if there is an active event', () => {
    useCalendarStore.mockReturnValue({
      hasEventSelected: true
    })

    render(<FabDelete />)

    const button = screen.getByLabelText('btn-delete')
    expect(button.style.display).toBe('')
  })

  test('Should call startDeletingEvent when there is an active event', () => {
    useCalendarStore.mockReturnValue({
      hasEventSelected: true,
      startDeletingEvent: mockStartDeletingEvent
    })

    render(<FabDelete />)

    const button = screen.getByLabelText('btn-delete')
    fireEvent.click(button)
  })
})
