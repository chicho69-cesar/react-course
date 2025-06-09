import axios from 'axios'

export const planetsApi = axios.create({
  baseURL: 'http://localhost:3100/planets',
})

planetsApi.interceptors.request.use((config) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(config)
    }, 2000)
  })
})
