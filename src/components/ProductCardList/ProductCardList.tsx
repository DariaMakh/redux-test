import { Pagination, Stack, Typography } from '@mui/material';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import usePagination from '../../hooks/usePagination';
import { PER_PAGE } from '../../utils/constants';
import ProductCardPreview from '../ProductCardPreview';

type ProductCardListProps = {
	products: Product[];
};

const ProductCardList: FC<ProductCardListProps> = ({ products }) => {
	const [productsArray, setProductsArray] = useState<Product[]>(products);

	const { currentPage, getCurrentData, countPage, setPagePaginate } =
		usePagination<Product>(products, PER_PAGE);

	const onChangePage = (e: ChangeEvent<unknown>, page: number) => {
		setPagePaginate(page);
	};

	useEffect(() => {
		setProductsArray(getCurrentData);
	}, [getCurrentData]);

	return (
		<>
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
						<ProductCardPreview key={index} {...item} />
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

export default ProductCardList;
