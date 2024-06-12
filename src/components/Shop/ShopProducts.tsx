import { useEffect, useState } from "react"
import { ProductWithPriceSchema } from "../../types/productSchemas"
import { getProductsByCategories } from "../../data/getProducts"

const PATH_URL: string = import.meta.env.VITE_PRODUCTS_DATA_API_PATH

export const ShopProducts = () => {
  const [products, setProducts] = useState<ProductWithPriceSchema[]>([])

  useEffect(() => {
    async function fetchProducts() {
      const response = await getProductsByCategories(PATH_URL, [])
      if (response) {
        const topEight = response.splice(0, 8)
        setProducts(topEight)
      }
    }
  
    fetchProducts()
  }, [])

  return (
    <section>
      <div className="grid grid-cols-responsive gap-8 mb-10">

      </div>
    </section>
  )
}
