import type { Meta } from '@storybook/react-vite'
import WithSearch from '.'
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
  ]
}

export const Search = ({ properties }: typeof props) => (
  <WithSearch>
    {(query) => {
      const filteredProperties = properties.filter((property) => {
        return property.title.toLowerCase().includes(query.toLowerCase())
      })

      return (
        <div className='grid grid-cols-2 gap-4'>
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )
    }}
  </WithSearch>
)

const meta: Meta = {
  title: 'Render Props/Search',
  component: WithSearch,
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
