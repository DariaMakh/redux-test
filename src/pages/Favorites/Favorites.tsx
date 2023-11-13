import { Stack, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import ErrorContent from '../../components/ErrorContent';
import ProductCardPreview from '../../components/ProductCardPreview';
import Spinner from '../../components/Spinner';
import PageTittle from '../../components/Title';
import {
	ProductsContext,
	ProductsContextType,
} from '../../context/product-context';
import { UserContext, UserContextType } from '../../context/user-context';

const Favorites = () => {
	const { user } = useContext(UserContext) as UserContextType;
	const { products } = useContext(ProductsContext) as ProductsContextType;
	const [loadingFavorites, setLoadingFavorites] = useState<boolean>(true);

	const [favoritesProducts, setFavoritesProducts] =
		useState<Product[]>(products);

	useEffect(() => {
		const favorites = products.filter((item) =>
			item.likes.find((like) => like === user._id)
		);
		setFavoritesProducts(favorites);
		setLoadingFavorites(false);
	}, [products, user]);

	if (loadingFavorites) {
		return <Spinner />;
	}

	return (
		<>
			<PageTittle title='Избранное' />
			{favoritesProducts.length === 0 ? (
				<ErrorContent
					title='В Избранном пока ничего нет'
					subtitle='Добавляйте товары в Избранное с помощью ❤️️'
				/>
			) : (
				<Stack
					direction='row'
					spacing={1}
					alignItems='flex-start'
					flexWrap='wrap'
					marginTop='40px'
					marginBottom='40px'
					gap='40px 16px'>
					{favoritesProducts.length > 0 &&
						favoritesProducts.map((item, index) => (
							<ProductCardPreview key={index} {...item} />
						))}

					{favoritesProducts.length === 0 && (
						<Typography variant='h6' component='h3'>
							Товары не найдены :(
						</Typography>
					)}
				</Stack>
			)}
		</>
	);
};

export default Favorites;
