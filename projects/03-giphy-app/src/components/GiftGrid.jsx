import { useFetchGifts } from "../hooks/use-fetch-gifts"
import { GiftItem } from "./GiftItem"

export const GiftGrid = ({ category }) => {
  const { gifts, isLoading } = useFetchGifts(category)

  return (
    <>
      <h3>
        {category}
      </h3>

      {isLoading && (
        <h2>Cargando...</h2>
      )}

      <div className="card-grid">
        {gifts.map((gift) => (
          <GiftItem
            key={gift.id}
            {...gift}
          />
        ))}
      </div>
    </>
  )
}
