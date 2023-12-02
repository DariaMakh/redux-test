import { Input } from '@mui/material';
import { useState } from 'react';
import { ReactComponent as Icon } from '../../assets/images/search.svg';
import { useAppDispatch } from '../../storage/hooks';
import { setProducts } from '../../storage/reducers/products/products-slice';
import { useGetSearchProductsMutation } from '../../api/productsApi';
import { toast } from 'react-toastify';
import { getMessageFromError } from '../../utils/error';
import s from './Search.module.css';

const Search = () => {
	const [searchValue, setSearchValue] = useState<string>('');
	const [searchProducts] = useGetSearchProductsMutation();
	const dispatch = useAppDispatch();

	const onChangeSearch = async (search: string) => {
		setSearchValue(search);
		try {
			const response = await searchProducts({ search });
			dispatch(setProducts(response));
		} catch (error) {
			toast.error(
				getMessageFromError(error, 'Неизвестная ошибка при поиске товара')
			);
		}
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
