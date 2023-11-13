import { Stack } from '@mui/system';
import { useContext, useMemo } from 'react';
import LocalBreadcrumbs from '../../components/Breadcrumbs';
import ProductCardList from '../../components/ProductCardList';
import Sort from '../../components/Sort';
import Spinner from '../../components/Spinner';
import PageTittle from '../../components/Title';
import {
	ProductsContext,
	ProductsContextType,
} from '../../context/product-context';
import s from './Catalog.module.css';

const Catalog = () => {
	const { products, loadingProducts, searchValue } = useContext(
		ProductsContext
	) as ProductsContextType;

	const filterProducts = useMemo(() => {
		if (searchValue !== '') {
			return products.filter((item) =>
				item.name.toLowerCase().includes(searchValue.toLowerCase())
			);
		}
		return products;
	}, [searchValue, products]);

	return (
		<div className={s.content}>
			<LocalBreadcrumbs />
			<PageTittle title='Каталог' />

			{products.length > 0 && (
				<Stack sx={{ marginTop: '20px' }}>
					<Sort />
				</Stack>
			)}

			{loadingProducts ? (
				<Spinner />
			) : (
				<ProductCardList products={filterProducts} />
			)}
		</div>
	);
};

export default Catalog;
