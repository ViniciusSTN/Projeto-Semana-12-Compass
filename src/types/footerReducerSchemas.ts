import { SET_EMAIL } from "../reducers/footerReducer"

export type FooterEmailStateSchema = {
  emails: string[]
}

export interface FooterSetEmailActionSchema {
  type: typeof SET_EMAIL
  payload: string
}
