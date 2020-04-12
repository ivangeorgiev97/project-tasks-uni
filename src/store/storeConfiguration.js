
import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import storage from 'redux-persist/lib/storage'
import rootReducer from './rootReducer'
// import initialState from './initialState'

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2
  // whitelist: ['users', 'tasks']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer)
export const persistorStore = persistStore(store)
