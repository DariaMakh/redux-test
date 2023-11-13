import { ReactComponent as IconBlack } from '../../assets/images/favorites.svg';
import { ReactComponent as IconGrey } from '../../assets/images/favorites-grey.svg';
import { IconButton } from '@mui/material';
import { FC } from 'react';
import { Link } from 'react-router-dom';

interface IFavoritesIconProps {
	iconColor?: 'grey' | 'black';
}

const FavoritesIcon: FC<IFavoritesIconProps> = ({ iconColor = 'black' }) => {
	return (
		<Link to='/favorites'>
			<IconButton
				size='large'
				aria-label='Избранное'
				aria-haspopup='true'
				color='inherit'>
				{iconColor === 'black' && <IconBlack />}
				{iconColor === 'grey' && <IconGrey />}
			</IconButton>
		</Link>
	);
};

export default FavoritesIcon;
