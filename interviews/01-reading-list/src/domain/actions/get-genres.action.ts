import data from '../../data/mocks/books.json'

export async function getGenres(): Promise<string[]> {
  const genres = data.library.map((lib) => lib.book.genre)

  return genres.reduce((acc: string[], el: string) => {
    if (!acc.includes(el)) {
      acc.push(el)
      return acc
    }

    return acc
  }, [])
}
