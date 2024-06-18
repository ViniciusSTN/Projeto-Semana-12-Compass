import { FilterReducerFunctionSchema, FilterStateSchema} from "../types/filterReducerSchemas"

export const SELECT_SORT_FILTER = 'SELECT_SORT_FILTER'
export const SELECT_TYPE_FILTER = 'SELECT_TYPE_FILTER'
export const SET_RESULTS = 'SET_RESULTS'
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
export const SET_AMOUNT_SHOWING = 'SET_AMOUNT_SHOWING'

const initialState: FilterStateSchema = {
  sortFilter: 'default',
  typeFilter: [],
  results: 0,
  currentPage: 0,
  amountShowing: 0,
}

export const filterReducer: FilterReducerFunctionSchema = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_SORT_FILTER:
      return {
        ...state,
        sortFilter: action.payload,
      }
    case SELECT_TYPE_FILTER:
      return {
        ...state,
        typeFilter: action.payload,
      }
    case SET_RESULTS:
      return {
        ...state,
        results: action.payload,
      }
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      }
    case SET_AMOUNT_SHOWING:
      return {
        ...state,
        amountShowing: action.payload,
      }
    default:
      return state
  }
}

export const selectSortFilter = (filter: string) => ({
  type: SELECT_SORT_FILTER,
  payload: filter,
})

export const selectTypeFilter = (filters: string[]) => ({
  type: SELECT_TYPE_FILTER,
  payload: filters,
})

export const setResults = (results: number) => ({
  type: SET_RESULTS,
  payload: results,
})

export const setPage = (page: number) => ({
  type: SET_CURRENT_PAGE,
  payload: page,
})

export const setAmountShowing = (amount: number) => ({
  type: SET_AMOUNT_SHOWING,
  payload: amount,
})
