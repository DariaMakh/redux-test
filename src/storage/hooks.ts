import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '../api/api';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
	state: RootState;
	// getState: () => RootState;
	dispatch: AppDispatch;
	extra: Api;
}>();
