import { API_KEY } from '../env'

// export const getGifts = async (category, signal) => {
export const getGifts = async (category) => {
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${category}&limit=10`
  // const resp = await fetch(url, { signal })
  const resp = await fetch(url)

  const { data } = await resp.json()

  const gifts = data.map((img) => ({
    id: img.id,
    title: img.title,
    url: img.images.downsized_medium.url
  }))

  return gifts
}