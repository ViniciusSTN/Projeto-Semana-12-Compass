import { useState } from 'react'
import { ProductSchema } from '../../types/productComponentSchemas'
import { useDispatch } from 'react-redux'
import { setCartItem } from '../../reducers/cartReducer'
import { SentCartItemSchema } from '../../types/cartReducerSchemas'

export const Product = ({
  images,
  discount_percentage,
  new: isNew,
  title,
  brief_description,
  finalPrice,
  price,
  id,
}: ProductSchema ) => {
  const [hover, setHover] = useState(false)

  const dispatch = useDispatch()

  function handleAddItemToCart() {
    const item: SentCartItemSchema = {
      id,
      title,
      finalPrice,
      amount: 1,
      image: images[0],
    }
    dispatch(setCartItem(item))
  }

  return (
    <div className="w-285px relative" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>

      <a href={`/product/${id}`} className={`absolute bg-darkgreen top-0 bottom-0 right-0 left-0 z-10 transition-opacity duration-300 ${hover ? 'opacity-70 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}></a>

      <div className={`font-Poppins font-semibold absolute z-20 top-1/2 transform -translate-y-1/2 flex flex-col items-center w-full transition-opacity duration-300 ${hover ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>

        <button className='text-goldenbrown bg-white w-52 h-12 mb-6' onClick={handleAddItemToCart}>Add to cart</button>

        <div className='text-white flex gap-5'>
          <button className='flex items-center gap-1'>
            <img src="https://project3-images-storage.s3.us-east-2.amazonaws.com/static/share.svg" alt="share" />
            Share
          </button>

          <button className='flex items-center gap-1'>
            <img src="https://project3-images-storage.s3.us-east-2.amazonaws.com/static/compare.svg" alt="compare" />
            Compare
          </button>

          <button className='flex items-center gap-1'>
            <img src="https://project3-images-storage.s3.us-east-2.amazonaws.com/static/like.svg" alt="like" />
            Like
          </button>
        </div>
      </div>
    

      <div className="h-300px">
        <img src={images[0]} alt={title} className="h-full object-cover" />
      </div>

      <div className="bg-lightgray flex flex-col gap-3 pt-4 px-5 h-36">
        <h4 className="font-Poppins font-semibold text-2xl text-darkgreen h-7 overflow-clip">{title}</h4>
        <small className="font-Poppins font-medium text-gray100">{brief_description}</small>
        <div className="font-Poppins flex gap-4 items-end">
          <span className="font-semibold text-xl text-darkgreen">Rp {finalPrice.toFixed(2)}</span>
          <span className="line-through font-normal text-silver">Rp {price.toFixed(2)}</span>
        </div>
      </div>

      {discount_percentage > 0 ? (
        <span className="absolute top-6 right-6 bg-red-accents h-12 w-12 rounded-full flex justify-center items-center text-white font-Poppins font-medium">-{discount_percentage}%</span>
      ) : isNew ? (
        <span className="absolute top-6 right-6 bg-green-accents h-12 w-12 rounded-full flex justify-center items-center text-white font-Poppins font-medium">New</span>
      ) : null}
    </div>
  )
}
