import Header from '../Header';
import Footer from '../Footer';
import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import api from '../../api/api';
import { ProductsContext } from '../../context/product-context';
import Router from '../../router';
import { useAppDispatch, useAppSelector } from '../../storage/hooks';
import { fetchProductsList } from '../../storage/reducers/products/products-slice';
import { fetchUser } from '../../storage/reducers/user/user-slice';
import { selectProducts } from '../../storage/reducers/products/selectors';

const App = () => {
	const [searchValue, setSearchValue] = useState<string>('');
	// const [userInfo, setUserInfo] = useState<User>({} as User);
	const [allProductsArray, setAllProductsArray] = useState<Product[]>([]);
	const [productsArray, setProductsArray] = useState<Product[]>([]);
	const [loadingProducts, setLoadingProductsStatus] = useState<boolean>(true);

	const dispatch = useAppDispatch();
	const productsList = useAppSelector(selectProducts);

	//todo поправить типизацию

	useEffect(() => {
		dispatch(fetchUser());
		dispatch(fetchProductsList);
	}, [dispatch]);

	const onClickAddToCart = (id: string) => {
		console.log(id);
	};

	useEffect(() => {
		// api.getProductsList().then((productsData) => {
		if (productsList) {
			setAllProductsArray(productsList.products);
		}
		// setUserInfo(userInfoData);
		// });
	}, [productsList]);

	useEffect(() => {
		const filterProducts = allProductsArray.filter(
			(item) => item.author._id === '622bd81b06c7d323b8ae4614'
		);
		if (filterProducts.length > 0) {
			setProductsArray(filterProducts);
			setLoadingProductsStatus(false);
		}
	}, [allProductsArray]);

	return (
		<>
			<ProductsContext.Provider
				value={{
					products: productsArray,
					loadingProducts,
					onAddToCart: onClickAddToCart,
					searchValue,
				}}>
				<Header searchValue={searchValue} setSearchValue={setSearchValue} />
				<Container maxWidth='lg' style={{ padding: 0, flexGrow: 1 }}>
					<Router />
				</Container>
				<Footer />
			</ProductsContext.Provider>
		</>
	);
};

export default App;
