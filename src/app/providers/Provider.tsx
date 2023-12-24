import { RouterProvider } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import { persistor, store } from '../store';
import { router } from '../router/router';
import 'react-toastify/dist/ReactToastify.css';

export const Provider = () => {
	return (
		<ReduxProvider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<RouterProvider router={router} />
				<ToastContainer
					position='top-right'
					autoClose={5000}
					pauseOnHover
					theme='light'
				/>
			</PersistGate>
		</ReduxProvider>
	);
};
