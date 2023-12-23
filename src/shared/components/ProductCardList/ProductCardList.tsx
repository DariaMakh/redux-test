import { Pagination, Stack, Typography } from '@mui/material';
import { ChangeEvent, FC, useEffect, useMemo } from 'react';
import usePagination from '../../hooks/usePagination';
import { PER_PAGE } from '../../utils/constants';
import { setProducts } from '../../../app/store/reducers/products/products-slice';
import { useAppDispatch } from '../../../app/store/hooks';
import { ProductCardPreview } from '../../../entities/ProductCardPreview';
import { Sort } from '../Sort';

interface IProps {
	products: Product[];
}

export const ProductCardList: FC<IProps> = ({ products }) => {
	const { currentPage, getCurrentData, countPage, setPagePaginate } =
		usePagination<Product>(products, PER_PAGE);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(setProducts(products));
	}, [dispatch, products]);

	const onChangePage = (e: ChangeEvent<unknown>, page: number) => {
		setPagePaginate(page);
	};

	const productsArray = useMemo(() => {
		return getCurrentData();
	}, [getCurrentData]);

	return (
		<>
			{products.length > 0 && (
				<Stack sx={{ marginTop: '20px' }}>
					<Sort />
				</Stack>
			)}

			<Stack
				direction='row'
				spacing={1}
				alignItems='flex-start'
				flexWrap='wrap'
				marginTop='40px'
				marginBottom='40px'
				gap='40px 16px'>
				{productsArray.length > 0 &&
					productsArray.map((item, index) => (
						<ProductCardPreview key={index} product={item} />
					))}

				{products.length === 0 && (
					<Typography variant='h6' component='h3'>
						Товары не найдены :(
					</Typography>
				)}
			</Stack>
			{productsArray.length > 0 && (
				<Stack spacing={2}>
					<Typography>Страница {currentPage}</Typography>
					<Pagination
						count={countPage}
						page={currentPage}
						onChange={onChangePage}
					/>
				</Stack>
			)}
		</>
	);
};
