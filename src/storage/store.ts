import { configureStore } from '@reduxjs/toolkit';
import api from '../api/api';

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
import { authApi } from '../api/authApi';
import storage from 'redux-persist/lib/storage';
import { rootReducer } from './reducers/rootReducer';
import { productsApi } from '../api/productsApi';

const persistConfig = {
	key: 'root',
	storage,
	version: 1,
	blacklist: [authApi.reducerPath],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	devTools: process.env.NODE_ENV !== 'production',
	middleware: (
		getDefaultMiddleware // зпуск экшена до их выполнения
	) =>
		getDefaultMiddleware({
			thunk: {
				extraArgument: api,
			},
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat([authApi.middleware, productsApi.middleware]),
});

export const persistor = persistStore(store);
