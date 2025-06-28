export function getStorageUser() {
  const data = localStorage.getItem('tickets_data')

  return {
    agent: data ? JSON.parse(data).agent : null,
    desktop: data ? JSON.parse(data).desktop : null
  }
}