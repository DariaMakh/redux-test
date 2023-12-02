import LocalBreadcrumbs from '../../components/Breadcrumbs';
import ProductCardList from '../../components/ProductCardList';
import PageTittle from '../../components/Title';
import s from './Catalog.module.css';
import { useAppSelector } from '../../storage/hooks';
import { selectProducts } from '../../storage/reducers/products/selectors';
import { useGetSearchProductsQuery } from '../../api/productsApi';
import { FC } from 'react';
import { withProtection } from '../../HOCs/withProtection';
import { withQuery } from '../../HOCs/withQuery';
import { getMessageFromError } from '../../utils/error';

const Catalog: FC = withProtection(() => {
	const { searchValue } = useAppSelector(selectProducts);

	const {
		data: products = [],
		isError,
		isLoading,
		error,
		refetch,
	} = useGetSearchProductsQuery(searchValue ? searchValue : '');

	return (
		<div className={s.content}>
			<LocalBreadcrumbs />
			<PageTittle title='Каталог' />
			{withQuery(ProductCardList)({
				isError,
				isLoading,
				error: getMessageFromError(error, 'Неизвестная ошибка'),
				refetch,
				products: products,
			})}
		</div>
	);
});

export default Catalog;
