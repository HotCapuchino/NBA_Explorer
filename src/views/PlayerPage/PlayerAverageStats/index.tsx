import { Box, Card, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { get } from 'lodash';
import { Moment } from 'moment';
import React from 'react';
import LabelValue from 'src/components/KeyValue';
import { PlayerSeasonAverageStatsModel } from 'src/dataLayer/balldontlie/models/SeasonAverages';
import { infoBlocksMap } from './stats';

// нужно ли это вообще - хз
interface PlayerAverageStatsProps {
    seasonAverages?: PlayerSeasonAverageStatsModel;
    onSeasonChange?: (season: Moment) => void;
}

const PlayerAverageStats: React.FC<PlayerAverageStatsProps> = (props) => {
    const {seasonAverages} = props;

    const renderInfo = (): JSX.Element[] => {
        return infoBlocksMap.map((info) => {
            return (
                <Card key={info.label} className='player-stats--stats-block'>
                    <Typography>{info.label}</Typography>
                    {
                        info.stats.map(stat => {
                            return (
                                <LabelValue key={stat.label} label={stat.label}>
                                    {get(seasonAverages, stat.key as keyof PlayerSeasonAverageStatsModel, 'No data')}
                                </LabelValue> 
                            )
                        })
                    }
                </Card>
            );
        })
    }

    return (
        <Box className='player-stats'>
            <DatePicker 
                label='season'
                // JUST FOR TEST
                value={2016}
                views={['year']}
                onChange={(value, input) => console.log(value, input)}
                renderInput={(props) => <TextField {...props} />}
                />    
            {!seasonAverages ? <Typography>No stats for this season</Typography> : (
                <Box className='player-stats--wrapper'>
                    {renderInfo()}
                </Box>
            )}
        </Box>
    )
}

export default PlayerAverageStats;