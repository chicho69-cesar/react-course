import type { CSSProperties } from 'react'

const firstName = 'Cesar'
const lastName = 'Villalobos Olmos'

const favoriteGames = ['Fifa', 'Call of Duty', 'Grand Theft Auto V', 'God of War Ragnarok']
const isActive = false

const address = {
  zinCode: 'ABC-123',
  country: 'Mexico',
}

const styles: CSSProperties = {
  backgroundColor: '#fafafa',
  borderRadius: 20,
  padding: 10,
  marginTop: 30,
}

export default function MyAwesomeApp() {
  return (
    <div data-testid='div-app'>
      <h1 data-testid='first-name-title'>{firstName}</h1>
      <h3>{lastName}</h3>

      <p>{favoriteGames.join(', ')}</p>
      <h2>{isActive ? 'Activo' : 'No Activo'}</h2>

      <p style={styles}>
        {JSON.stringify(address, null, 2)}
      </p>
    </div>
  )
}
