import { createStore, applyMiddleware } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(thunk, logger));
const persistor = persistStore(store);
export { store, persistor };
