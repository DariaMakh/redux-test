import { AppBar, Box, Toolbar } from '@mui/material';
import { Container } from '@mui/system';
import Logo from '../Logo';
import Search from '../Search';
import FavoritesIcon from '../FavoritesIcon';
import CartIcon from '../CartIcon';
import ProfileIcon from '../ProfileIcon';
import s from './Header.module.css';
import { FC } from 'react';

type HeaderProps = {
	searchValue: string;
	setSearchValue: (value: string) => void;
};

const Header: FC<HeaderProps> = ({ searchValue, setSearchValue }) => {
	return (
		<Box className={s.wrap}>
			<AppBar position='static' className={s.appBar}>
				<Container maxWidth='lg' style={{ padding: 0 }}>
					<Toolbar className={s.flex}>
						<Logo />
						<Search searchValue={searchValue} setSearchValue={setSearchValue} />
						<div className={s.flex}>
							<Box
								sx={{
									display: { xs: 'none', md: 'flex' },
									alignItems: 'center',
								}}>
								<FavoritesIcon />
								<CartIcon />
								<ProfileIcon />
							</Box>
						</div>
					</Toolbar>
				</Container>
			</AppBar>
		</Box>
	);
};

export default Header;
