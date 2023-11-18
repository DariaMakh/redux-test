import LocalBreadcrumbs from '../../components/Breadcrumbs';
import ProductCardList from '../../components/ProductCardList';
import Spinner from '../../components/Spinner';
import PageTittle from '../../components/Title';
import s from './Catalog.module.css';
import { useAppSelector } from '../../storage/hooks';
import { selectProducts } from '../../storage/reducers/products/selectors';

const Catalog = () => {
	const { loading } = useAppSelector(selectProducts);

	return (
		<div className={s.content}>
			<LocalBreadcrumbs />
			<PageTittle title='Каталог' />

			{loading ? <Spinner /> : <ProductCardList />}
		</div>
	);
};

export default Catalog;
