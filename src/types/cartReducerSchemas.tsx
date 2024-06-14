import { DELETE_CART_ITEM, SET_CART_ITEM } from "../reducers/cartReducer"

export type SentCartItemSchema = {
  id: number
  title: string
  finalPrice: number
  amount: number
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

export interface DeleteCartItemAction {
  type: typeof DELETE_CART_ITEM
  payload: number
}
