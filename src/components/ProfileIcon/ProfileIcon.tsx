import { ReactComponent as LogoIcon } from '../../assets/images/profile.svg';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

const ProfileIcon = () => {
	return (
		<Link to='/profile'>
			<IconButton
				size='large'
				aria-label='Профиль'
				aria-haspopup='true'
				color='inherit'>
				<LogoIcon />
			</IconButton>
		</Link>
	);
};

export default ProfileIcon;
