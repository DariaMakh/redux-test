import PageTittle from '../../components/Title';
import OutlinedBtn from '../../components/OutlinedBtn';
import { Link, useNavigate } from 'react-router-dom';
import { List, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import { useAppDispatch, useAppSelector } from '../../storage/hooks';
import { selectUser } from '../../storage/reducers/user/selectors';
import s from './Profile.module.css';
import { clearTokens } from '../../storage/reducers/auth/auth-slice';
import { batch } from 'react-redux';
import { clearUser } from '../../storage/reducers/user/user-slice';
const Profile = () => {
	const user = useAppSelector(selectUser) as User;
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const onClickLogOut = () => {
		batch(() => {
			dispatch(clearTokens());
			dispatch(clearUser());
		});
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
};

export default Profile;
