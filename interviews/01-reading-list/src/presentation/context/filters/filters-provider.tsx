import { useState, type PropsWithChildren } from 'react'
import { FiltersContext } from './filters-context'

export default function FiltersProvider({ children }: PropsWithChildren) {
  const [genre, setGenre] = useState<string | null>(null)
  const [pages, setPages] = useState(0)

  const onReset = () => {
    setGenre('')
    setPages(0)
  }

  return (
    <FiltersContext.Provider
      value={{
        genre,
        pages,

        setGenre,
        setPages,
        onReset
      }}
    >
      {children}
    </FiltersContext.Provider>
  )
}
