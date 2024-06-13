import { combineReducers } from 'redux'
import { filterReducer } from './filterReducer'

// Combina todos os reducers em um único rootReducer
const rootReducer = combineReducers({
  filters: filterReducer,
  // Outros reducers...
})

export default rootReducer
