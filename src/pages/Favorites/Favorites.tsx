import { IconButton, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/store/hooks';
import { selectProducts } from '../../app/store/reducers/products/selectors';
import { selectUser } from '../../app/store/reducers/user/selectors';
import { ProductCardPreview } from '../../entities/ProductCardPreview';
import { withProtection } from '../../shared/HOCs/withProtection';
import { Spinner } from '../../shared/components/Spinner';
import { PageTittle } from '../../shared/components/Title';
import { ErrorPage } from '../Error';

export const Favorites = withProtection(() => {
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
			<Link to='/catalog'>
				<IconButton
					sx={{
						textTransform: 'initial',
						color: '#7B8E98',
						fontSize: '14px',
						marginTop: '16px',
					}}>
					<ArrowBackIosIcon sx={{ fontSize: '14px' }} /> Каталог
				</IconButton>
			</Link>
			<PageTittle title='Избранное' />
			{favoritesProducts.length === 0 ? (
				<ErrorPage
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
							<ProductCardPreview key={index} product={item} />
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
});
