import axios from 'axios'

export const planetsApi = axios.create({
  baseURL: 'http://localhost:3100/planets',
})

planetsApi.interceptors.request.use((config) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(config)
      // reject(new Error('Error: Request timed out'))
    }, 2000)
  })
})
