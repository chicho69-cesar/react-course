import BtnMyLocation from '../components/BtnMyLocation'
import Logo from '../components/Logo'
import MapView from '../components/MapView'
import SearchBar from '../components/SearchBar'

export default function HomeScreen() {
  return (
    <div>
      <MapView />
      <BtnMyLocation />
      <Logo />
      <SearchBar />
    </div>
  )
}
