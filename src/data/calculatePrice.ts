import { ProductSchema, ProductWithPriceSchema } from "../types/productSchemas";

export default function calculatePrice(products: ProductSchema[]): ProductWithPriceSchema[] {
  return products.map(product => {
    const finalPrice = product.price - (product.price * product.discount_percentage / 100)
    return { ...product, finalPrice: finalPrice }
  })
}
