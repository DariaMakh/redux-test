import { Container } from '@mui/material';
import { Header } from '../widgets/Header';
import { Footer } from '../widgets/Footer';
import { Outlet } from 'react-router-dom';

export const App = () => {
	return (
		<>
			<Header />
			<Container maxWidth='lg' style={{ padding: 0, flexGrow: 1 }}>
				<Outlet />
			</Container>
			<Footer />
		</>
	);
};
