export const formatHour = (date) => {
  const newDate = new Date(date)

  const formatter = new Intl.DateTimeFormat('es-ES', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    day: 'numeric',
    month: 'long',
    weekday: 'long',
  })

  return formatter.format(newDate)
}