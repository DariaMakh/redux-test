import { configureStore } from '@reduxjs/toolkit';

import {
	FLUSH,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	REHYDRATE,
	persistStore,
	persistReducer,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { rootReducer } from './reducers/rootReducer';
import { authApi } from '../../api/authApi';
import { productsApi } from '../../api/productsApi';

const persistConfig = {
	key: 'root',
	storage,
	version: 1,
	blacklist: [authApi.reducerPath, productsApi.reducerPath],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	devTools: process.env.NODE_ENV !== 'production',
	middleware: (
		getDefaultMiddleware // зпуск экшена до их выполнения
	) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat([authApi.middleware, productsApi.middleware]),
});

export const persistor = persistStore(store);
