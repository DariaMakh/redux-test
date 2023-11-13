import { Input } from '@mui/material';
import { FC } from 'react';
import { ReactComponent as Icon } from '../../assets/images/search.svg';

import s from './Search.module.css';

type SearchProps = {
	searchValue: string;
	setSearchValue: (value: string) => void;
};

const Search: FC<SearchProps> = ({ searchValue, setSearchValue }) => {
	return (
		<div className={s.search}>
			<Input
				className={s.input}
				placeholder='Поиск'
				disableUnderline={true}
				fullWidth={true}
				name='searchInput'
				value={searchValue}
				onChange={(e) => e && setSearchValue(e.target.value)}
			/>
			<Icon className={s.searchIcon} />
		</div>
	);
};

export default Search;
