import { combineReducers } from 'redux';
import userReducer, { userSlice } from './user/user-slice';
import productsReducer, { productsListSlice } from './products/products-slice';
import productReducer, { productSlice } from './product/product-slice';

export const rootReducer = combineReducers({
	[userSlice.name]: userReducer,
	[productSlice.name]: productReducer,
	[productsListSlice.name]: productsReducer,
});
