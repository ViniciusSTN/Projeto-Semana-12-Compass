import { useSelector } from "react-redux"
import { RootState } from "../../types/reducerSchema"
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { deleteCartItem, reduceCartItem, setCartItem } from "../../reducers/cartReducer"
import { calculateSubtotalCart, calculateTotalCart } from "../../data/calculatePrice"
import { SentCartItemSchema } from "../../types/cartReducerSchemas"

export const ListCartItemsSection = () => {
  const [subtotalCart, setSubtotalCart] = useState<number>(0)
  const [totalCart, setTotalCart] = useState<number>(0)

  const cartItems = useSelector((state: RootState) => state.shoppingCart.cartItems)
  const dispatch = useDispatch()

  function handleDeleteItem(id: number) {
    dispatch(deleteCartItem(id))
  }

  function handleIncreaseItemQuantity(item: SentCartItemSchema) {
    dispatch(setCartItem({ ...item, quantity: 1}))
  }

  function handleReduceItemQuantity(item: SentCartItemSchema) {
    dispatch(reduceCartItem(item))
  }

  useEffect(() => {
    const subtotal = calculateSubtotalCart(cartItems)
    setSubtotalCart(subtotal)

    const total = calculateTotalCart(cartItems)
    setTotalCart(total)
  }, [cartItems])

  return (
    <section className="mx-24 my-20 flex flex-wrap gap-8 justify-center font-Poppins">
      <table>
        <thead className="bg-off-white200 font-medium">
          <tr>
            <th scope="col" className="px-6 py-3 text-center font-medium tracking-wider">
              Product
            </th>
            <th scope="col" className="px-6 py-3 text-center font-medium tracking-wider">
              Price
            </th>
            <th scope="col" className="px-6 py-3 text-center font-medium tracking-wider">
              Quantity
            </th>
            <th scope="col" className="px-6 py-3 text-center font-medium tracking-wider">
              Subtotal
            </th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200 mt-14">
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td className="py-6">
                <div className="flex items-center gap-9">
                  <div className="h-24 w-24 overflow-hidden rounded-lg">
                    <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                  </div>
                  <p className="font-normal text-gray2">{item.title}</p>
                </div>
              </td>

              <td className="px-12">
                <p className="font-normal text-gray2">Rs. {item.price.toFixed(2)}</p>
              </td>

              <td>
                <div className="border border-gray2 rounded-full flex items-center justify-between">
                  <button className="py-3 px-5" onClick={() => handleReduceItemQuantity(item)}>-</button>
                  <p className="font-medium">{item.quantity}</p>
                  <button className="py-3 px-5" onClick={() => handleIncreaseItemQuantity(item)}>+</button>
                </div>
              </td>

              <td>
                <p className="px-10 font-normal">Rs. {item.total.toFixed(2)}</p>
              </td>

              <td>
                <button onClick={() => handleDeleteItem(item.id)}>
                  <i><img src="https://project3-images-storage.s3.us-east-2.amazonaws.com/static/remove.svg" alt="remove" /></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="bg-off-white200 px-76px h-392px flex flex-col justify-evenly">
        <h3 className="font-semibold text-3.3xl text-center">Cart Totals</h3>

        <div className="flex gap-14">
          <p className="font-medium">Subtotal</p>
          <p className="text-gray2">Rs. {subtotalCart.toFixed(2)}</p>
        </div>

        <div className="flex gap-14">
          <p className="font-medium">Total</p>
          <p className="text-goldenbrown font-medium text-xl">Rs. {totalCart.toFixed(2)}</p>
        </div>

        <a href="/checkout" className={`font-normal text-xl flex items-center justify-center border border-black rounded-2xl h-14 ${cartItems.length === 0 && 'pointer-events-none'}`}>Checkout</a>
      </div>
    </section>
  )
}
