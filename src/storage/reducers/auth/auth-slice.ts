import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: Tokens = {
	accessToken: '',
	refreshToken: '',
};

export const sliceName = 'auth';

export const authSlice = createSlice({
	name: sliceName,
	initialState,
	reducers: {
		setTokens(_, action: PayloadAction<Tokens>) {
			return action.payload;
		},
		setAccessToken(state, action: PayloadAction<Pick<Tokens, 'accessToken'>>) {
			state.accessToken = action.payload.accessToken;
		},
		clearTokens() {
			return initialState;
		},
	},
});

export const { setTokens, setAccessToken, clearTokens } = authSlice.actions;
export const authReducer = authSlice.reducer;
