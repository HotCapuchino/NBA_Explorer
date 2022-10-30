import { Box, Typography, Grow } from '@mui/material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageLayout from 'src/layout/PageLayout';
import { routes } from 'src/routes/routeObject';
import { useStore } from 'src/stores';


const WelcomePage: React.FC = () => {
    const {appStore} = useStore();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (!appStore.startPageVisited) {
            appStore.startPageVisited = true;
        } else {
            navigate(routes.players.index);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // TODO: paste video on the background
    return (
        <PageLayout className=''>
            <Box>
                <Grow in={true}>
                    <Typography variant='h2'>Welcome to the NBA Explorer!</Typography>
                </Grow>
                <Grow in={true} style={{ transitionDelay: '500ms' }}>
                    <Box><Link to={routes.players.index}>Start Exploring NBA Stats</Link></Box>
                </Grow>
            </Box>
        </PageLayout>
    );
};

export default WelcomePage;