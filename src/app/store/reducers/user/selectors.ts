import { RootState } from '../../types';
import { userSlice } from './user-slice';

export const selectUser = (state: RootState) => state[userSlice.name];
