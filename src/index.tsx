import React from  'react';
import ReactDOM from 'react-dom';
import App from './App';
import { StoreProvider } from './stores';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import {LocalizationProvider} from '@mui/x-date-pickers';
import { APIProvider } from './dataLayer/balldontlie';

ReactDOM.render(
    <React.StrictMode>
            <APIProvider>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <StoreProvider>
                        <App/>
                    </StoreProvider>
                </LocalizationProvider>
            </APIProvider>
    </React.StrictMode>,
    document.getElementById('root')
);