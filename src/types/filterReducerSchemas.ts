import { SELECT_SORT_FILTER, SELECT_TYPE_FILTER, SET_AMOUNT_SHOWING, SET_CURRENT_PAGE, SET_RESULTS } from "../reducers/filterReducer"

export type FilterStateSchema = {
  sortFilter: string | null
  typeFilter: string[]
  results: number
  currentPage: number
  amountShowing: number
}

export type FilterReducerActionPropsSchema = 
  | SelectSortFilterActionSchema 
  | SelectTypeFilterActionSchema 
  | SetResultsActionSchema 
  | SetCurrentPageActionSchema 
  | SetAmountShowingActionSchema

export interface SelectSortFilterActionSchema {
  type: typeof SELECT_SORT_FILTER
  payload: string
}

export interface SelectTypeFilterActionSchema {
  type: typeof SELECT_TYPE_FILTER
  payload: string[]
}

export interface SetResultsActionSchema {
  type: typeof SET_RESULTS
  payload: number
}

export interface SetCurrentPageActionSchema {
  type: typeof SET_CURRENT_PAGE
  payload: number
}

export interface SetAmountShowingActionSchema {
  type: typeof SET_AMOUNT_SHOWING
  payload: number
}
