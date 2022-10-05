import React from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from 'src/layout/PageLayout';

type PlayerPageRouteParams = {id: string};

const PlayerPage: React.FC = () => {
    const {id} = useParams<PlayerPageRouteParams>();

    return (
        <PageLayout>
            <div>PlayerPage with id {id}</div>
        </PageLayout>
    )
}

export default PlayerPage;