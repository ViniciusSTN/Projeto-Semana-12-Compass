export type AvailabilitySchema = {
  size: string
  color: string
  amount: number
}

export type TypesSchema = {
  sizes: string[]
  colors: string[]
}

export type ProductSchema = {
  id: number
  sku: string
  title: string
  brief_description: string
  price: number
  new: boolean
  discount_percentage: number
  description: string
  full_description: string
  additional_information: string
  stars: number
  reviews: number
  availability: AvailabilitySchema[]
  types: TypesSchema
  category: string
  tags: string[]
  images: string[]
}

export type ProductResponseSchema = {
  products: ProductSchema[]
}

export type ProductWithPriceSchema = ProductSchema & {
  finalPrice: number
}
