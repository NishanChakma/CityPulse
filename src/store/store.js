import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import allReducers from './slices';
import logoutMiddleware from './logoutMiddleware';

const persistConfig = {
  key: 'root',
  blacklist: [''],
  storage: AsyncStorage,
};

// const logger = logger.createLogger();
const persistReducers = persistReducer(persistConfig, allReducers);

const store = configureStore({
  reducer: persistReducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logger, logoutMiddleware),
  // concat logoutMiddleware after logger
});

const persistor = persistStore(store);

export { store, persistor };
