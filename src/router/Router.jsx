import { Route, Routes } from 'react-router';
import Catalog from '../pages/Catalog';
import Profile from '../pages/Profile';
import ErrorContent from '../components/ErrorContent';
import Favorites from '../pages/Favorites';
import Card from '../pages/Card';

const Router = () => {
	return (
		<Routes>
			<Route path='/' element={<Catalog />} />
			<Route path='/profile' element={<Profile />} />
			<Route path='/favorites' element={<Favorites />} />
			<Route path='/catalog/:productId' element={<Card />} />
			<Route path='*' element={<ErrorContent title='Страница не найдена' />} />
		</Routes>
	);
};

export default Router;
