import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//
// type TProductState = {
// 	loading: boolean;
// 	products: Product[];
// 	favoriteProducts: Product[];
// 	error: SerializedError | null | unknown;
// };
//
// const initialState: TProductState = {
// 	loading: false,
// 	products: [],
// 	favoriteProducts: [],
// 	error: null,
// };
//
// export const fetchSearchProducts = createAppAsyncThunk<Product[], string>(
// 	`${sliceName}/fetchSearchPosts`,
// 	async function (
// 		searchQuery,
// 		{ fulfillWithValue, rejectWithValue, extra: api }
// 	) {
// 		try {
// 			const data = await api.search(searchQuery);
// 			return fulfillWithValue(data);
// 		} catch (err) {
// 			return rejectWithValue(err);
// 		}
// 	}
// );
//
// export const fetchChangeFavoriteProduct = createAppAsyncThunk<
// 	{ product: Product; liked: boolean },
// 	ProductLikeParam
// >(
// 	`${sliceName}/fetchChangeFavoriteProduct`,
// 	async function (
// 		product,
// 		{ fulfillWithValue, rejectWithValue, getState, extra: api }
// 	) {
// 		try {
// 			const { user } = await getState();
// 			const liked = user ? isLiked(product.likes, user.id) : false;
// 			const data = await api.changeFavoriteProductStatus(product._id, liked);
// 			return fulfillWithValue({ product: data, liked });
// 		} catch (err) {
// 			return rejectWithValue(err);
// 		}
// 	}
// );
//
// export const fetchDeleteProduct = createAppAsyncThunk<Product, string>(
// 	`${sliceName}/fetchDeleteProduct`,
// 	async function (id, { fulfillWithValue, rejectWithValue, extra: api }) {
// 		try {
// 			const data = await api.deleteProductById(id);
// 			return fulfillWithValue(data);
// 		} catch (err) {
// 			return rejectWithValue(err);
// 		}
// 	}
// );
//
// export const fetchProductsList = createAppAsyncThunk<ProductsList, void>(
// 	`${sliceName}/fetchProducts`,
// 	async function (_, { fulfillWithValue, rejectWithValue, extra: api }) {
// 		try {
// 			const data = await api.getProductsList();
// 			if (data.products) {
// 				return fulfillWithValue(data);
// 			} else {
// 				return rejectWithValue(data);
// 			}
// 		} catch (err) {
// 			return rejectWithValue(err);
// 		}
// 	}
// );
//
// export const productsListSlice = createSlice({
// 	name: sliceName,
// 	initialState,
// 	reducers: {},
// 	extraReducers: (builder) => {
// 		builder
// 			.addCase(fetchProductsList.fulfilled, (state, action) => {
// 				state.loading = false;
// 				state.error = null;
// 				state.products = action.payload.products;
// 			})
// 			.addCase(fetchSearchProducts.fulfilled, (state, action) => {
// 				state.loading = false;
// 				state.error = null;
// 				state.products = action.payload;
// 			})
// 			.addCase(fetchChangeFavoriteProduct.fulfilled, (state, action) => {
// 				const { product, liked } = action.payload;
// 				state.products = state.products.map((productState) => {
// 					return productState._id === product._id ? product : productState;
// 				});
// 				if (!liked) {
// 					state.favoriteProducts.push(product);
// 				} else {
// 					state.favoriteProducts = state.favoriteProducts.filter(
// 						(productState) => productState._id !== product._id
// 					);
// 				}
// 				state.loading = false;
// 			})
// 			.addCase(fetchDeleteProduct.fulfilled, (state, action) => {
// 				state.products = state.products.filter((productState) => {
// 					return productState._id !== action.payload._id;
// 				});
// 				state.loading = false;
// 			})
// 			.addMatcher(isActionPending(`${sliceName}/`), (state) => {
// 				state.loading = true;
// 				state.error = null;
// 			})
// 			.addMatcher(isActionRejected(`${sliceName}/`), (state, action) => {
// 				state.loading = false;
// 				state.error = action.payload;
// 				state.products = [];
// 			});
// 	},
// });

// export const productsReducer = productsListSlice.reducer;

interface ProductsState {
	products: Product[];
	searchValue: string;
}

const initialState: ProductsState = {
	products: [],
	searchValue: '',
};

export const sliceName = 'products';

export const productsSlice = createSlice({
	name: sliceName,
	initialState,
	reducers: {
		setProducts(state, action: PayloadAction<ProductsList>) {
			state.products = action.payload.products;
		},
		setSearchValue(state, action: PayloadAction<string>) {
			state.searchValue = action.payload;
		},
	},
});

export const { setProducts, setSearchValue } = productsSlice.actions;
export const productsReducer = productsSlice.reducer;
