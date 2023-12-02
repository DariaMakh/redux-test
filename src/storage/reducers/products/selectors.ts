import { RootState } from '../../types';
import { productsSlice } from './products-slice';

export const selectProducts = (state: RootState) => state[productsSlice.name];
