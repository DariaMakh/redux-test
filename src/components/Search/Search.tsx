import { Input } from '@mui/material';
import { useState } from 'react';
import { ReactComponent as Icon } from '../../assets/images/search.svg';

import s from './Search.module.css';
import { useAppDispatch } from '../../storage/hooks';
import { fetchSearchProducts } from '../../storage/reducers/products/products-slice';

const Search = () => {
	const [searchValue, setSearchValue] = useState<string>('');

	const dispatch = useAppDispatch();

	const onChangeSearch = (search: string) => {
		setSearchValue(search);
		dispatch(fetchSearchProducts(search));
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
