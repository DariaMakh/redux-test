import { useGetSearchProductsQuery } from '../../api/productsApi';
import { FC } from 'react';
import { useAppSelector } from '../../app/store/hooks';
import { selectProducts } from '../../app/store/reducers/products/selectors';
import { withProtection } from '../../shared/HOCs/withProtection';
import { withQuery } from '../../shared/HOCs/withQuery';
import { LocalBreadcrumbs } from '../../shared/components/Breadcrumbs';
import { ProductCardList } from '../../shared/components/ProductCardList';
import { PageTittle } from '../../shared/components/Title';
import { getMessageFromError } from '../../shared/utils/error';
import s from './Catalog.module.css';

export const CatalogPage: FC = withProtection(() => {
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
