import { useEffect, useState } from "react"
import { ShoppingCartProps } from "../../types/ShoppingCartSchemas"
import { RootState } from "../../types/reducerSchema"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { deleteCartItem } from "../../reducers/cartReducer"

export const ShoppingCart = ({ children }: ShoppingCartProps) => {
  const [overlay, setOverlay] = useState<boolean>(false)
  const [totalCart, setTotalCart] = useState<number>(0)

  const cartItems = useSelector((state: RootState) => state.shoppingCart.cartItems)
  const dispatch = useDispatch()

  useEffect(() => {
    const totalPrice = cartItems.reduce((acc, item) => acc + item.total, 0)
    setTotalCart(totalPrice)
  }, [cartItems])

  function handleDeleteItem(id: number) {
    dispatch(deleteCartItem(id))
  }

  function handleBtnClick() {
    setOverlay(true)
  }

  return (
    <>
      <button className="font-Poppins font-medium flex flex-col gap-1 items-center" onClick={handleBtnClick}>
        <i><img src="https://project3-images-storage.s3.us-east-2.amazonaws.com/static/carrinho.svg" alt="cart" /></i>
        {children}
      </button>

      {
        overlay && (
          <button className="fixed z-40 left-0 top-0 right-0 bottom-0 bg-black opacity-20" onClick={() => setOverlay(false)}></button>
        )
      }
      
      {
        overlay && (
          <div className="absolute z-50 top-0 right-0 bg-white font-Poppins">
            <div className="py-7 pl-7 pr-10">
              <div className="flex justify-between">
                <h3 className="font-semibold text-2xl">Shopping cart</h3>
                <button onClick={() => setOverlay(false)}>
                  <img src="https://project3-images-storage.s3.us-east-2.amazonaws.com/static/card-close-icon.svg" alt="close" />
                </button>
              </div>

              <div className="mt-6 border-t border-gray400 flex flex-col gap-5 pt-11 h-500px overflow-y-scroll">
                {
                  cartItems.length > 0 ? (
                    cartItems.map((item) => (
                      <div className="flex items-center justify-between" key={item.id}>
                        <div className="h-24 w-24 flex items-center justify-center overflow-hidden rounded-lg mr-8">
                          <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                        </div>
                        <div className="flex flex-col gap-2 mr-12">
                          <h4 className="font-normal">{item.title}</h4>
                          <div className="flex gap-4 items-center">
                            <span className="font-light">{item.amount}</span>
                            <span className="font-light text-xs">x</span>
                            <span className="text-goldenbrown font-medium text-xs">Rs. {item.finalPrice}</span>
                          </div>
                        </div>
                        <button onClick={() => handleDeleteItem(item.id)}>
                          <i><img src="https://project3-images-storage.s3.us-east-2.amazonaws.com/static/remover-item.svg" alt="remove" /></i>
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-center">You have no items in your cart yet</p>
                  )
                }
              </div>
            </div>

            <div className="flex justify-between pl-7 pr-10 py-5">
              <p className="font-normal">Subtotal</p>
              <p className="font-semibold text-goldenbrown">Rs. {totalCart.toFixed(2)}</p>
            </div>

            <div className="border-t border-gray400">
              <div className="py-7 pl-7 pr-10 font-Poppins flex gap-4 justify-between">
                <a href="/cart" className="flex items-center justify-center font-normal text-xs px-7 py-2 border border-black rounded-full">Cart</a>
                <a href="/checkout" className="flex items-center justify-center font-normal text-xs px-7 py-2 border border-black rounded-full">Checkout</a>
                <a href="/comparison" className="flex items-center justify-center font-normal text-xs px-7 py-2 border border-black rounded-full">Comparison</a>
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}
