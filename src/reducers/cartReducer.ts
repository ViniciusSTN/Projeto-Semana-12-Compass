import { CartStateSchema, DeleteCartItemAction, SentCartItemSchema, SetCartItemAction } from "../types/cartReducerSchemas"

export const SET_CART_ITEM = 'SET_CART_ITEM'
export const DELETE_CART_ITEM = 'DELETE_CART_ITEM'

const initialState: CartStateSchema = {
  cartItems: [],
}

export const cartReducer = (state = initialState, action: SetCartItemAction | DeleteCartItemAction): CartStateSchema => {
  switch (action.type) {
    case SET_CART_ITEM: {
      const existingItemIndex = state.cartItems.findIndex(item => item.id === action.payload.id)

      if (existingItemIndex >= 0) {
        const updatedCartItems = state.cartItems.map((item, index) =>  index === existingItemIndex ? { ...item, amount: item.amount + action.payload.amount, total: (item.amount + action.payload.amount) * item.finalPrice} : item)

        return { ...state, cartItems: updatedCartItems }
      } else {
        const newItem = {
          ...action.payload,
          total: action.payload.amount * action.payload.finalPrice,
        }

        return { ...state, cartItems: [...state.cartItems, newItem] }
      }
    }
    case DELETE_CART_ITEM: {
      const updatedCartItems = state.cartItems.filter(item => item.id !== action.payload)
      return { ...state, cartItems: updatedCartItems }
    }
    default:
      return state
  }
}

export const setCartItem = (item: SentCartItemSchema) => ({
  type: SET_CART_ITEM,
  payload: item,
})

export const deleteCartItem = (id: number) => ({
  type: DELETE_CART_ITEM,
  payload: id,
})
