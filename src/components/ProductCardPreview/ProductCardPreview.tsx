import {
	Card,
	CardMedia,
	CardContent,
	Typography,
	CardActions,
	Button,
} from '@mui/material';
import { FC, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import FavoritesIcon from '../FavoritesIcon';
import s from './ProductCardPreview.module.css';

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
}: IProductCardPreviewProps) => {
	const newPrice = useMemo(() => {
		return discount !== 0 ? price - discount : price;
	}, [discount, price]);

	const isDiscount = useMemo(() => {
		return discount !== 0;
	}, [discount]);
	const location = useLocation();

	return (
		<Card className={s.cardWidth} sx={{ boxShadow: 'none' }}>
			<Link to={`/catalog/${_id}`} state={{ location, id: _id }}>
				<CardMedia component='img' alt={name} height='auto' image={pictures} />
				<div className={s.icon}>
					<FavoritesIcon iconColor='grey' />
				</div>
			</Link>
			<CardContent sx={{ marginTop: '16', lineHeight: '100%' }}>
				{discount !== 0 && (
					<Typography variant='subtitle2' className={s.discount}>
						{price}
					</Typography>
				)}
				<Typography
					variant='h6'
					sx={{ fontWeight: '20', marginTop: '0', lineHeight: '100%' }}
					className={isDiscount ? s.red : ''}>
					{newPrice}
				</Typography>
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
