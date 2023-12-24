import { createBrowserRouter } from 'react-router-dom';

import { App } from '../App';
import {
	AddReviewPage,
	CardPage,
	CartPage,
	CatalogPage,
	EditUserPage,
	FavoritesPage,
	MainPage,
	ProfilePage,
	SignInPage,
	SignUpPage,
	ErrorPage,
} from '../../pages';

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
				element: <CatalogPage />,
			},
			{
				path: 'profile',
				element: <ProfilePage />,
			},
			{
				path: 'edit-user',
				element: <EditUserPage />,
			},
			{
				path: 'favorites',
				element: <FavoritesPage />,
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
				element: <AddReviewPage />,
			},
			{
				path: 'sign-up',
				element: <SignUpPage />,
			},
			{
				path: 'sign-in',
				element: <SignInPage />,
			},
			{
				path: '*',
				element: <ErrorPage title='Страница не найдена' />,
			},
		],
	},
]);
