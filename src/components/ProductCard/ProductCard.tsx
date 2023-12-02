import { Grid, Typography, IconButton } from '@mui/material';
import { Stack } from '@mui/system';
import { FC, useMemo } from 'react';
import FavoritesIcon from '../FavoritesIcon';
import PageTittle from '../Title';
import s from './ProductCard.module.css';
import ProductReview from '../ProductReview';
import OutlinedBtn from '../OutlinedBtn';
import { Link } from 'react-router-dom';

type IProductCardProps = {
	product: Product;
};

const ProductCard: FC<IProductCardProps> = ({ product }) => {
	const newPrice = useMemo(() => {
		return product.discount !== 0
			? product.price - product.discount
			: product.price;
	}, [product.discount, product.price]);

	const isDiscount = useMemo(() => {
		return product.discount !== 0;
	}, [product.discount]);

	return (
		<>
			<PageTittle title={product.name} variant='h4' />

			<Grid container spacing={2} sx={{ marginTop: '20px' }}>
				<Grid item xs={12} sm={12} md={6} sx={{ maxWidth: '450px' }}>
					{product.pictures ? (
						<img src={product.pictures} alt={product.name} className={s.img} />
					) : (
						<></>
					)}
				</Grid>
				<Grid item xs={12} sm={12} md={6}>
					<Stack direction='column' sx={{ alignItems: 'flex-start' }}>
						{isDiscount && (
							<Typography variant='subtitle1' className={s.discount}>
								{product.price}
							</Typography>
						)}
						<Typography
							variant='h4'
							sx={{ fontSize: '20', marginTop: '0', lineHeight: '100%' }}
							className={isDiscount ? s.red : ''}>
							{newPrice}
						</Typography>

						<IconButton
							sx={{
								textTransform: 'initial',
								color: '#7B8E98',
								fontSize: '14px',
								marginTop: '5px',
								paddingLeft: '0',
								lineHeight: '1',
							}}>
							<FavoritesIcon iconColor='grey' /> В избранное
						</IconButton>
						<Stack direction='column' gap='8px' className={s.block}>
							<Typography variant='h6' sx={{ fontWeight: '600' }}>
								Доставка по всему Миру!
							</Typography>

							<Typography variant='body2'>
								Доставка курьером — от 399 ₽
							</Typography>

							<Typography variant='body2'>
								Доставка в пункт выдачи — от 199 ₽
							</Typography>
						</Stack>

						<Stack direction='column' gap='8px' className={s.block}>
							<Typography variant='h6' sx={{ fontWeight: '600' }}>
								Гарантия качества
							</Typography>

							<Typography variant='body2'>
								Если Вам не понравилось качество нашей продукции, мы вернем
								деньги, либо сделаем все возможное, чтобы удовлетворить ваши
								нужды.
							</Typography>
						</Stack>
					</Stack>
				</Grid>
			</Grid>

			<Stack direction='column' gap='8px' marginTop='40px'>
				<Typography variant='h5' fontWeight='600'>
					Описание
				</Typography>
				<Typography variant='body1' gutterBottom>
					{product.description}
				</Typography>
			</Stack>

			<Stack direction='column' gap='8px' marginTop='40px'>
				<Typography variant='h5' fontWeight='600'>
					Характеристики
				</Typography>

				<Stack direction='row' gap='8px'>
					<Typography variant='body1'>Вес</Typography>
					<Typography variant='body1' fontWeight='600'>
						{`${product.stock}шт ${product.wight}`}
					</Typography>
				</Stack>

				<Stack direction='row' gap='8px'>
					<Typography variant='body1'>Цена</Typography>
					<Typography variant='body1' fontWeight='600'>
						{`${newPrice}₽ за ${product.wight}`}
					</Typography>
				</Stack>
			</Stack>

			<Stack direction='column' gap='8px' margin='40px 0'>
				<Typography variant='h5' fontWeight='600'>
					Отзывы
				</Typography>

				<Link to={`/add-review/${product._id}`}>
					<OutlinedBtn
						text='Написать отзыв'
						href='#'
						btnSize='large'
						mt='20px'
					/>
				</Link>

				<Stack direction='column' gap='16px' marginTop='20px'>
					{product.reviews?.map((review, index) => (
						<ProductReview review={review} key={index} />
					))}
				</Stack>
			</Stack>
		</>
	);
};

export default ProductCard;
