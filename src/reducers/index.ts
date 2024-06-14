import { combineReducers } from 'redux'
import { filterReducer } from './filterReducer'
import { cartReducer } from './cartReducer'

const rootReducer = combineReducers({
  filters: filterReducer,
  shoppingCart: cartReducer,
})

export default rootReducer
