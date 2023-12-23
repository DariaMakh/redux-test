import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/store/hooks';
import { accessTokenSelector } from '../../app/store/reducers/auth/selectors';
import {
	IconCart,
	IconFavorites,
	IconLogo,
	IconProfile,
} from '../../shared/components/Icons';
import { Search } from '../../shared/components/Search';
import s from './styles.module.css';

export const Header = () => {
	const accessToken = useAppSelector(accessTokenSelector);

	return (
		<Box className={s.wrap}>
			<AppBar position='static' className={s.appBar}>
				<Container maxWidth='lg' style={{ padding: 0 }}>
					<Toolbar className={s.flex}>
						<Link to='/'>
							<IconLogo />
						</Link>
						<Link to='/catalog'>
							<Typography sx={{ color: '#b0daff', fontWeight: '600' }}>
								Каталог
							</Typography>
						</Link>

						{accessToken && <Search />}
						<div className={s.flex}>
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									gap: '16px',
								}}
								className={s.links}>
								{accessToken && (
									<>
										<Link to='/favorites'>
											<IconFavorites />
										</Link>
										<Link to='/cart'>
											<IconCart />
										</Link>
										<Link to='/profile'>
											<IconProfile />
										</Link>
									</>
								)}

								{!accessToken && (
									<Link to='/sign-up'>
										<Typography sx={{ color: '#b0daff', fontWeight: '600' }}>
											Зарегистрироваться
										</Typography>
									</Link>
								)}
							</Box>
						</div>
					</Toolbar>
				</Container>
			</AppBar>
		</Box>
	);
};
