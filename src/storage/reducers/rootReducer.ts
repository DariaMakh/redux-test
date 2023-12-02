import { combineReducers } from 'redux';
import { userReducer, userSlice } from './user/user-slice';
import { productsReducer, productsSlice } from './products/products-slice';
import { productReducer, productSlice } from './product/product-slice';
import { authReducer } from './auth/auth-slice';
import { authApi } from '../../api/authApi';
import { productsApi } from '../../api/productsApi';

export const rootReducer = combineReducers({
	[authApi.reducerPath]: authApi.reducer,
	[productsApi.reducerPath]: productsApi.reducer,
	auth: authReducer,
	[userSlice.name]: userReducer,
	[productSlice.name]: productReducer,
	[productsSlice.name]: productsReducer,
});
