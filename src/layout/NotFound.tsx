import { Link, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

enum NotFoundPageErrorsEnum {
    Player = 'Requested player not found',
    Game = 'Requested game not found',
}

interface NotFoundPageProps {
    type?: NotFoundPageErrorsEnum;
}

const NotFound: React.FC<NotFoundPageProps> = (props) => {
    const {type} = props;

    const navigate = useNavigate();

    const handleGoBack = (): void => navigate(-1);
    
    return (
        <div className='not-found-container'>
            <Typography>{type ? type : 'Requested page not found'}</Typography>
            <Link component="button" onClick={handleGoBack}>Go Back</Link>
        </div>
    );
}

export default NotFound;