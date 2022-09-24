import { Typography } from '@mui/material';
import React from 'react';
import PageLayout from 'src/layout/PageLayout';

const WelcomePage: React.FC = () => {
    return (
        <PageLayout>
            <Typography>Welcome to the NBA Explorer!</Typography>
        </PageLayout>
    );
}

export default WelcomePage;