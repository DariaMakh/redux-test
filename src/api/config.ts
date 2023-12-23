import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { RootState } from '../app/store/types';

export const customBaseQuery = fetchBaseQuery({
	baseUrl: 'https://api.react-learning.ru',
	prepareHeaders: (headers, { getState }) => {
		const accessToken = (getState() as RootState).auth.accessToken;

		if (accessToken) {
			headers.set('authorization', `Bearer ${accessToken}`);
		}
		return headers;
	},
});
