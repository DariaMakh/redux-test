import {
	Card,
	CardMedia,
	CardContent,
	Typography,
	CardActions,
	Button,
	Stack,
	IconButton,
} from '@mui/material';
import { FC, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getMessageFromError } from '../../shared/utils/error';
import { withProtection } from '../../shared/HOCs/withProtection';
import {
	setFavoritesStatus,
	setCartStatus,
} from '../../app/store/reducers/products/products-slice';
import { selectProducts } from '../../app/store/reducers/products/selectors';
import { selectUser } from '../../app/store/reducers/user/selectors';
import { isLiked } from '../../shared/utils/products';
import { useChangeFavoriteProductMutation } from '../../api/productsApi';
import { useAppSelector, useAppDispatch } from '../../app/store/hooks';
import {
	IconFavoritesGrey,
	IconFavoritesRed,
} from '../../shared/components/Icons';
import s from './styles.module.css';

type IProductCardPreviewProps = {
	product: Product;
	key: number;
};

export const ProductCardPreview: FC<IProductCardPreviewProps> = withProtection(
	({ product }) => {
		const location = useLocation();
		const currentUser = useAppSelector(selectUser);
		const { addedToCart } = useAppSelector(selectProducts);
		const dispatch = useAppDispatch();
		const [changeFavoriteProduct] = useChangeFavoriteProductMutation();

		const liked = useMemo(() => {
			return isLiked(product.likes, (currentUser as User).id);
		}, [product, currentUser]);

		const newPrice =
			product.discount !== 0 ? product.price - product.discount : product.price;

		const isDiscount = product.discount !== 0;

		const addedToCartStatusMemo = useMemo(() => {
			if (addedToCart) {
				const find = addedToCart.filter((item) => item._id === product._id);
				return !!find;
			}
			return false;
		}, [product._id, addedToCart]);

		const [addToCart, setAddToCartStatus] = useState<boolean>(
			addedToCartStatusMemo
		);

		const onClickLike = async () => {
			try {
				const response = await changeFavoriteProduct({
					id: product._id,
					like: liked,
				}).unwrap();
				dispatch(setFavoritesStatus(response));
			} catch (error) {
				toast.error(
					getMessageFromError(error, 'Неизвестная ошибка при поиске товара')
				);
			}
		};

		const onClickToCart = () => {
			setAddToCartStatus(!addToCart);
			dispatch(setCartStatus(product));
		};

		return (
			<Card className={s.cardWidth} sx={{ boxShadow: 'none' }}>
				<Link
					to={`/catalog/${product._id}`}
					state={{ location, id: product._id }}>
					<CardMedia
						component='img'
						alt={product.name}
						height='auto'
						image={product.pictures}
					/>
				</Link>
				<div className={s.icon}>
					<IconButton onClick={onClickLike}>
						{liked && <IconFavoritesRed />}
						{!liked && <IconFavoritesGrey />}
					</IconButton>
				</div>
				<CardContent sx={{ marginTop: '16', lineHeight: '100%' }}>
					<Stack direction='row' gap='8px'>
						<Typography
							variant='h6'
							sx={{ fontWeight: '20', marginTop: '0', lineHeight: '100%' }}
							className={isDiscount ? s.red : ''}>
							{newPrice}
						</Typography>
						{isDiscount && (
							<Typography variant='subtitle2' className={s.discount}>
								{product.price}
							</Typography>
						)}
					</Stack>

					<Typography variant='subtitle1' className={s.productWidth}>
						{product.wight}
					</Typography>
					<Typography
						variant='h6'
						component='h4'
						sx={{ lineHeight: '20px', fontSize: '16px', fontWeight: '600' }}>
						{product.name}
					</Typography>
				</CardContent>

				<CardActions>
					{!addToCart && (
						<Button size='small' className={s.button} onClick={onClickToCart}>
							В корзину
						</Button>
					)}
					{addToCart && (
						<Button
							size='small'
							className={s.button_in_cart}
							onClick={onClickToCart}>
							Убрать из корзины
						</Button>
					)}
				</CardActions>
			</Card>
		);
	}
);
