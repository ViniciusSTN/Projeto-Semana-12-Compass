import { FooterEmailStateSchema, FooterSetEmailActionSchema } from "../types/footerReducerSchemas"

export const SET_EMAIL = 'SET_EMAIL'

const initialState: FooterEmailStateSchema = {
  emails: [],
}

export const footerReducer = (state: FooterEmailStateSchema = initialState, action: FooterSetEmailActionSchema): FooterEmailStateSchema => {
  switch (action.type) {
    case SET_EMAIL: {
      const newEmail = action.payload

      if (state.emails.includes(newEmail)) {
        return {
          ...state,
        }
      }
      return {
        ...state,
        emails: [...state.emails, newEmail],
      }
    }
    default:
      return state
  }
}

export const setFooterEmail = (email: string) => ({
  type: SET_EMAIL,
  payload: email,
})
