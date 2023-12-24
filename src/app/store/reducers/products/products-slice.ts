import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const sliceName = 'products';

interface ProductsState {
	products: Product[];
	addedToCart: Product[];
	searchValue: string;
}

const initialState: ProductsState = {
	products: [],
	addedToCart: [],
	searchValue: '',
};

export const productsSlice = createSlice({
	name: sliceName,
	initialState,
	reducers: {
		setProducts(state, action: PayloadAction<Product[]>) {
			state.products = action.payload;
		},
		setSearchValue(state, action: PayloadAction<string>) {
			state.searchValue = action.payload;
		},
		setFavoritesStatus(state, action: PayloadAction<Product>) {
			const product = action.payload;
			state.products.forEach((productState) => {
				if (productState._id === product._id) {
					productState.likes = product.likes;
				}
			});
		},
		setCartStatus(state, action: PayloadAction<Product>) {
			const product = action.payload;
			const productInfo = state.addedToCart?.filter(
				(item) => item._id === product._id
			);
			console.log(product);
			console.log(productInfo);
			if (productInfo?.length === 0) {
				state.addedToCart = state.addedToCart.filter(
					(productState) => productState._id !== product._id
				);
			} else {
				state.addedToCart?.push(product);
			}
			console.log(state.addedToCart);
		},
	},
});

export const {
	setProducts,
	setSearchValue,
	setFavoritesStatus,
	setCartStatus,
} = productsSlice.actions;
export const productsReducer = productsSlice.reducer;
