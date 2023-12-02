import { FC } from 'react';
import { Container, IconButton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const MainPage: FC = () => {
	return (
		<Container
			disableGutters
			maxWidth='sm'
			component='main'
			sx={{ pt: 8, pb: 6 }}>
			<Typography
				component='h1'
				variant='h2'
				align='center'
				color='text.primary'
				gutterBottom>
				Products portal
			</Typography>
			<Typography
				variant='h5'
				align='center'
				color='text.secondary'
				component='p'>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores esse
				debitis mollitia autem eos error quasi saepe fuga eum nam omnis quas
				iusto in voluptate deleniti magni doloremque, laborum quia?
			</Typography>
			<Link to='/catalog'>Catalog</Link>
		</Container>
	);
};
