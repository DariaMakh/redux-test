import { Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import ErrorContent from '../../components/ErrorContent';
import ProductCardPreview from '../../components/ProductCardPreview';
import Spinner from '../../components/Spinner';
import PageTittle from '../../components/Title';
import { useAppSelector } from '../../storage/hooks';
import { selectUser } from '../../storage/reducers/user/selectors';
import { selectProducts } from '../../storage/reducers/products/selectors';

const Favorites = () => {
	const user = useAppSelector(selectUser) as User;
	const { products } = useAppSelector(selectProducts);
	const [loadingFavorites, setLoadingFavorites] = useState<boolean>(true);

	const [favoritesProducts, setFavoritesProducts] =
		useState<Product[]>(products);

	useEffect(() => {
		const favorites = products.filter((item) =>
			item.likes.find((like) => like === user.id)
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
