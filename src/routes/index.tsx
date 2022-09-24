import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PlayerPage from 'src/pages/PlayerPages/PlayerPage';
import PlayersPage from 'src/pages/PlayerPages/PlayersPage';
import WelcomePage from 'src/pages/WelcomePage';
import { routes } from './routeObject';

const CustomRouter: React.FC = () => {
    return (
        <Routes>
            <Route path={routes.index} element={<WelcomePage/>}>
                <Route path={routes.players.index} element={<PlayersPage/>}/>
                <Route path={routes.players.player} element={<PlayerPage/>}/>
            </Route>
        </Routes>
    );
}

export default CustomRouter;