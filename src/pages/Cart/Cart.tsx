import { Stack } from '@mui/material';
import { FC } from 'react';
import { useAppSelector } from '../../app/store/hooks';
import { selectProducts } from '../../app/store/reducers/products/selectors';
import { ProductCardPreview } from '../../entities/ProductCardPreview';
import { withProtection } from '../../shared/HOCs/withProtection';
import { PageTittle } from '../../shared/components/Title';
import { ErrorPage } from '../Error';

export const CartPage: FC = withProtection(() => {
	const { addedToCart } = useAppSelector(selectProducts);
	console.log(addedToCart);

	return (
		<>
			<PageTittle title='Корзина' />
			{addedToCart?.length === 0 ? (
				<ErrorPage
					title='В Корзине пока ничего нет'
					link='/catalog'
					btnText='В каталог'
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
					{addedToCart?.length > 0 &&
						addedToCart.map((item, index) => (
							<ProductCardPreview key={index} product={item} />
						))}
				</Stack>
			)}
		</>
	);
});
