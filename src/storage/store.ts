import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducers/rootReducer';
import { Api } from '../api/api';

const store = configureStore({
	reducer: rootReducer,
	devTools: process.env.NODE_ENV !== 'production',
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			thunk: {
				extraArgument: Api,
			},
		}),
});

export default store;
