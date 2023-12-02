import LocalBreadcrumbs from '../../components/Breadcrumbs';
import ProductCardList from '../../components/ProductCardList';
import Spinner from '../../components/Spinner';
import PageTittle from '../../components/Title';
import s from './Catalog.module.css';
import { useAppSelector } from '../../storage/hooks';
import { selectProducts } from '../../storage/reducers/products/selectors';
import { useGetProductsQuery } from '../../api/productsApi';
import { FC } from 'react';
import { withProtection } from '../../HOCs/withProtection';

const Catalog: FC = withProtection(() => {
	const { products } = useAppSelector(selectProducts);
	const { isLoading } = useGetProductsQuery();

	return (
		<div className={s.content}>
			<LocalBreadcrumbs />
			<PageTittle title='Каталог' />
			{isLoading && <Spinner />}
			{!isLoading && products && <ProductCardList products={products} />}
		</div>
	);
});

export default Catalog;
