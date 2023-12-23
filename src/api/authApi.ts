import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from './config';
import {
	BE_SingUpResponse,
	SignInResponse,
	BE_SignInResponse,
	UserResponse,
	BE_UserResponse,
} from '../shared/types/auth';

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
		changeUserInfo: builder.mutation<UserResponse, UserEditBodyDto>({
			query: (data) => ({
				url: 'users/me/',
				method: 'PATCH',
				body: data,
			}),
			transformResponse: (response: BE_UserResponse) => {
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

export const {
	useSignUpMutation,
	useSignInMutation,
	useChangeUserInfoMutation,
} = authApi;
