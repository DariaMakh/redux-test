import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: Product | object = {
	product: {},
};
export const sliceName = 'product';

export const productSlice = createSlice({
	name: sliceName,
	initialState,
	reducers: {
		setSingleProduct(_, action: PayloadAction<Product>) {
			return action.payload;
		},
	},
});

export const { setSingleProduct } = productSlice.actions;

export const productReducer = productSlice.reducer;
