import React from  'react';
import ReactDOM from 'react-dom';
import { APIProvider } from './api';
import App from './App';

ReactDOM.render(
    <React.StrictMode>
        <APIProvider>
            <App/>
        </APIProvider>
    </React.StrictMode>,
    document.getElementById('root')
);