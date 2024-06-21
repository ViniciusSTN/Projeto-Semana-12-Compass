import { useEffect, useState } from "react"
import { RelatedProductsSectionProps } from "../../types/singleProductSchemas"
import { ProductWithPriceSchema } from "../../types/productSchemas"
import { getProductsByCategories } from "../../data/getProducts"
import { Loading } from "../Others/Loading"
import { Product } from "../Others/Product"

const PATH = import.meta.env.VITE_PRODUCTS_DATA_API_PATH

export const RelatedProductsSection = ({ category }: RelatedProductsSectionProps) => {
  const [products, setProducts] = useState<ProductWithPriceSchema[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    async function getProducts() {
      const response = await getProductsByCategories(PATH, [category])

      if (response) {
        setProducts(response.slice(0, 4))
      }

      setLoading(false)
    }

    getProducts()
  }, [category])

  return (
    <section className="relative flex flex-col items-center px-24 pt-14 pb-24 border-t border-gray400">
      { loading && <Loading />}

      <h3 className="tex-center font-medium text-4xl mb-6">Related Products</h3>

      <div className="flex flex-wrap gap-8 justify-center mb-11">
        { 
          products.length > 0 && !loading && products.map(product => (
            <Product
              key={product.id}
              brief_description={product.brief_description}
              discount_percentage={product.discount_percentage}
              finalPrice={product.finalPrice}
              id={product.id}
              images={product.images}
              new={product.new}
              price={product.price}
              title={product.title}
            />
          ))
        }
      </div>

      <a href="/shop" className="border border-goldenbrown text-goldenbrown font-semibold w-60 h-12 flex items-center justify-center hover:text-white hover:bg-goldenbrown">
        Show more
      </a>
    </section>
  )
}
