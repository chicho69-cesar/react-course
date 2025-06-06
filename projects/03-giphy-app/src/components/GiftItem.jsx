export const GiftItem = ({ title, url, id }) => {
  return (
    <div className="card">
      <img src={url} alt={`Imagen ${id} - ${title}`} />
      <p>{title}</p>
    </div>
  )
}
