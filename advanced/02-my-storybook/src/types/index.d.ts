export interface Property {
  id: number
  title: string
  location: string
  price: number
  bedrooms: number
  bathrooms: number
  sqft: number
  images: string[]
  features: string[]
  description: string
  agent: {
    name: string
    image: string
    phone: string
  }
}

export interface TabItem {
  title: string
  content: React.ReactNode | React.ReactNode[]
}
