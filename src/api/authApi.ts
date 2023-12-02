import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from './config';
import {
	BE_SignInResponse,
	BE_SingUpResponse,
	SignInResponse,
} from '../types/auth';

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: customBaseQuery,
	endpoints: (builder) => ({
		signUp: builder.mutation<BE_SingUpResponse, SignUpFormValues>({
			query: (data) => ({
				url: 'signup',
				method: 'POST',
				body: data,
			}),
		}),
		signIn: builder.mutation<SignInResponse, SignInFormValues>({
			query: (data) => ({
				url: 'signin',
				method: 'POST',
				body: data,
			}),
			transformResponse: (response: BE_SignInResponse) => {
				const {
					data: { _id, ...restData },
					...restResponse
				} = response;

				return {
					data: {
						id: _id,
						...restData,
					},
					...restResponse,
				};
			},
		}),
	}),
});

export const { useSignUpMutation, useSignInMutation } = authApi;
