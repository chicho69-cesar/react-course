import type { Meta } from '@storybook/react-vite'
import PropertyCardSpread from '.'
import type { Property } from '../../../../types'

const propsToSend: Property = {
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
  images: ['/placeholder.svg?height=300&width=400', '/placeholder.svg?height=300&width=400'],
  features: ['Pool', 'Garden', 'Smart Home'],
}

export const SpreadProps = (props: Property) => (
  <PropertyCardSpread {...props} />
)

export const ManualProps = (data: Property) => (
  <PropertyCardSpread
    agent={data.agent}
    bathrooms={data.bathrooms}
    bedrooms={data.bedrooms}
    description={data.description}
    features={data.features}
    id={data.id}
    images={data.images}
    location={data.location}
    price={data.price}
    sqft={data.sqft}
    title={data.title}
  />
)

const meta: Meta = {
  title: 'Basic Components/Spread Props/Property Card',
  component: PropertyCardSpread,
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
  args: propsToSend,
} satisfies Meta<typeof PropertyCardSpread>

export default meta