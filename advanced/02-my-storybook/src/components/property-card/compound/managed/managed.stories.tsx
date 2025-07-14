import type { Meta } from '@storybook/react-vite'
import PropertyCard from '.'
import type { Property } from '../../../../types'

const args: { value: Property } = {
  value: {
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
    images: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=300"],
    features: ["Pool", "Garden", "Smart Home"],
  }
}

export const Managed = (props: typeof args) => {
  return (
    <PropertyCard value={props.value}>
      <PropertyCard.Card>
        <PropertyCard.Overlay>
          <PropertyCard.Price />
        </PropertyCard.Overlay>

        <PropertyCard.Gallery />

        <PropertyCard.Content>
          <PropertyCard.Location />
          <PropertyCard.Title />
          <PropertyCard.Description />
          <PropertyCard.Features />
          <PropertyCard.Stats />
        </PropertyCard.Content>
      </PropertyCard.Card>
    </PropertyCard>
  )
}

const meta: Meta = {
  title: 'Compound/Managed/PropertyCard',
  component: PropertyCard,
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
  args: args,
} satisfies Meta<typeof PropertyCard>

export default meta
