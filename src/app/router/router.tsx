import { createBrowserRouter } from 'react-router-dom';
import {
	AddReview,
	CardPage,
	CartPage,
	Catalog,
	EditUser,
	ErrorPage,
	Favorites,
	MainPage,
	Profile,
	SignIn,
	SignUp,
} from '../../pages';
import { App } from '../App';

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
				path: 'cart',
				element: <CartPage />,
			},
			{
				path: 'catalog/:productId',
				element: <CardPage />,
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
				element: <ErrorPage title='Страница не найдена' />,
			},
		],
	},
]);
