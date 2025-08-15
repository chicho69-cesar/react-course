interface AdminTitleProps {
  title: string
  subtitle: string
}

export default function AdminTitle({ title, subtitle }: AdminTitleProps) {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
      <p className="text-gray-600">{subtitle}</p>
    </div>
  )
}
