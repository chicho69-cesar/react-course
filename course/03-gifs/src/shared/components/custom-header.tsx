interface CustomHeaderProps {
  title: string
  description?: string
}

export default function CustomHeader({ title, description }: CustomHeaderProps) {
  return (
    <div className="content-center">
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </div>
  )
}
