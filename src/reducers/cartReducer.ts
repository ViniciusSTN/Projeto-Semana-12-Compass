import { CartStateSchema, DeleteCartItemAction, ReduceCartItemAction, SentCartItemSchema, SetCartItemAction } from "../types/cartReducerSchemas"

export const SET_CART_ITEM = 'SET_CART_ITEM'
export const DELETE_CART_ITEM = 'DELETE_CART_ITEM'
export const REDUCE_CART_ITEM = 'REDUCE_CART_ITEM'

const loadCartFromLocalStorage = (): CartStateSchema => {
  try {
    const serializedState = localStorage.getItem('cartState')
    return serializedState ? JSON.parse(serializedState) : { cartItems: [] }
  } catch (err) {
    console.log(err)
    return { cartItems: [] }
  }
}

const initialState: CartStateSchema = loadCartFromLocalStorage()

const saveCartToLocalStorage = (state: CartStateSchema) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('cartState', serializedState)
  } catch (err) {
    console.log(err)
  }
}

export const cartReducer = (state = initialState, action: SetCartItemAction | DeleteCartItemAction | ReduceCartItemAction): CartStateSchema => {
  switch (action.type) {
    case SET_CART_ITEM: {
      const existingItemIndex = state.cartItems.findIndex(item => item.id === action.payload.id)

      if (existingItemIndex >= 0) {
        const updatedCartItems = state.cartItems.map((item, index) => index === existingItemIndex ? { ...item, quantity: item.quantity + action.payload.quantity, total: (item.quantity + action.payload.quantity) * item.price } : item)

        const newState = { ...state, cartItems: updatedCartItems }
        saveCartToLocalStorage(newState)
        return newState
      } else {
        const newItem = {
          ...action.payload,
          total: action.payload.quantity * action.payload.price,
        }
        const updatedCartItems = [...state.cartItems, newItem]
        
        const newState = { ...state, cartItems: updatedCartItems }
        saveCartToLocalStorage(newState)
        return newState
      }
    }
    case REDUCE_CART_ITEM: {
      const existingItemIndex = state.cartItems.findIndex(item => item.id === action.payload.id)

      if (existingItemIndex >= 0) {
        const updatedCartItems = state.cartItems.map((item, index) => index === existingItemIndex ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1, total: (item.quantity > 1 ? item.quantity - 1 : 1) * item.price } : item)

        const newState = { ...state, cartItems: updatedCartItems }
        saveCartToLocalStorage(newState)
        return newState
      }
      return state
    }
    case DELETE_CART_ITEM: {
      const updatedCartItems = state.cartItems.filter(item => item.id !== action.payload)
      const newState = { ...state, cartItems: updatedCartItems }
      saveCartToLocalStorage(newState)
      return newState
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
