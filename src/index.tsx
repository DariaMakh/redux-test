import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { Provider } from './app/providers';
import './assets/styles/global.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<StrictMode>
		<Provider />
	</StrictMode>
);
