import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { IconProfile } from '../Icons';

export const ProfileLink = () => {
	return (
		<Link to='/profile'>
			<IconButton
				size='large'
				aria-label='Профиль'
				aria-haspopup='true'
				color='inherit'>
				<IconProfile />
			</IconButton>
		</Link>
	);
};
