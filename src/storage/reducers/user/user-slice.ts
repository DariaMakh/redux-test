import { createSlice, SerializedError } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from '../../hooks';
import { UserEditBodyDto } from '../../../api/api';
import {
	isActionFulfilled,
	isActionPending,
	isActionRejected,
} from '../../../types/redux';

type TUserState = {
	data: User | null;
	loading: boolean;
	error: SerializedError | null | unknown;
};

const initialState: TUserState = {
	data: null,
	loading: false,
	error: null,
};
export const sliceName = 'user';

export const fetchEditedUser = createAppAsyncThunk<User, UserEditBodyDto>(
	`${sliceName}/editedUser`,
	async function (dataUser, { fulfillWithValue, rejectWithValue, extra: api }) {
		try {
			const data = await api.setUserInfo(dataUser);
			if (data.name) {
				return fulfillWithValue(data);
			} else {
				return rejectWithValue(data);
			}
		} catch (err) {
			return rejectWithValue(err);
		}
	}
);
export const fetchUser = createAppAsyncThunk<User, void>(
	`${sliceName}/fetchUser`,
	async function (_, { fulfillWithValue, rejectWithValue, extra: api }) {
		try {
			const data = await api.getUserInfo();
			return fulfillWithValue(data);
		} catch (err) {
			return rejectWithValue(err);
		}
	}
);

export const userSlice = createSlice({
	name: sliceName,
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUser.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				state.data = action.payload;
			})
			.addCase(fetchEditedUser.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				state.data = action.payload;
			})
			.addMatcher(isActionPending(`${sliceName}/`), (state) => {
				state.loading = true;
				state.error = null;
			})
			.addMatcher(isActionRejected(`${sliceName}/`), (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addMatcher(isActionFulfilled(`${sliceName}/`), (state, action) => {
				state.loading = false;
				state.error = null;
				state.data = action.payload;
			});
	},
});

export default userSlice.reducer;
