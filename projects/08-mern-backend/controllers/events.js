import { request, response } from 'express'
import { Event } from '../models/event.js'

export const getEvents = async (req = request, res = response) => {
  try {
    const events = await Event.find().populate('user', 'name')

    return res.status(200).json({
      ok: true,
      events
    })
  } catch (error) {
    console.error('Error fetching events:', error)

    return res.status(500).json({
      ok: false,
      msg: 'Internal server error'
    })
  }
}

export const getEventById = async (req = request, res = response) => {
  try {
    const { id } = req.params
    const event = await Event.findById(id).populate('user', 'name')

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: 'Event not found'
      })
    }

    return res.status(200).json({
      ok: true,
      event
    })
  } catch (error) {
    console.error('Error fetching event by ID:', error)

    return res.status(500).json({
      ok: false,
      msg: 'Internal server error'
    })
  }
}

export const createEvent = async (req = request, res = response) => {
  try {
    const eventToSave = { ...req.body }
    const event = new Event(eventToSave)

    event.user = req.uid

    const savedEvent = await event.save()

    return res.status(201).json({
      ok: true,
      event: savedEvent
    })
  } catch (error) {
    console.error('Error creating event:', error)

    return res.status(500).json({
      ok: false,
      msg: 'Internal server error'
    })
  }
}

export const updateEvent = async (req = request, res = response) => {
  try {
    const { id } = req.params
    const uid = req.uid
    const eventToUpdate = { ...req.body }

    const event = await Event.findById(id)

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: 'Event not found'
      })
    }

    if (event.user.toString() !== uid) {
      return res.status(403).json({
        ok: false,
        msg: 'You do not have permission to update this event'
      })
    }

    const newEvent = {
      ...eventToUpdate,
      user: uid,
    }

    const updatedEvent = await Event.findByIdAndUpdate(id, newEvent, { new: true })

    return res.status(200).json({
      ok: true,
      event: updatedEvent
    })
  } catch (error) {
    console.error('Error updating event:', error)

    return res.status(500).json({
      ok: false,
      msg: 'Internal server error'
    })
  }
}

export const deleteEvent = async (req = request, res = response) => {
  try {
    const { id } = req.params
    const uid = req.uid

    const event = await Event.findById(id)

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: 'Event not found'
      })
    }

    if (event.user.toString() !== uid) {
      return res.status(403).json({
        ok: false,
        msg: 'You do not have permission to delete this event'
      })
    }

    await Event.findByIdAndDelete(id)

    return res.status(200).json({
      ok: true,
      msg: 'Event deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting event:', error)

    return res.status(500).json({
      ok: false,
      msg: 'Internal server error'
    })
  }
}