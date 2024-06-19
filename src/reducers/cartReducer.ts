import { CartReducerActionPropsSchema, CartStateSchema, SentCartItemSchema } from "../types/cartReducerSchemas"

export const SET_CART_ITEM = 'SET_CART_ITEM'
export const DELETE_CART_ITEM = 'DELETE_CART_ITEM'
export const REDUCE_CART_ITEM = 'REDUCE_CART_ITEM'

const initialState: CartStateSchema = { cartItems: [] }

export const cartReducer = (state: CartStateSchema = initialState, action: CartReducerActionPropsSchema) => {
  switch (action.type) {
    case SET_CART_ITEM: {
      const existingItemIndex = state.cartItems.findIndex(item => item.id === action.payload.id)

      if (existingItemIndex >= 0) {
        const updatedCartItems = state.cartItems.map((item, index) => 
          index === existingItemIndex ? { ...item, quantity: item.quantity + action.payload.quantity, total: (item.quantity + action.payload.quantity) * item.price } : item
        )
        return { ...state, cartItems: updatedCartItems }
      } else {
        const newItem = { ...action.payload, total: action.payload.quantity * action.payload.price }
        const updatedCartItems = [...state.cartItems, newItem]
        return { ...state, cartItems: updatedCartItems }
      }
    }
    case REDUCE_CART_ITEM: {
      const existingItemIndex = state.cartItems.findIndex(item => item.id === action.payload.id)

      if (existingItemIndex >= 0) {
        const updatedCartItems = state.cartItems.map((item, index) => 
          index === existingItemIndex ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1, total: (item.quantity > 1 ? item.quantity - 1 : 1) * item.price } : item
        )
        return { ...state, cartItems: updatedCartItems }
      }
      return state
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

export const reduceCartItem = (item: SentCartItemSchema) => ({
  type: REDUCE_CART_ITEM,
  payload: item,
})

export const deleteCartItem = (id: number) => ({
  type: DELETE_CART_ITEM,
  payload: id,
})
