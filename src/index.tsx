import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { RouterProvider } from 'react-router-dom';
import './global.css';
import { Provider } from 'react-redux';
import { persistor, store } from './storage/store';
import { router } from './router/router';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<RouterProvider router={router} />
				<ToastContainer
					position='top-right'
					autoClose={5000}
					pauseOnHover
					theme='colored'
				/>
			</PersistGate>
		</Provider>
	</StrictMode>
);
