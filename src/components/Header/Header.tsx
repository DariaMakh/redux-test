import { AppBar, Box, Toolbar } from '@mui/material';
import { Container } from '@mui/system';
import Logo from '../Logo';
import Search from '../Search';
import FavoritesIcon from '../FavoritesIcon';
import CartIcon from '../CartIcon';
import ProfileIcon from '../ProfileIcon';
import s from './Header.module.css';
import { Link } from 'react-router-dom';
import { accessTokenSelector } from '../../storage/reducers/auth/selectors';
import { useAppSelector } from '../../storage/hooks';

const Header = () => {
	const accessToken = useAppSelector(accessTokenSelector);

	return (
		<Box className={s.wrap}>
			<AppBar position='static' className={s.appBar}>
				<Container maxWidth='lg' style={{ padding: 0 }}>
					<Toolbar className={s.flex}>
						<Link to='/'>
							<Logo />
						</Link>
						{accessToken && <Search />}
						<div className={s.flex}>
							<Box
								sx={{
									display: { xs: 'none', md: 'flex' },
									alignItems: 'center',
								}}>
								{accessToken && (
									<>
										<Link to='/favorites'>
											<FavoritesIcon />
										</Link>
										<CartIcon />
										<ProfileIcon />
									</>
								)}

								{!accessToken && <Link to='/sign-up'>Зарегистрироваться</Link>}
							</Box>
						</div>
					</Toolbar>
				</Container>
			</AppBar>
		</Box>
	);
};

export default Header;
