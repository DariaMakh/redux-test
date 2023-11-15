import { createSlice, SerializedError } from '@reduxjs/toolkit';
import { isActionPending, isActionRejected } from '../../../types/redux';
import { createAppAsyncThunk } from '../../hooks';

type TProductState = {
	products: Product[];
	loading: boolean;
	error: SerializedError | null | unknown;
};

const initialState: TProductState = {
	products: [],
	loading: false,
	error: null,
};
export const sliceName = 'productsList';

export const fetchProductsList = createAppAsyncThunk<ProductsList, void>(
	`${sliceName}/fetchProducts`,
	async function (_, { fulfillWithValue, rejectWithValue, extra: api }) {
		try {
			const data = await api.getProductsList();
			if (data.products) {
				return fulfillWithValue(data);
			} else {
				return rejectWithValue(data);
			}
		} catch (err) {
			return rejectWithValue(err);
		}
	}
);

export const productsListSlice = createSlice({
	name: sliceName,
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProductsList.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				state.products = action.payload.products;
			})
			.addMatcher(isActionPending(`${sliceName}/`), (state) => {
				state.loading = true;
				state.error = null;
			})
			.addMatcher(isActionRejected(`${sliceName}/`), (state, action) => {
				state.loading = false;
				state.error = action.payload;
				state.products = [];
			});
		// .addMatcher(isActionFulfilled(`${sliceName}/`), (state, action) => {
		// 	state.loading = false;
		// 	state.error = null;
		// 	state.data = action.payload;
		// });
	},
});

export default productsListSlice.reducer;
