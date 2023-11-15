import { createRoot } from 'react-dom/client';
import App from './components/App';
import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './global.css';
import { Provider } from 'react-redux';
import store from './storage/store';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);
root.render(
	<StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</StrictMode>
);