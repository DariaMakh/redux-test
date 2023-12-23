import { FC } from 'react';
import { useAppSelector } from '../../app/store/hooks';
import { accessTokenSelector } from '../../app/store/reducers/auth/selectors';
import { SignInForm } from '../../features/SignInForm';
import { Profile } from '../Profile';
import { Box, Avatar, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link } from 'react-router-dom';

export const SignIn: FC = () => {
	const accessToken = useAppSelector(accessTokenSelector);

	if (accessToken) {
		return <Profile />;
	}
	return (
		<Box
			sx={{
				marginTop: 8,
			}}>
			<Avatar sx={{ m: 1, bgcolor: '#1976d2' }}>
				<LockOutlinedIcon />
			</Avatar>
			<Typography component='h1' variant='h5'>
				Войти
			</Typography>
			<Typography variant='h6' sx={{ margin: '10px 0' }}>
				Нету аккаунта? <Link to='/sign-up'>Зарегистрироваться</Link>
			</Typography>

			<SignInForm />
		</Box>
	);
};
