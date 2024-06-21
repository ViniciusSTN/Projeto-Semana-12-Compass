import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setCartItem } from "../../reducers/cartReducer"
import { ProductSectionProps } from "../../types/singleProductSchemas"
import { SentCartItemSchema } from "../../types/cartReducerSchemas"
import { toast } from "react-toastify"

export const ProductSection = ({ product }: ProductSectionProps) => {
  const [mainImage, setMainImage] = useState<string>(product.images[0])
  const [sizeActive, setSizeActive] = useState<string | null>(null)
  const [colorActive, setColorActive] = useState<string | null>(null)
  const [quantity, setQuantity] = useState<number>(1)

  const dispatch = useDispatch()

  const isButtonDisabled = (size: string, color: string) => {
    const availabilityItem = product.availability.find(item => item.size === size && item.color === color)
    return !availabilityItem || availabilityItem.amount === 0
  }

  function handleSizeActivation(size: string) {
    if (sizeActive === size) setSizeActive(null)
    else setSizeActive(size)
  }

  function handleColorActivation(color: string) {
    if (colorActive === color) setColorActive(null)
    else setColorActive(color)
  }

  function handleDecreasingQuantity() {
    if (quantity - 1 > 0) setQuantity(quantity - 1)
  }

  function handleIncrementQuantity() {
    setQuantity(quantity + 1)
  }

  function handleAddToCart() {
    const item: SentCartItemSchema = {
      id: product.id,
      discount_percentage: product.discount_percentage,
      image: product.images[0],
      price: product.price,
      quantity: quantity,
      title: product.title,
    }
    dispatch(setCartItem(item))

    toast.success('Item added to cart')
  }

  useEffect(() => {
    if (sizeActive && colorActive) {
      const item = product.availability.find(item => item.size === sizeActive && item.color === colorActive)
      if (item?.amount && quantity > item.amount) setQuantity(item.amount)
    }
  }, [sizeActive, colorActive, product.availability, quantity])

  return (
    <section className="flex flex-wrap gap-104px justify-center pt-9 px-24 pb-14">
      <div className="flex gap-7">
        <div className="flex flex-col gap-8">
          {product.images && product.images.map((image, index) => (
            <button
              key={index}
              className="w-76px h-20 cursor-pointer"
              onClick={() => setMainImage(image)}
            >
              <img src={image} alt={product.title} className="object-cover h-full w-full" />
            </button>
          ))}
        </div>

        <div className="max-w-424px h-500px">
          <img src={mainImage} alt={product.title} className="object-cover h-full w-full" />
        </div>
      </div>

      <div>
        <h2 className="text-4.5xl font-normal">{product.title}</h2>
        <p className="font-medium text-2xl text-gray2 mb-4">Rs. {product.finalPrice.toFixed(2)}</p>
        
        <div className="flex flex-wrap gap-6 mb-5">
          <div className="flex gap-2">
            {
              Array.from({ length: Math.floor(product.stars) }).map((_, index) => (
                <img key={index} src='https://project3-images-storage.s3.us-east-2.amazonaws.com/static/estrela.svg' alt='star' />
              ))
            }
  
            {
              product.stars > Math.floor(product.stars) && (
                <img src='https://project3-images-storage.s3.us-east-2.amazonaws.com/static/estrela-metade.svg' alt='star' />
              )
            }
          </div>
  
          <p className="border-l border-gray2 text-gray2 px-6">{product.reviews} Customer Review</p>
        </div>

        <p className="text-sm max-w-424px mb-6">Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound.</p>

        <p className="text-sm text-gray2 mb-3">Size</p>
        <div className="flex gap-4 mb-5">
          {
            product.types.sizes.map((size, index) => (
              <button 
                key={index} 
                className={`h-8 w-8 relative uppercase rounded-lg text-sm ${sizeActive === size ? 'text-white bg-goldenbrown' : 'bg-off-white200 text-black'}`} 
                onClick={() => handleSizeActivation(size)}
                disabled={colorActive ? isButtonDisabled(size, colorActive) : false}
              >
                {size}
                {sizeActive !== size && colorActive && isButtonDisabled(size, colorActive) && <span className="absolute bg-gray2 opacity-50 rounded-lg inset-0"></span>}
              </button>
            ))
          }
        </div>

        <p className="text-sm text-gray2 mb-3">Color</p>
        <div className="flex gap-4 mb-8">
          {
            product.types.colors.map((color, index) => (
              <button 
                key={index} 
                className={`h-8 w-8 relative rounded-full border border-gray100 text-sm ${colorActive === color && 'outline outline-2 outline-blue-700'}`} 
                style={{ backgroundColor: color }} 
                onClick={() => handleColorActivation(color)}
                disabled={sizeActive ? isButtonDisabled(sizeActive, color) : false}
              >
                {colorActive !== color && sizeActive && isButtonDisabled(sizeActive, color) && <span className="absolute bg-gray2 opacity-80 rounded-full inset-0 flex items-center justify-center text-3xl">X</span>}
              </button>
            ))
          }
        </div>

        <div className="flex flex-wrap gap-5 mb-16">
          <div className="border border-gray2 w-32 rounded-xl flex justify-between items-center">
            <button onClick={handleDecreasingQuantity} disabled={quantity === 1} className="grow h-full">-</button>
            <span className="w-5 text-center">{quantity}</span>
            <button onClick={handleIncrementQuantity} className="grow h-full">+</button>
          </div>

          <button className={`w-212px h-16 text-xl border border-black rounded-2xl ${!(sizeActive && colorActive) && 'bg-gray400 cursor-not-allowed'}`} disabled={sizeActive && colorActive ? false : true} onClick={handleAddToCart}>Add To Cart</button>
        </div>

        <div className="border-t border-gray400 pt-10 text-gray2 flex flex-col gap-3">
          <div className="flex">
            <p className="w-20">Sku</p>
            <p>
              <span className="mr-4">:</span>
              <span>{product.sku}</span>
            </p>
          </div>

          <div className="flex">
            <p className="w-20">Category</p>
            <p>
              <span className="mr-4">:</span>
              <span>{product.category}</span>
            </p>
          </div>

          <div className="flex">
            <p className="w-20">Tags</p>
            <p>
              <span className="mr-4">:</span> 
              { 
                product.tags.map((tag, index) => (
                  <span key={index}>
                    {tag}
                    
                    {index < product.tags.length - 1 && (
                      <span>, </span>
                    )}
                  </span>
                )) 
              }
            </p>
          </div>

          <div className="flex">
            <p className="w-20">Share</p>
            <span className="mr-4">:</span>
        
            <div className="flex items-center gap-6">
              <button>
                <img src="https://project3-images-storage.s3.us-east-2.amazonaws.com/static/facebook-preto.svg" alt="facebook" />
              </button>
  
              <button>
                <img src="https://project3-images-storage.s3.us-east-2.amazonaws.com/static/linkedin-preto.svg" alt="linkedin" />
              </button>
  
              <button>
                <img src="https://project3-images-storage.s3.us-east-2.amazonaws.com/static/twitter-preto.svg" alt="twitter" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
