import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
export const { setUser, clearUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
