import { AppBar, Box, IconButton, Tab, Tabs } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { NBALogo } from 'src/icons';
import { routes } from 'src/routes/routeObject';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '@mui/material/styles';


const Header: React.FC = () => {
    const tabs: NavbarMenuItemContent[] = [
        {value: 'Players', route: routes.players.index }, 
        {value: 'Teams', route: routes.teams.index }, 
        {value: 'Games', route: routes.games.index }
    ];

    const location = useLocation();
    const chosenTab: NavbarTabs = (() => {
        let currentTab: NavbarTabs;

        tabs.forEach(tab => {
            if (location.pathname === tab.route) {
                currentTab = tab.value;
            }
        })

        return currentTab || 'Players';
    })();

    const navigate = useNavigate();
    const theme = useTheme();

    const handleTabValueChange = (_: React.SyntheticEvent<Element, Event>, value: unknown): void => {
        const route = tabs.find(tab => tab.value === value)?.route;
        route && navigate(route);
    }

    // TODO: change theme with theme context;
    const handleChangeTheme = (): void => {
        //
    }

    return (
        <AppBar position='sticky' className='custom-header'>
            <NBALogo style={{maxHeight: 30}}/>
            <Box>
                <Tabs value={chosenTab} onChange={handleTabValueChange}>
                    {tabs.map(tab => <Tab key={tab.value} value={tab.value} label={tab.value}/>)}
                </Tabs>
            </Box>
            <IconButton onClick={handleChangeTheme}>
                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
        </AppBar>    
    );
}   

export default Header;