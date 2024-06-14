import { DELETE_CART_ITEM, REDUCE_CART_ITEM, SET_CART_ITEM } from "../reducers/cartReducer"

export type SentCartItemSchema = {
  id: number
  title: string
  price: number
  discount_percentage: number
  quantity: number
  image: string
}

export type CartItemSchema = SentCartItemSchema & { total: number };

export type CartStateSchema = {
  cartItems: CartItemSchema[]
}

export interface SetCartItemAction {
  type: typeof SET_CART_ITEM
  payload: SentCartItemSchema
}

export interface ReduceCartItemAction {
  type: typeof REDUCE_CART_ITEM
  payload: SentCartItemSchema
}

export interface DeleteCartItemAction {
  type: typeof DELETE_CART_ITEM
  payload: number
}
