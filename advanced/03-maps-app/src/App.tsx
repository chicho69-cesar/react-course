import MapProvider from './context/map/MapProvider'
import PlacesProvider from './context/places/PlacesProvider'
import HomeScreen from './screens/HomeScreen'

function App() {
  return (
    <PlacesProvider>
      <MapProvider>
        <HomeScreen />
      </MapProvider>
    </PlacesProvider>
  )
}

export default App
