import GifList from "./gifs/components/gif-list"
import PreviousSearches from "./gifs/components/previous-searches"
import useGifs from "./gifs/hooks/use-gifs"
import CustomHeader from "./shared/components/custom-header"
import SearchBar from "./shared/components/search-bar"

function GifApp() {
  const { gifs, previousTerms, handleTermClicked, handleSearch } = useGifs()

  return (
    <>
      <CustomHeader
        title="Buscador de GIFs"
        description="Descubre y comparte el gif perfecto"
      />

      <SearchBar
        placeholder="Busca un gif..."
        onQuery={handleSearch}
      />

      <PreviousSearches
        searches={previousTerms}
        onLabelClicked={handleTermClicked}
      />

      <GifList gifs={gifs} />
    </>
  )
}

export default GifApp
