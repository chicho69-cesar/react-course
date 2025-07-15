export function getUserLocation(): Promise<[number, number]> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        resolve([coords.longitude, coords.latitude])
      },
      (err) => {
        console.error('Error getting user location:', err)
        reject()
      }
    )
  })
}
