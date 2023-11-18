import PageTittle from '../../components/Title';
import OutlinedBtn from '../../components/OutlinedBtn';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import { useAppSelector } from '../../storage/hooks';
import { selectUser } from '../../storage/reducers/user/selectors';
import s from './Profile.module.css';
const Profile = () => {
	const user = useAppSelector(selectUser) as User;

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

			<Link to='/'>
				<OutlinedBtn href='#' text='Выйти' mt='40px' />
			</Link>
		</Stack>
	);
};

export default Profile;
