import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import CustomRouter from './routes';

const App: React.FC = () => {
    return (
        <BrowserRouter> 
            <CustomRouter/>
        </BrowserRouter>
    );
}

export default App;