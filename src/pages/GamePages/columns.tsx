/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Avatar, Box, Divider, Typography } from "@mui/material";
import { TableColumn } from "src/components/CustomTable/types";
import { GameModel } from "src/dataLayer/balldontlie/models/Game";
import { classNames } from "src/helpers/classnames";
import { formatDate } from "src/helpers/dateFormat";

export const getGamesPageColumns = (onRowClick: (gameId: number) => (() => void)): Array<TableColumn<GameModel>> => {
    return [
        {
            columnKey: 'gameSummary',
            columnName: 'Game summary',
            render: (game: GameModel, _: unknown) => {
                const isDraw = game.home_team_score === game.visitor_team_score;
                    const homeTeamIsWinner = game.home_team_score > game.visitor_team_score;
    
                    return (
                        <Box className='game-info-wrapper' onClick={onRowClick(game.id)}>
                            <Box className={classNames('team-container', isDraw ? 'team-container_draw' : homeTeamIsWinner ? 'team-container_winner' : 'team-container_loser')}>
                                <Box className='team-container--info'>
                                    <Avatar src={game.home_team.picture} alt={game.home_team.abbreviation}/>
                                    <Typography>{game.home_team.abbreviation}</Typography>
                                </Box>
                                <Typography className='team-container--score'>{game.home_team_score}</Typography>
                            </Box>
                            <Divider className='game-info-wrapper--divider' orientation='horizontal' />
                            <Box className={classNames('team-container', isDraw ? 'team-container_draw' : !homeTeamIsWinner ? 'team-container_winner' : 'team-container_loser', 'team-container_reversed')}>
                                <Typography className='team-container--score'>{game.visitor_team_score}</Typography>
                                <Box className='team-container--info'>
                                    <Avatar src={game.visitor_team.picture} alt={game.visitor_team.abbreviation}/>
                                    <Typography>{game.visitor_team.abbreviation}</Typography>
                                </Box>
                            </Box>
                            <Box>
                            </Box>
                        </Box>
                    );
            }
        }, 
        {
            columnKey: 'date',
            columnName: 'Date',
            render: (_: GameModel, field: unknown): JSX.Element => <Typography>{formatDate(String(field))}</Typography>,
        }
    ];
} 
