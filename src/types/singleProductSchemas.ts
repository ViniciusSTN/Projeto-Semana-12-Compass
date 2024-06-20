import { ProductWithPriceSchema } from "./productSchemas"

export type PathSectionPropsSchema = {
  name: string
}

export type ProductSectionProps = {
  product: ProductWithPriceSchema
}

export type DescriptionSectionProps = {
  description: string
  additional: string
  images: string[]
  name: string
}

export type RelatedProductsSectionProps = {
  category: string
}
