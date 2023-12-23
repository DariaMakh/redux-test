import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TProductState = {
	product: Product | [];
};

const initialState: TProductState = {
	product: [],
};
export const sliceName = 'product';

export const productSlice = createSlice({
	name: sliceName,
	initialState,
	reducers: {
		setSingleProduct(state, action: PayloadAction<Product>) {
			state.product = action.payload;
		},
	},
});

export const { setSingleProduct } = productSlice.actions;

export const productReducer = productSlice.reducer;
