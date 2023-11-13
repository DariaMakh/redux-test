import { Pagination, Stack, Typography } from '@mui/material';
import { ChangeEvent, FC } from 'react';
import usePagination from '../../hooks/usePagination';
import { PER_PAGE } from '../../utils/constants';

type IPaginationLocalProps = {
	items: Product[];
};

const PaginationLocal: FC<IPaginationLocalProps> = ({ items }) => {
	const onChangePage = (e: ChangeEvent<unknown>, page: number) => {
		setPagePaginate(page);
	};

	const { currentPage, countPage, setPagePaginate } = usePagination<Product>(
		items,
		PER_PAGE
	);

	return (
		<Stack spacing={2}>
			<Typography>Страница {currentPage}</Typography>
			<Pagination
				count={countPage}
				page={currentPage}
				onChange={onChangePage}
			/>
		</Stack>
	);
};

export default PaginationLocal;
