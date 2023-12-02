import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../types';
export const sliceName = 'user';

const createInitState = (): User => ({
	id: '',
	name: '',
	about: '',
	avatar: '',
	isAdmin: false,
	email: '',
	group: '',
});

export const userSlice = createSlice({
	name: sliceName,
	initialState: createInitState(),
	reducers: {
		setUser(_, action: PayloadAction<User>) {
			return action.payload;
		},
		clearUser() {
			return createInitState();
		},
	},
});

export const userSelector = (state: RootState) => state.user;
export const { setUser, clearUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
