import { combineReducers } from 'redux';
import userReducer, { userSlice } from './user/user-slice';
import productsReducer, { productsListSlice } from './products/products-slice';

export const rootReducer = combineReducers({
	[userSlice.name]: userReducer,
	[productsListSlice.name]: productsReducer,
});
