import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFound from 'src/layout/NotFound';
import GamesPage from 'src/pages/GamePages/GamesPage';
import PlayerPage from 'src/pages/PlayerPages/PlayerPage';
import PlayersPage from 'src/pages/PlayerPages/PlayersPage';
import TeamsPage from 'src/pages/TeamsPage';
import WelcomePage from 'src/pages/WelcomePage';
import { routes } from './routeObject';

const CustomRouter: React.FC = () => {
    return (
        <Routes>
            <Route path={routes.index} element={<WelcomePage/>} />
            <Route path={routes.players.index} element={<PlayersPage/>}/>
            <Route path={routes.players.player} element={<PlayerPage/>}/>
            <Route path={routes.teams.index} element={<TeamsPage/>} />
            <Route path={routes.games.index} element={<GamesPage/>} />
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    );
}

export default CustomRouter;