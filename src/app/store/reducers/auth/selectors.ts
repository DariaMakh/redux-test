import { RootState } from '../../types';
import { authSlice } from './auth-slice';

export const tokensSelector = (state: RootState) => state[authSlice.name];
export const accessTokenSelector = (state: RootState) =>
	state[authSlice.name].accessToken;

export const refreshTokenSelector = (state: RootState) =>
	state[authSlice.name].refreshToken;
