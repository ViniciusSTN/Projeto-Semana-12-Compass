import { useEffect, useState } from "react"
import { getProductsByTags } from "../../data/getProducts"
import { ProductWithPriceSchema } from "../../types/productSchemas"
import { Product } from "../Others/Product"
import { Loading } from "../Others/Loading"

const PATH_URL: string = import.meta.env.VITE_PRODUCTS_DATA_API_PATH

export const HomeThirdSection = () => {
  const [products, setProducts] = useState<ProductWithPriceSchema[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    async function fetchProducts() {
      const response = await getProductsByTags(PATH_URL, ['home'])
      if (response) {
        const topEight = response.splice(0, 8)
        setProducts(topEight)
      }
      setLoading(false)
    }
  
    fetchProducts()
  }, [])

  return (
    <section className="px-14">
      <div className="max-w-1236px mx-auto">
        <h3 className="font-Poppins font-bold text-4.5xl text-center mb-8">Our Products</h3>
  
        {loading && (
          <div className='relative h-96'>
            <Loading />
          </div>
        )}

        <div className="grid grid-cols-responsive gap-8 mb-8">
          {
            !loading && products.length > 0 && (
              products.map((product) => (
                <div key={product.id} className="flex justify-center">
                  <Product 
                    brief_description={product.brief_description}
                    discount_percentage={product.discount_percentage}
                    finalPrice={product.finalPrice}
                    images={product.images}
                    new={product.new}
                    price={product.price}
                    title={product.title}
                    id={product.id}
                  />
                </div>
              ))
            )
          }
        </div>

        <a href="/shop" className="border border-goldenbrown text-goldenbrown w-60 h-12 flex items-center justify-center font-Poppins font-semibold mx-auto mb-16">
          Show More
        </a>
      </div>
    </section>
  )
}
