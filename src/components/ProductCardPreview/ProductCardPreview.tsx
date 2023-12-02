import {
	Card,
	CardMedia,
	CardContent,
	Typography,
	CardActions,
	Button,
	Stack,
} from '@mui/material';
import { FC, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import FavoritesIcon from '../FavoritesIcon';
import s from './ProductCardPreview.module.css';
import { isLiked } from '../../utils/products';
import { selectUser } from '../../storage/reducers/user/selectors';
import { useAppDispatch, useAppSelector } from '../../storage/hooks';

type IProductCardPreviewProps = {
	key: number;
} & Product;

const ProductCardPreview: FC<IProductCardPreviewProps> = ({
	_id,
	name,
	price,
	discount,
	wight,
	pictures,
	likes,
}: IProductCardPreviewProps) => {
	const currentUser = useAppSelector(selectUser);
	const dispatch = useAppDispatch();

	// const like = useMemo(() => {
	// 	return isLiked(likes, (currentUser as User).id);
	// }, [likes, currentUser]);

	const newPrice = useMemo(() => {
		return discount !== 0 ? price - discount : price;
	}, [discount, price]);

	const isDiscount = useMemo(() => {
		return discount !== 0;
	}, [discount]);
	const location = useLocation();

	// const onClickLike = () => {
	// 	dispatch(fetchChangeFavoriteProduct({ likes, _id }));
	// };

	return (
		<Card className={s.cardWidth} sx={{ boxShadow: 'none' }}>
			<Link to={`/catalog/${_id}`} state={{ location, id: _id }}>
				<CardMedia component='img' alt={name} height='auto' image={pictures} />
			</Link>
			<div className={s.icon}>
				{/*<FavoritesIcon*/}
				{/*	iconColor={like ? 'red' : 'grey'}*/}
				{/*	onClick={onClickLike}*/}
				{/*/>*/}
			</div>
			<CardContent sx={{ marginTop: '16', lineHeight: '100%' }}>
				<Stack direction='row' gap='8px'>
					<Typography
						variant='h6'
						sx={{ fontWeight: '20', marginTop: '0', lineHeight: '100%' }}
						className={isDiscount ? s.red : ''}>
						{newPrice}
					</Typography>
					{discount !== 0 && (
						<Typography variant='subtitle2' className={s.discount}>
							{price}
						</Typography>
					)}
				</Stack>

				<Typography variant='subtitle1' className={s.productWidth}>
					{wight}
				</Typography>
				<Typography
					variant='h6'
					component='h4'
					sx={{ lineHeight: '20px', fontSize: '16px', fontWeight: '600' }}>
					{name}
				</Typography>
			</CardContent>

			<CardActions>
				<Button size='small' className={s.button}>
					В корзину
				</Button>
			</CardActions>
		</Card>
	);
};

export default ProductCardPreview;
