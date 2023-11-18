import { ReactComponent as IconBlack } from '../../assets/images/favorites.svg';
import { ReactComponent as IconGrey } from '../../assets/images/favorites-grey.svg';
import { ReactComponent as IconRed } from '../../assets/images/favorites-red.svg';

import { IconButton } from '@mui/material';
import { FC } from 'react';

interface IFavoritesIconProps {
	iconColor?: 'grey' | 'black' | 'red';
	onClick?: () => void;
}

const FavoritesIcon: FC<IFavoritesIconProps> = ({
	iconColor = 'black',
	onClick,
}) => {
	return (
		<IconButton
			size='large'
			aria-label='Избранное'
			aria-haspopup='true'
			color='inherit'
			onClick={onClick}>
			{iconColor === 'black' && <IconBlack />}
			{iconColor === 'grey' && <IconGrey />}
			{iconColor === 'red' && <IconRed />}
		</IconButton>
	);
};

export default FavoritesIcon;
