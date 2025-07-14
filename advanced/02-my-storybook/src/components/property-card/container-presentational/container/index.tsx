import { Bath, Bed, Loader2, MapPin, Square } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { Property } from '../../../../types'

interface PropertyCardProps {
  data: Property
}

const DATA: Property = {
  id: 1,
  description: "This is a modern architectural marvel located in Beverly Hills, CA.",
  agent: {
    name: "John Doe",
    image: "/placeholder.svg?height=300&width=400",
    phone: "+1234567890",
  },
  title: "Modern Architectural Marvel",
  location: "Beverly Hills, CA",
  price: 2850000,
  bedrooms: 4,
  bathrooms: 3,
  sqft: 3200,
  images: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
  features: ["Pool", "Garden", "Smart Home"],
}

export default function PropertyCardContainer({ id: _id }: Pick<Property, 'id'>) {
  const [data, setData] = useState<Property | null>(null)

  useEffect(() => {
    setTimeout(() => {
      setData(DATA)
    }, 1000)
  }, [])

  if (!data) {
    return (
      <div className="bg-card flex h-[495.91px] w-md items-center justify-center rounded-2xl shadow-xl">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    )
  }

  return <PropertyCard data={data} key={_id} />
}

export function PropertyCard({ data }: PropertyCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num)
  }

  return (
    <div className="bg-card w-full max-w-md transform overflow-hidden rounded-2xl shadow-xl">
      {/* Image Gallery Section */}
      <div className="relative h-64 overflow-hidden">
        <img
          alt={data.title}
          className="object-cover w-full h-full aspect-square"
          src={data.images[currentImageIndex] || "/placeholder.svg"}
        />

        {/* Image Navigation Dots */}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform space-x-2">
          {data.images.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                index === currentImageIndex ? "scale-125 bg-white" : "bg-white/50 hover:bg-white/75"
              }`}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>

        {/* Price Badge */}
        <div className="absolute top-4 left-4 rounded-full bg-stone-900/90 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
          {formatPrice(data.price)}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Title and Location */}
        <div className="mb-4">
          <h3 className="text-foreground mb-2 line-clamp-1 text-xl font-semibold">{data.title}</h3>
          <div className="text-muted-foreground flex items-center">
            <MapPin className="mr-1 h-4 w-4" />
            <span className="text-sm">{data.location}</span>
          </div>
        </div>

        {/* Property Stats */}
        <div className="bg-muted mb-4 flex items-center justify-between rounded-lg p-3">
          <div className="flex items-center space-x-1">
            <Bed className="text-muted-foreground h-4 w-4" />
            <span className="text-foreground text-sm font-medium">{data.bedrooms}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Bath className="text-muted-foreground h-4 w-4" />
            <span className="text-foreground text-sm font-medium">{data.bathrooms}</span>
          </div>

          <div className="flex items-center space-x-1">
            <Square className="text-muted-foreground h-4 w-4" />
            <span className="text-foreground text-sm font-medium">
              {formatNumber(data.sqft)} ft²
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">{data.description}</p>

        {/* Features */}
        <div className="flex flex-wrap gap-2">
          {data.features.map((feature, index) => (
            <span
              key={index}
              className="bg-accent text-accent-foreground rounded-full px-2 py-1 text-xs font-medium"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}