import { AppBar, Box, Tab, Tabs, Typography } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { NBALogo } from 'src/icons';
import { routes } from 'src/routes/routeObject';

type NavbarMenuItemContent = {value: NavbarTabs, route: string};

enum NavbarTabs {
    Players = 'Players',
    Teams = 'Teams',
    Games = 'Games',
}

const Header: React.FC = () => {
    const tabs: NavbarMenuItemContent[] = [
        {value: NavbarTabs.Players, route: routes.players.index }, 
        {value: NavbarTabs.Teams, route: routes.teams.index }, 
        {value: NavbarTabs.Games, route: routes.games.index }
    ];

    const location = useLocation();
    const chosenTab: NavbarTabs = (() => {
        let currentTab: NavbarTabs;

        tabs.forEach(tab => {
            if (location.pathname === tab.route) {
                currentTab = tab.value;
            }
        })

        return currentTab || NavbarTabs.Players;
    })();

    const navigate = useNavigate();

    const handleTabValueChange = (_: React.SyntheticEvent<Element, Event>, value: unknown): void => {
        const route = tabs.find(tab => tab.value === value)?.route;
        route && navigate(route);
    }

    return (
        <AppBar position='sticky'>
            {/* <Typography>There should be logo</Typography> */}
            {/* <NBALogo/> */}
            <Box>
                <Tabs value={chosenTab} onChange={handleTabValueChange}>
                    {tabs.map(tab => <Tab key={tab.value} value={tab.value} label={tab.value}/>)}
                </Tabs>
            </Box>
        </AppBar>    
    );
}   

export default Header;