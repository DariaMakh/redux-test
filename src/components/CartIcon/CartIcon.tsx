import { ReactComponent as Icon } from '../../assets/images/cart.svg';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

const CartIcon = () => {
	return (
		<Link to='/'>
			<IconButton
				size='large'
				aria-label='Корзина'
				aria-haspopup='true'
				color='inherit'>
				<Icon />
			</IconButton>
		</Link>
	);
};

export default CartIcon;
