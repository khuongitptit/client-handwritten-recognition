import { createStore, applyMiddleware } from 'redux'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import rootReducer from '../reducers/rootReducer'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
const persistConfig = {
    key: 'root',
    storage,
}

const sagaMiddleware = createSagaMiddleware()
const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(
    persistedReducer,
    applyMiddleware(sagaMiddleware, logger)
)
const persistor = persistStore(store)
export { store, persistor, sagaMiddleware }
