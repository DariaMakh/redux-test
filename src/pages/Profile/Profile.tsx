import { List, ListItem, ListItemText, Typography } from '@mui/material';
import PageTittle from '../../components/Title';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import s from './Profile.module.css';
import OutlinedBtn from '../../components/OutlinedBtn';
import { useContext, useEffect } from 'react';
import { UserContext, UserContextType } from '../../context/user-context';
import { Link } from 'react-router-dom';

const Profile = () => {
	const { user } = useContext(UserContext) as UserContextType;

	return (
		<>
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
					<ListItemText primary='+7 (977) 980-12-09' />
				</ListItem>
				<ListItem>
					<MailOutlinedIcon />
					<ListItemText primary={user.email} />
				</ListItem>
			</List>
			<OutlinedBtn text='Изменить' href='/' btnSize='large' mt='20px' />

			<Link to='/'>
				<OutlinedBtn href='#' text='Выйти' mt='40px' />
			</Link>
		</>
	);
};

export default Profile;
