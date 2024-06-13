import { FilterStateSchema, SelectSortFilterActionSchema, SelectTypeFilterActionSchema } from "../types/filterReducerSchemas"

export const SELECT_SORT_FILTER = 'SELECT_SORT_FILTER'
export const SELECT_TYPE_FILTER = 'SELECT_TYPE_FILTER'

const initialState: FilterStateSchema = {
  sortFilter: null,
  typeFilter: [],
}

export const filterReducer = (state = initialState, action: SelectSortFilterActionSchema | SelectTypeFilterActionSchema): FilterStateSchema => {
  switch (action.type) {
    case SELECT_SORT_FILTER:
      return {
        ...state,
        sortFilter: action.payload,
      }
    case SELECT_TYPE_FILTER:
      return {
        ...state,
        typeFilter: [...state.typeFilter, action.payload], 
      }
    default:
      return state
  }
}

export const selectSortFilter = (filter: string) => ({
  type: SELECT_SORT_FILTER,
  payload: filter,
})

export const selectTypeFilter = (filter: string) => ({
  type: SELECT_TYPE_FILTER,
  payload: filter,
})