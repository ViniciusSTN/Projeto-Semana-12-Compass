import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { filterReducer } from './filterReducer'
import { cartReducer } from './cartReducer'
import { RootState } from '../types/reducerSchema'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['filters', 'shoppingCart'],
}

const rootReducer = combineReducers<RootState>({
  filters: filterReducer,
  shoppingCart: cartReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default persistedReducer
