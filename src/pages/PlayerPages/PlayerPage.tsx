import {  Avatar, Box, Card, CardContent, Grid, Skeleton, Typography } from '@mui/material';
import { isNil } from 'lodash';
import { observer } from 'mobx-react';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PlayerAverageStats from 'src/views/PlayerPage/PlayerAverageStats';
import Position from 'src/components/Position';
import { PlayerModel } from 'src/dataLayer/balldontlie/models/Player';
import { PlayerInfoParams } from 'src/domainLayer/PlayerRepository';
import { getPlayerPositions } from 'src/helpers/playerPosition';
import PageLayout from 'src/layout/PageLayout';
import { useStore } from 'src/stores';

const PlayerPage: React.FC = observer(() => {
    const {id} = useParams<SinglePageRouteParams>();

    const { playerStore } = useStore();
    // const navigate = useNavigate();

    const playerInfoFields: ColumnNames<PlayerModel, string> = [
        {key: ['height_feet', 'height_inches'], label: 'Height'},
        {key: 'weight_pounds', label: 'Weight in lbs'},
        {key: 'position', label: 'Position'},
        {key: 'team', label: 'Team'}
    ]

    React.useEffect(() => {
        const playerParams: Partial<PlayerInfoParams> = {
            "player_ids[]": [Number(id)],
            // FIXME: для теста!
            "seasons[]": [2021],
        }
        void playerStore.getPlayerInfo(playerParams);
    }, [id, playerStore]);

    const renderInfoFieldContent = (key: keyof PlayerModel | Array<keyof PlayerModel>): JSX.Element => {
        if (!playerStore.selectedPlayer) return null;
        
        if (Array.isArray(key)) {
            const notNullProperties = key.filter(k => !isNil(playerStore.selectedPlayer[k]));

            if (!notNullProperties.length) return <Typography>—</Typography>;

            return (
                <>
                    {notNullProperties.map(k => {
                        if (k === 'position') {
                            return <Position key={k} position={getPlayerPositions(playerStore.selectedPlayer.player.position)}/>;
                        } else {
                            return <Typography key={k}>{playerStore.selectedPlayer.player[k]?.toString()}</Typography>;
                        }
                    })}
                </>
            );
        } 

        if (!isNil(playerStore.selectedPlayer[key])) return <Typography>—</Typography>;

        if (key === 'position') {
            return <Position position={getPlayerPositions(playerStore.selectedPlayer.player.position)}/>;
        } else {
            return <Typography>{playerStore.selectedPlayer.player[key]?.toString()}</Typography>;
        }
    }

    // const handleGoBack = (): void => navigate(-1);

    const playerInitials = `${playerStore.selectedPlayer?.player.last_name} ${playerStore.selectedPlayer?.player.first_name}`;

    return (
        <PageLayout>
            {!playerStore.selectedPlayer ? <Skeleton/> : (
                <>
                    <Card className='player-card'>
                        <CardContent>
                            <Avatar variant='square' src={playerStore.selectedPlayer.player?.picture} alt={playerInitials}/>
                            <Box className='player-card--info'>
                                <Typography>{playerInitials}</Typography> 
                                <Grid container spacing={2}>
                                    {playerInfoFields.map(infoField => {
                                        return (
                                            <>
                                                <Grid item xs={4}>
                                                    <Typography>{infoField.label}</Typography>
                                                </Grid>
                                                <Grid item xs={8}>
                                                {renderInfoFieldContent(infoField.key)}
                                                </Grid>
                                            </>
                                        )
                                    })}
                                </Grid>
                            </Box>
                            <PlayerAverageStats seasonAverages={playerStore.selectedPlayer.seasonAverages}/>
                        </CardContent>
                    </Card>
                    <>Тут игры</>
                </>
            )}
        </PageLayout>
    )
});

export default PlayerPage;