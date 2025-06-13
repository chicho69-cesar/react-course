import { parseISO, isValid } from 'date-fns'

export const isDate = (value) => {
  if (!value) {
    return false
  }

  const isAValidDate = typeof value === 'string' ? parseISO(value) : new Date(value)
  return isValid(isAValidDate)
}
