// Define os tipos de estado
export type FilterStateSchema = {
  sortFilter: string | null
  typeFilter: string[] | []
}

export interface SelectSortFilterActionSchema {
  type: string
  payload: string
}

export interface SelectTypeFilterActionSchema {
  type: string
  payload: string
}
