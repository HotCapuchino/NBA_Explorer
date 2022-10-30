import React from 'react';
import { PlayerPositions, PositionProps } from './types';
import './styles';
import { classNames } from 'src/helpers/classnames';
import { Box } from '@mui/material';

const Position: React.FC<PositionProps> = ({position}) => {    
    return (
        <Box className='player-position-wrapper'>
            {Array.isArray(position) ? (
                <>
                    {position.map(pos => {
                        const posKey = Object.keys(PlayerPositions).find(key => PlayerPositions[key] === pos);
                        return <div key={pos} className={classNames('player-position-block', `player-position-block_${posKey.toLowerCase()}`)}>{pos}</div>;
                    })}
                </>
            ) : (
                <div className={classNames('player-position-block', `player-position-block_${Object.keys(PlayerPositions).find(key => PlayerPositions[key] === position).toLowerCase()}`)}>{position}</div>
            )}
        </Box>
    );
}

export default Position;