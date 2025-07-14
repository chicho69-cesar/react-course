import { Bath, Bed, MapPin, Square } from 'lucide-react'
import { createContext, use, useState } from 'react'
import type { Property } from '../../../../types'

const PropertyCardContext = createContext<Property | null>(null)

export function Root({
  children,
  value
}: {
  children: React.ReactNode | React.ReactNode[]
  value: Property
}) {
  return (
    <PropertyCardContext.Provider value={value}>
      {children}
    </PropertyCardContext.Provider>
  )
}

export function Gallery() {
  const { images } = use(PropertyCardContext)!
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  return (
    <div>
      <div className='relative h-64 overflow-hidden'>
        <img
          alt='Property Image'
          className='object-cover w-full h-full aspect-square'
          src={images[0]}
        />

        {/* Image Navigation Dots */}
        <div className='absolute bottom-4 left-1/2 flex -translate-x-1/2 transform space-x-2'>
          {images.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                index === currentImageIndex ? 'scale-125 bg-white' : 'bg-white/50 hover:bg-white/75'
              }`}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export function Features() {
  const { features } = use(PropertyCardContext)!

  return (
    <div className='flex flex-wrap gap-2'>
      {features.map((feature, index) => (
        <span
          key={index}
          className='bg-accent text-accent-foreground rounded-full px-2 py-1 text-xs font-medium'
        >
          {feature}
        </span>
      ))}
    </div>
  )
}

export function Description() {
  const { description } = use(PropertyCardContext)!
  
  return (
    <p className='text-muted-foreground line-clamp-2 text-sm'>
      {description}
    </p>
  )
}

export function Title() {
  const { title } = use(PropertyCardContext)!

  return (
    <h3 className='text-foreground line-clamp-1 text-xl font-semibold'>
      {title}
    </h3>
  )
}

export function Location() {
  const { location } = use(PropertyCardContext)!

  return (
    <div className='text-muted-foreground flex items-center'>
      <MapPin className='mr-1 h-4 w-4' />
      <span className='text-sm'>{location}</span>
    </div>
  )
}

export function Price() {
  const { price } = use(PropertyCardContext)!

  return (
    <div className='rounded-full bg-stone-900/90 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm'>
      {new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(price)}
    </div>
  )
}

export function Stats() {
  const { bedrooms, bathrooms, sqft } = use(PropertyCardContext)!

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  return (
    <div className='bg-muted flex items-center justify-between rounded-lg p-3'>
      <div className='flex items-center space-x-1'>
        <Bed className='text-muted-foreground h-4 w-4' />
        <span className='text-foreground text-sm font-medium'>{bedrooms}</span>
      </div>

      <div className='flex items-center space-x-1'>
        <Bath className='text-muted-foreground h-4 w-4' />
        <span className='text-foreground text-sm font-medium'>{bathrooms}</span>
      </div>

      <div className='flex items-center space-x-1'>
        <Square className='text-muted-foreground h-4 w-4' />
        <span className='text-foreground text-sm font-medium'>
          {sqft ? formatNumber(sqft) : 'N/A'} ft²
        </span>
      </div>
    </div>
  )
}

export function Overlay({ children }: { children: React.ReactNode | React.ReactNode[] }) {
  return (
    <div className='absolute top-0 left-0 z-10 p-4'>
      {children}
    </div>
  )
}

export function Card({ children }: { children: React.ReactNode | React.ReactNode[] }) {
  return (
    <div className='bg-card relative w-full max-w-md transform overflow-hidden rounded-2xl shadow-xl'>
      {children}
    </div>
  )
}

export function Content({ children }: { children: React.ReactNode | React.ReactNode[] }) {
  return (
    <div className='flex min-w-sm flex-col gap-4 p-4'>
      {children}
    </div>
  )
}

export const PropertyCard = Object.assign(Root, {
  Gallery,
  Features,
  Description,
  Title,
  Location,
  Price,
  Stats,
  Overlay,
  Card,
  Content
})

export default PropertyCard
