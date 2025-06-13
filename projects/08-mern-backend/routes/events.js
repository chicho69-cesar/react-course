import { Router } from 'express'
import { check } from 'express-validator'

import { createEvent, deleteEvent, getEventById, getEvents, updateEvent } from '../controllers/events.js'
import { isDate } from '../helpers/jsDate.js'
import { validateFields } from '../middlewares/validate-fields.js'
import { validateJWT } from '../middlewares/validate-jwt.js'

const router = Router()

router.use(validateJWT)

router.get(
  '/',
  getEvents
)

router.get(
  '/:id',
  getEventById
)

router.post(
  '/',
  [
    check('title', 'Title is required').not().isEmpty(),
    check('start', 'Start date is required').custom(isDate),
    check('end', 'End date is required').custom(isDate),
    validateFields
  ],
  createEvent
)

router.put(
  '/:id',
  [
    check('title', 'Title is required').not().isEmpty(),
    check('start', 'Start date is required').custom(isDate),
    check('end', 'End date is required').custom(isDate),
    validateFields
  ],
  updateEvent
)

router.delete(
  '/:id',
  deleteEvent
)

export default router
