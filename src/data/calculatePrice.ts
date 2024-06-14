import { CartItemSchema } from "../types/cartReducerSchemas";
import { ProductSchema, ProductWithPriceSchema } from "../types/productSchemas";

export default function calculatePrice(products: ProductSchema[]): ProductWithPriceSchema[] {
  return products.map(product => {
    const finalPrice = product.price - (product.price * product.discount_percentage / 100)
    return { ...product, finalPrice: finalPrice }
  })
}

export function calculateSubtotalCart(products: CartItemSchema[]) {
  return products.reduce((acc, product) => acc + product.total, 0)
}

export function calculateTotalCart(products: CartItemSchema[]) {
  const productsWithDiscount = products.map(product => product.total - (product.total * product.discount_percentage / 100))
  return productsWithDiscount.reduce((acc, valueWithDiscount) => acc + valueWithDiscount, 0)
}
