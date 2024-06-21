import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { ProductWithPriceSchema } from "../../types/productSchemas"
import { getAllProducts, getProductsByCategories } from "../../data/getProducts"
import { RootState } from "../../types/reducerSchema"
import { Product } from "../Others/Product"
import { Loading } from "../Others/Loading"
import { setAmountShowing, setPage, setResults } from "../../reducers/filterReducer"
import { ShopSectionsProps } from "../../types/shopSchemas"

const PATH_URL: string = import.meta.env.VITE_PRODUCTS_DATA_API_PATH

export const ShopProducts = ({ itemsPerPage }: ShopSectionsProps) => {
  const [products, setProducts] = useState<ProductWithPriceSchema[]>([])
  const [sortedProducts, setSortedProducts] = useState<ProductWithPriceSchema[]>([])
  const [paginatedProducts, setPaginatedProducts] = useState<ProductWithPriceSchema[]>([])
  const [filters, setFilters] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [sortFilter, setSortFilter] = useState<string | null>("default")
  const [totalPages, setTotalPages] = useState(0)

  const reduxFilters = useSelector((state: RootState) => state.filters.typeFilter)
  const reduxSorts = useSelector((state: RootState) => state.filters.sortFilter)

  const dispatch = useDispatch()

  useEffect(() => {
    setFilters(reduxFilters)
  }, [reduxFilters])

  useEffect(() => {
    setSortFilter(reduxSorts)
  }, [reduxSorts])

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true)
      const response = await getProductsByCategories(PATH_URL, filters)
      if (response) setProducts(response)
      setLoading(false)
    }

    async function fetchAllProducts() {
      setLoading(true)
      const allProducts = await getAllProducts(PATH_URL)
      if (allProducts) setProducts(allProducts)
      setLoading(false)
    }

    if (filters.length > 0) {
      fetchProducts()
    } else {
      fetchAllProducts()
    }
  }, [filters])

  useEffect(() => {
    const sortedProducts = [...products].sort((a, b) => {
      switch (sortFilter) {
        case "priceAsc":
          return a.finalPrice - b.finalPrice
        case "priceDesc":
          return b.finalPrice - a.finalPrice
        case "discountAsc":
          return a.discount_percentage - b.discount_percentage
        case "discountDesc":
          return b.discount_percentage - a.discount_percentage
        default:
          return 0
      }
    })
    setSortedProducts(sortedProducts)
    dispatch(setResults(sortedProducts.length))
  }, [products, sortFilter, reduxSorts, dispatch])

  useEffect(() => {
    const startIdx = (currentPage - 1) * itemsPerPage
    const endIdx = startIdx + itemsPerPage
    const paginated = sortedProducts.slice(startIdx, endIdx)
    setPaginatedProducts(paginated)
    dispatch(setAmountShowing(paginated.length))

    const total = Math.ceil(sortedProducts.length / itemsPerPage)
    setTotalPages(total)
  }, [sortedProducts, currentPage, itemsPerPage, dispatch])

  useEffect(() => {
    dispatch(setPage(currentPage))
  }, [currentPage, dispatch])

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const generatePagination = () => {
    const pages = []
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)
      if (currentPage > 3) {
        pages.push('...')
      }
      if (currentPage > 2) pages.push(currentPage - 1)
      if (currentPage !== 1 && currentPage !== totalPages) pages.push(currentPage)
      if (currentPage < totalPages - 1) pages.push(currentPage + 1)
      if (currentPage < totalPages - 2) {
        pages.push('...')
      }
      pages.push(totalPages)
    }
    return pages
  }

  return (
    <section className="max-w-1440px mx-auto mb-20 min-h-540px relative px-5 md:px-24">
      {loading && <Loading />}

      {!loading && (
        <div className="grid grid-cols-responsive gap-8 mb-10">
          {paginatedProducts.map((product) => (
            <div key={product.id} className="flex justify-center">
              <Product
                title={product.title}
                price={product.price}
                discount_percentage={product.discount_percentage}
                finalPrice={product.finalPrice}
                new={product.new}
                images={product.images}
                brief_description={product.brief_description}
                id={product.id}
              />
            </div>
          ))}
        </div>
      )}

      {!loading && (
        <div className="flex gap-2 font-Poppins text-xl justify-center">
          {generatePagination().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === 'number' && handlePageChange(page)}
              disabled={currentPage === page}
              className={`font-normal rounded-lg h-8 w-8 sm:h-14 sm:w-14 ${currentPage === page ? 'bg-goldenbrown text-white' : 'bg-off-white200'}`}
            >
              {page}
            </button>
          ))}
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="font-light rounded-lg bg-off-white200 h-8 w-14 sm:h-14 sm:w-24">
            Next
          </button>
        </div>
      )}
    </section>
  )
}
