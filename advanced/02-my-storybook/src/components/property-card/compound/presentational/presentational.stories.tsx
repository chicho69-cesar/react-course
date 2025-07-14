import type { Meta } from '@storybook/react-vite'
import PropertyCard from '.'
import type { Property } from '../../../../types/index'

const properties: Property = {
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

export const Default = (props: typeof properties) => (
  <PropertyCard>
    <PropertyCard.Overlay>
      <PropertyCard.Price price={props.price} />
    </PropertyCard.Overlay>

    <PropertyCard.Gallery images={props.images} />

    <PropertyCard.Content>
      <PropertyCard.Title title={props.title} />
      <PropertyCard.Location location={props.location} />
      <PropertyCard.Description description={props.description} />
      <PropertyCard.Features features={props.features} />
    </PropertyCard.Content>
  </PropertyCard>
)

export const NoGallery = (props: typeof properties) => (
  <PropertyCard>
    <PropertyCard.Content>
      <PropertyCard.Title title={props.title} />
      <PropertyCard.Location location={props.location} />
      <PropertyCard.Description description={props.description} />
      <PropertyCard.Features features={props.features} />
      
      <PropertyCard.Stats
        bedrooms={props.bedrooms}
        bathrooms={props.bathrooms}
        sqft={props.sqft}
      />
    </PropertyCard.Content>
  </PropertyCard>
)

export const SwitchedOrder = (props: typeof properties) => (
  <PropertyCard>
    <PropertyCard.Overlay>
      <PropertyCard.Price price={props.price} />
    </PropertyCard.Overlay>

    <PropertyCard.Gallery images={props.images} />

    <PropertyCard.Content>
      <PropertyCard.Location location={props.location} />
      <PropertyCard.Title title={props.title} />
    </PropertyCard.Content>
  </PropertyCard>
)

const meta: Meta = {
  title: 'Compound/Presentational/Property Card',
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
}

export default meta
