import type { Meta } from '@storybook/react-vite'
import PropertyCard from '.'

const properties: React.ComponentProps<typeof PropertyCard> = {
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
    images: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
    features: ["Pool", "Garden", "Smart Home"],
  },
}

export const Presentational = (props: typeof properties) => (
  <PropertyCard {...props} />
)

const meta: Meta = {
  title: 'Container Presentational/Presentational/Property Card',
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
  args: properties,
} satisfies Meta<typeof PropertyCard>

export default meta
