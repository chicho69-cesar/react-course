import { useEffect, useState, type PropsWithChildren } from 'react'
import { useBroadcast } from '../../hooks/use-broadcast'
import { FiltersContext } from './filters-context'

export default function FiltersProvider({ children }: PropsWithChildren) {
  const [genre, setGenre] = useState<string | null>(null)
  const [pages, setPages] = useState(0)

  const { listen, send } = useBroadcast('filters')

  useEffect(() => {
    const handleBroadcastMessage = (event: MessageEvent) => {
      const { type, data } = event.data

      if (type === 'FILTERS_UPDATED') {
        setGenre(data.genre)
        setPages(data.pages)
      }
    }

    listen(handleBroadcastMessage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSetGenre = (newGenre: string | null) => {
    setGenre(newGenre)
    send('FILTERS_UPDATED', { genre: newGenre, pages })
  }

  const handleSetPages = (newPages: number) => {
    setPages(newPages)
    send('FILTERS_UPDATED', { genre, pages: newPages })
  }

  const onReset = () => {
    setGenre('')
    setPages(0)

    send('FILTERS_UPDATED', { genre: '', pages: 0 })
  }

  return (
    <FiltersContext.Provider
      value={{
        genre,
        pages,

        setGenre: handleSetGenre,
        setPages: handleSetPages,
        onReset
      }}
    >
      {children}
    </FiltersContext.Provider>
  )
}
