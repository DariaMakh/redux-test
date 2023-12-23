import { Input } from '@mui/material';
import { IconSearch } from '../Icons';
import { setSearchValue } from '../../../app/store/reducers/products/products-slice';
import { useAppSelector, useAppDispatch } from '../../../app/store/hooks';
import { selectProducts } from '../../../app/store/reducers/products/selectors';
import s from './Search.module.css';

export const Search = () => {
	const { searchValue } = useAppSelector(selectProducts);
	const dispatch = useAppDispatch();

	const onChangeSearch = (search: string) => {
		dispatch(setSearchValue(search));
	};

	return (
		<div className={s.search}>
			<Input
				className={s.input}
				placeholder='Поиск'
				disableUnderline={true}
				fullWidth={true}
				name='searchInput'
				value={searchValue}
				onChange={(e) => e && onChangeSearch(e.target.value)}
			/>
			<div className={s.searchIcon}>
				<IconSearch />
			</div>
		</div>
	);
};
