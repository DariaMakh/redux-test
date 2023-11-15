import { Stack } from '@mui/system';
import { useMemo } from 'react';
import LocalBreadcrumbs from '../../components/Breadcrumbs';
import ProductCardList from '../../components/ProductCardList';
import Sort from '../../components/Sort';
import Spinner from '../../components/Spinner';
import PageTittle from '../../components/Title';
import s from './Catalog.module.css';
import { useAppSelector } from '../../storage/hooks';
import { selectProducts } from '../../storage/reducers/products/selectors';

const Catalog = () => {
	const { products, loading } = useAppSelector(selectProducts);

	const filterProducts = useMemo(() => {
		//todo оправить поиск

		// if (searchValue !== '') {
		// 	return products.filter((item) =>
		// 		item.name.toLowerCase().includes(searchValue.toLowerCase())
		// 	);
		// }
		return products as Product[];
	}, [products]);

	return (
		<div className={s.content}>
			<LocalBreadcrumbs />
			<PageTittle title='Каталог' />

			{products.length > 0 && (
				<Stack sx={{ marginTop: '20px' }}>
					<Sort />
				</Stack>
			)}

			{loading ? <Spinner /> : <ProductCardList products={filterProducts} />}
		</div>
	);
};

export default Catalog;
