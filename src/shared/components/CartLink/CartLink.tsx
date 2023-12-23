import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { IconCart } from '../Icons';

export const CartLink = () => {
	return (
		<Link to='/cart'>
			<IconButton
				size='large'
				aria-label='Корзина'
				aria-haspopup='true'
				color='inherit'>
				<IconCart />
			</IconButton>
		</Link>
	);
};
