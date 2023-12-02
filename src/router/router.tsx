import { createBrowserRouter } from 'react-router-dom';
import App from '../components/App';
import Catalog from '../pages/Catalog';
import Profile from '../pages/Profile';
import EditUser from '../pages/EditUser';
import Favorites from '../pages/Favorites';
import Card from '../pages/Card';
import AddReview from '../pages/AddReview';
import ErrorContent from '../components/ErrorContent';
import { SignUp } from '../pages/SignUp/SignUp';
import { SignIn } from '../pages/SignIn/SignIn';
import { MainPage } from '../pages/Main/MainPage';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				index: true,
				element: <MainPage />,
			},
			{
				path: 'catalog',
				element: <Catalog />,
			},
			{
				path: 'profile',
				element: <Profile />,
			},
			{
				path: 'edit-user',
				element: <EditUser />,
			},
			{
				path: 'favorites',
				element: <Favorites />,
			},
			{
				path: 'catalog/:productId',
				element: <Card />,
			},
			{
				path: 'add-review/:productId',
				element: <AddReview />,
			},
			{
				path: 'sign-up',
				element: <SignUp />,
			},
			{
				path: 'sign-in',
				element: <SignIn />,
			},
			{
				path: '*',
				element: <ErrorContent title='Страница не найдена' />,
			},
		],
	},
]);
