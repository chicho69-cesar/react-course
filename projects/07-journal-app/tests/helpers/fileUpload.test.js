/* eslint-disable no-undef */
import { v2 as cloudinary } from 'cloudinary'
import { fileUpload } from '../../src/helpers'

cloudinary.config({
  cloud_name: 'cursos-udemy',
  api_key: '535484127987571',
  api_secret: 'kTVWAm0r93sPlaQpl291HJINHY4',
  secure: true
})

describe('Tests on fileUpload', () => {
  test('Should upload a file successfully', async () => {
    const imageUrl = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80'

    const response = await fetch(imageUrl)
    const blob = await response.blob()
    const file = new File([blob], 'photo.jpg')

    const url = await fileUpload(file)
    expect(typeof url).toBe('string')

    const segments = url.split('/')
    const imageId = segments[segments.length - 1].replace('.jpg', '')

    await cloudinary.api.delete_resources(['journal/' + imageId], { resource_type: 'image' })
  })

  test('Should return null if no file is provided', async () => {
    const file = new File([], 'photo.jpg')
    const url = await fileUpload(file)
    expect(url).toBe(null)
  })
})
