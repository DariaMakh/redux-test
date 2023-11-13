import { RootState } from '../../types';
import { productsListSlice } from './products-slice';

export const selectProducts = (state: RootState) =>
	state[productsListSlice.name].data;
