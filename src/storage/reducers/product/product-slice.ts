import { createSlice, SerializedError } from '@reduxjs/toolkit';
import { isActionPending, isActionRejected } from '../../../types/redux';
import { createAppAsyncThunk } from '../../hooks';

type TProductState = {
	loading: boolean;
	product: Product | null;
	error: SerializedError | null | unknown;
};

const initialState: TProductState = {
	loading: false,
	product: null,
	error: null,
};
export const sliceName = 'product';

export const fetchProduct = createAppAsyncThunk<Product, string>(
	`${sliceName}/fetchProduct`,
	async function (id, { fulfillWithValue, rejectWithValue, extra: api }) {
		try {
			const data = await api.getProductById(id);
			return fulfillWithValue(data);
		} catch (err) {
			return rejectWithValue(err);
		}
	}
);
export const fetchCreateReview = createAppAsyncThunk<
	Product,
	{ productId: string; data: any }
>(
	`${sliceName}/fetchCreateReview`,
	async function (
		{ productId, data: body },
		{ fulfillWithValue, rejectWithValue, extra: api }
	) {
		try {
			const data = await api.postReviewById(productId, body);
			return fulfillWithValue(data);
		} catch (err) {
			return rejectWithValue(err);
		}
	}
);

export const productSlice = createSlice({
	name: sliceName,
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProduct.fulfilled, (state, action) => {
				state.product = action.payload;
				state.loading = false;
			})
			.addCase(fetchCreateReview.fulfilled, (state, action) => {
				state.product = action.payload;
				state.loading = false;
			})
			.addMatcher(isActionPending(`${sliceName}/`), (state) => {
				state.loading = true;
				state.error = null;
			})
			.addMatcher(isActionRejected(`${sliceName}/`), (state, action) => {
				state.loading = false;
				state.error = action.payload;
				state.product = null;
			});
	},
});

export default productSlice.reducer;
