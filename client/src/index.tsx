import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import './styles/ExercisePage.less';
import './styles/GeneralStyles.less';

const root = ReactDOM.createRoot(document.getElementById('root') as Element);
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
