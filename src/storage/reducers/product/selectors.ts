import { RootState } from '../../types';
import { productSlice } from './product-slice';

export const selectProduct = (state: RootState) => state[productSlice.name];
