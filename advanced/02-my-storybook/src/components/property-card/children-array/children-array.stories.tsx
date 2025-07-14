import type { Meta } from '@storybook/react-vite'
import FadeInGrid from '.'
import type { Property } from '../../../types'
import PropertyCard from '../basic/value-prop'

const props: { properties: Property[] } = {
  properties: [
    {
      id: 1,
      description: 'This is a modern architectural marvel located in Beverly Hills, CA.',
      agent: {
        name: 'John Doe',
        image: '/placeholder.svg?height=300&width=400',
        phone: '+1234567890',
      },
      title: 'Modern Architectural Marvel',
      location: 'Beverly Hills, CA',
      price: 2850000,
      bedrooms: 4,
      bathrooms: 3,
      sqft: 3200,
      images: ['/placeholder.svg?height=300&width=400', '/placeholder.svg?height=300&width=300'],
      features: ['Pool', 'Garden', 'Smart Home'],
    },
    {
      id: 2,
      description: 'This is a modern architectural marvel located in Beverly Hills, CA.',
      agent: {
        name: 'John Doe',
        image: '/placeholder.svg?height=300&width=400',
        phone: '+1234567890',
      },
      title: 'Barbie House',
      location: 'Malibu, CA',
      price: 2850000,
      bedrooms: 4,
      bathrooms: 3,
      sqft: 3200,
      images: ['/placeholder.svg?height=300&width=400', '/placeholder.svg?height=300&width=300'],
      features: ['Pool', 'Garden', 'Smart Home'],
    },
    {
      id: 3,
      description: 'This is a modern architectural marvel located in Beverly Hills, CA.',
      agent: {
        name: 'John Doe',
        image: '/placeholder.svg?height=300&width=400',
        phone: '+1234567890',
      },
      title: 'The White House',
      location: 'Washington, DC',
      price: 2850000,
      bedrooms: 4,
      bathrooms: 3,
      sqft: 3200,
      images: ['/placeholder.svg?height=300&width=400', '/placeholder.svg?height=300&width=300'],
      features: ['Pool', 'Garden', 'Smart Home'],
    },
    {
      id: 4,
      description: 'This is a modern architectural marvel located in Beverly Hills, CA.',
      agent: {
        name: 'John Doe',
        image: '/placeholder.svg?height=300&width=400',
        phone: '+1234567890',
      },
      title: 'Penthouse',
      location: 'New York, NY',
      price: 2850000,
      bedrooms: 4,
      bathrooms: 3,
      sqft: 3200,
      images: ['/placeholder.svg?height=300&width=400', '/placeholder.svg?height=300&width=300'],
      features: ['Pool', 'Garden', 'Smart Home'],
    },
    {
      id: 5,
      description: 'This is a modern architectural marvel located in Beverly Hills, CA.',
      agent: {
        name: 'John Doe',
        image: '/placeholder.svg?height=300&width=400',
        phone: '+1234567890',
      },
      title: 'Pentagon House',
      location: 'Washington, DC',
      price: 2850000,
      bedrooms: 4,
      bathrooms: 3,
      sqft: 3200,
      images: ['/placeholder.svg?height=300&width=400', '/placeholder.svg?height=300&width=300'],
      features: ['Pool', 'Garden', 'Smart Home'],
    },
    {
      id: 6,
      description: 'This is a modern architectural marvel located in Beverly Hills, CA.',
      agent: {
        name: 'John Doe',
        image: '/placeholder.svg?height=300&width=400',
        phone: '+1234567890',
      },
      title: 'Some other house',
      location: 'Washington, DC',
      price: 2850000,
      bedrooms: 4,
      bathrooms: 3,
      sqft: 3200,
      images: ['/placeholder.svg?height=300&width=400', '/placeholder.svg?height=300&width=300'],
      features: ['Pool', 'Garden', 'Smart Home'],
    },
  ]
}

export const FadeIn = ({ properties }: typeof props) => {
  return (
    <FadeInGrid>
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property}  />
      ))}
    </FadeInGrid>
  )
}

const meta: Meta = {
  title: 'Children Array/FadeIn',
  component: FadeInGrid,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: ''
      },
    }
  },
  argTypes: {},
  args: props,
}

export default meta