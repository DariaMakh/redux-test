import Header from '../Header';
import Footer from '../Footer';
import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import Router from '../../router';
import { useAppDispatch } from '../../storage/hooks';
import { fetchProductsList } from '../../storage/reducers/products/products-slice';
import { fetchUser } from '../../storage/reducers/user/user-slice';

const App = () => {
	const [searchValue, setSearchValue] = useState<string>('');

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchUser());
		dispatch(fetchProductsList());
	}, [dispatch]);

	return (
		<>
			<Header searchValue={searchValue} setSearchValue={setSearchValue} />
			<Container maxWidth='lg' style={{ padding: 0, flexGrow: 1 }}>
				<Router />
			</Container>
			<Footer />
		</>
	);
};

export default App;
