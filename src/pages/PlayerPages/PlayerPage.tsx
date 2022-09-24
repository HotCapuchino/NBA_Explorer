import React from 'react';
import { useParams } from 'react-router-dom';

type PlayerPageRouteParams = {id: string};

const PlayerPage: React.FC = () => {
    const {id} = useParams<PlayerPageRouteParams>();

    return (
        <div>PlayerPage with id {id}</div>
    )
}

export default PlayerPage;