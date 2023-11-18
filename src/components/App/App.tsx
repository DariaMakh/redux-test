import Header from '../Header';
import Footer from '../Footer';
import { Container } from '@mui/material';
import { useEffect } from 'react';
import Router from '../../router';
import { useAppDispatch } from '../../storage/hooks';
import { fetchProductsList } from '../../storage/reducers/products/products-slice';
import { fetchUser } from '../../storage/reducers/user/user-slice';

const App = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchUser()).then(() => {
			dispatch(fetchProductsList());
		});
	}, [dispatch]);

	return (
		<>
			<Header />
			<Container maxWidth='lg' style={{ padding: 0, flexGrow: 1 }}>
				<Router />
			</Container>
			<Footer />
		</>
	);
};

export default App;
