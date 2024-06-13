import axios from 'axios'
import { ProductResponseSchema, ProductWithPriceSchema } from '../types/productSchemas'
import calculatePrice from './calculatePrice'

const PRODUCTS_URL_API = import.meta.env.VITE_PRODUCTS_DATA_API_KEY

export async function getAllProducts(path: string): Promise<ProductWithPriceSchema[] | null> {
  try {
    const response = await axios.get<ProductResponseSchema>(`${PRODUCTS_URL_API}/${path}`)
    return calculatePrice(response.data.products)
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function getProductById(path: string, id: number): Promise<ProductWithPriceSchema | null> {
  try {
    const products = await getAllProducts(path)
    
    if (products) {
      const product: ProductWithPriceSchema | undefined = products.find(product => product.id === id)
      if (product) return product
    }
    return null
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function getProductsByCategories(path: string, categories: string[]): Promise<ProductWithPriceSchema[] | null> {
  try {
    const products = await getAllProducts(path)

    if (products) {
      const filteredProductsByCategories = products.filter((product) => {
        return categories.includes(product.category)
      });
      return filteredProductsByCategories
    }
    return null
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function getProductsByTags(path: string, tags: string[]): Promise<ProductWithPriceSchema[] | null> {
  try {
    const products = await getAllProducts(path)
    
    if (products) {
      const filteredProductsByTag: ProductWithPriceSchema[] = products.filter((product) => {
        return tags.some(tag => product.tags.includes(tag))
      })
      return filteredProductsByTag
    }
    return null
  } catch (error) {
    console.error(error)
    return null
  }
}
