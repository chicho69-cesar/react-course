import styles from './filters.module.css'

import { useEffect, useState } from 'react'
import { getGenres } from '../../../domain/actions/get-genres.action'
import useFilters from '../../context/filters/use-filters'

export default function Filters() {
  const { pages, setGenre, setPages, onReset } = useFilters()
  const [genres, setGenres] = useState<string[]>([])

  useEffect(() => {
    getGenres()
      .then(setGenres)
      .catch((error) => {
        console.log('Error obteniendo los géneros: ', error)
      })
  }, [])

  return (
    <form className={styles.filters}>
      <div style={{ flex: 1 }}>
        <label>
          Filtrar por páginas {`(${pages})`}

          <input
            type='range'
            name='pages'
            id='pages-filter'
            min={0}
            max={1500}
            value={pages}
            onChange={(e) => setPages(+e.target.value)}
          />
        </label>
      </div>

      <div style={{ flex: 1 }}>
        <label>
          Filtrar por genero

          <select name='genre' id='genre-filter' onChange={(e) => setGenre(e.target.value)}>
            <option value=''>
              Seleccione una opción
            </option>

            {genres.map((genre) => (
              <option value={genre} key={genre}>
                {genre}
              </option>
            ))}
          </select>
        </label>
      </div>

      <button
        className={styles.reset}
        onClick={onReset}
        type='button'
      >
        Reset
      </button>
    </form>
  )
}
