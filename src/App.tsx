import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import CustomRouter from './routes';
import './styles';
import { ThemeProvider } from '@mui/material/styles';
import { generalTheme } from './theme';

const App: React.FC = () => {
    return (
        <ThemeProvider theme={generalTheme}>
            <BrowserRouter> 
                <CustomRouter/>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;