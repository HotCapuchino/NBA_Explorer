import { observer } from 'mobx-react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from 'src/stores';

const GamePage: React.FC = observer(() => {
    const {id} = useParams<SinglePageRouteParams>();
    const { gameStore } = useStore();
    
    React.useEffect(() => {
        void gameStore.findGame(Number(id));
    }, [id, gameStore]);

    return (
        <>
            <div>GamePage with id {id}</div>
            <div>Here would be game with its players stats</div>
        </>
    );
})

export default GamePage;