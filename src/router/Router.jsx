import { Route, Routes } from 'react-router';
import Catalog from '../pages/Catalog';
import Profile from '../pages/Profile';
import ErrorContent from '../components/ErrorContent';
import Favorites from '../pages/Favorites';
import Card from '../pages/Card';
import EditUser from '../pages/EditUser';
import AddReview from '../pages/AddReview';

const Router = () => {
	return (
		<Routes>
			<Route path='/' element={<Catalog />} />
			<Route path='/profile' element={<Profile />} />
			<Route path='/edit-user' element={<EditUser />} />
			<Route path='/favorites' element={<Favorites />} />
			<Route path='/catalog/:productId' element={<Card />} />
			<Route path='/add-review/:productId' element={<AddReview />} />
			<Route path='*' element={<ErrorContent title='Страница не найдена' />} />
		</Routes>
	);
};

export default Router;
