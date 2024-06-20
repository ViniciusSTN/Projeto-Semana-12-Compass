import { useLocation } from "react-router-dom"
import { PathSection } from "../components/Product/PathSection"
import { useEffect, useState } from "react"
import { ProductWithPriceSchema } from "../types/productSchemas"
import { getProductById } from "../data/getProducts"
import { Loading } from "../components/Others/Loading"
import { ProductSection } from "../components/Product/ProductSection"
import { DescriptionSection } from "../components/Product/DescriptionSection"
import { RelatedProductsSection } from "../components/Product/RelatedProductsSection"

const PATH = import.meta.env.VITE_PRODUCTS_DATA_API_PATH

export const SingleProduct = () => {
  const path = useLocation()

  const { pathname } = path
  const productId = Number(pathname.split("/").pop())

  const [product, setProduct] = useState<ProductWithPriceSchema | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    async function getProduct(id: number) {
      const response = await getProductById(PATH, id)

      if (response) {
        setProduct(response)
      }

      setLoading(false)
    }

    getProduct(productId)
  }, [productId])

  return (
    <main className="max-w-1440px mx-auto font-Poppins min-h-643px relative">
      { loading && <Loading />}

      { 
        product && !loading && (
          <>
            <PathSection name={product.title} />
            <ProductSection product={product}/>
            <DescriptionSection 
              description={product.full_description} 
              additional={product.additional_information}
              images={product.images}
              name={product.title}
            />
            <RelatedProductsSection category={product.category} />
          </>
        )
      }
    </main>
  )
}
