import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { filterReducer } from './filterReducer'
import { cartReducer } from './cartReducer'
import { footerReducer } from './footerReducer'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['filters', 'shoppingCart', 'footerEmail'],
}

const rootReducer = combineReducers({
  filters: filterReducer,
  shoppingCart: cartReducer,
  footerEmail: footerReducer, 
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default persistedReducer
