import Library from './presentation/components/library/library'
import FiltersProvider from './presentation/context/filters/filters-provider'
import ReadingProvider from './presentation/context/reading/reading-provider'

function App() {
  return (
    <FiltersProvider>
      <ReadingProvider>
        <Library />
      </ReadingProvider>
    </FiltersProvider>
  )
}

export default App
