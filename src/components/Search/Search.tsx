import { Input } from '@mui/material';
import { ReactComponent as Icon } from '../../assets/images/search.svg';
import { useAppDispatch, useAppSelector } from '../../storage/hooks';
import { setSearchValue } from '../../storage/reducers/products/products-slice';
import s from './Search.module.css';
import { selectProducts } from '../../storage/reducers/products/selectors';

const Search = () => {
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
			<Icon className={s.searchIcon} />
		</div>
	);
};

export default Search;
