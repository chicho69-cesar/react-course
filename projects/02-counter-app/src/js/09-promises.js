import { getHeroById } from './08-import-and-export'

export const getHeroByIdAsync = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const p1 = getHeroById(id)

      if (p1) {
        resolve(p1)
      } else {
        reject('No se pudo encontrar el héroe con el ID: ' + id)
      }
    }, 2000)
  })
}
