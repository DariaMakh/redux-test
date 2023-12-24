import { Link, useNavigate } from 'react-router-dom';
import { List, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import { useAppSelector, useAppDispatch } from '../../app/store/hooks';
import { clearTokens } from '../../app/store/reducers/auth/auth-slice';
import { selectUser } from '../../app/store/reducers/user/selectors';
import { clearUser } from '../../app/store/reducers/user/user-slice';
import { withProtection } from '../../shared/HOCs/withProtection';
import OutlinedBtn from '../../shared/components/OutlinedBtn';
import { PageTittle } from '../../shared/components/Title';
import s from './Profile.module.css';

export const ProfilePage = withProtection(() => {
	const user = useAppSelector(selectUser) as User;
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const onClickLogOut = () => {
		dispatch(clearTokens());
		dispatch(clearUser());
		navigate('/');
	};

	return (
		<Stack sx={{ marginTop: '20px' }}>
			<PageTittle title='Профиль' />
			<Typography
				variant='h5'
				component='h4'
				sx={{ fontWeight: 600, marginTop: '20px' }}>
				{user.name}
			</Typography>
			<List className={s.list}>
				<ListItem>
					<PhoneOutlinedIcon />
					<ListItemText primary={user.about} />
				</ListItem>
				<ListItem>
					<PhoneOutlinedIcon />
					<ListItemText primary='+7 (977) 980-12-09' />
				</ListItem>
				<ListItem>
					<MailOutlinedIcon />
					<ListItemText primary={user.email} />
				</ListItem>
			</List>
			<Link to='/edit-user'>
				<OutlinedBtn text='Изменить' href='#' btnSize='large' mt='20px' />
			</Link>

			<OutlinedBtn href='#' text='Выйти' mt='40px' onClick={onClickLogOut} />
		</Stack>
	);
});
