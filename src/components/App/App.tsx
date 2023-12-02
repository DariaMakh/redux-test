import Header from '../Header';
import Footer from '../Footer';
import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

const App = () => {
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

export default App;
