import { REACT_APP_API_URL } from '../constants/server'

export async function fetchWithoutAuth(endpoint, data, method = 'GET') {
  const url = `${REACT_APP_API_URL}/${endpoint}`

  if (method === 'GET') {
    const response = await fetch(url)
    return await response.json()
  } else {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    return await response.json()
  }
}

export async function fetchWithAuth(endpoint, data, method = 'GET') {
  const url = `${REACT_APP_API_URL}/${endpoint}`
  const token = localStorage.getItem('token')

  if (method === 'GET') {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })

    return await response.json()
  } else {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })

    return await response.json()
  }
}
