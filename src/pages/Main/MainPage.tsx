import { FC } from 'react';
import { Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const MainPage: FC = () => {
	return (
		<Container maxWidth='md' component='main' sx={{ pt: 8, pb: 6, ml: 0 }}>
			<Typography component='h1' variant='h2' sx={{ textAlign: 'left' }}>
				Крафтовые лакомства для собак
			</Typography>
			<Typography variant='h5' color='text.secondary' component='p'>
				Всегда свежие лакомства ручной работы с доставкой по России и Миру
			</Typography>
			<Link to='/catalog'>
				<Typography
					color='text.secondary'
					component='p'
					sx={{ mt: '8px', color: '#1976d2', fontWeight: '600' }}>
					Перейти в каталог
				</Typography>
			</Link>
		</Container>
	);
};
