/* eslint-disable @typescript-eslint/no-unused-vars */
import { Avatar, Typography } from "@mui/material";
import React from "react";
import { TableColumn } from "src/components/CustomTable/types";
import Position from "src/components/Position";
import { PlayerModel } from "src/dataLayer/balldontlie/models/Player";
import { getPlayerPositions } from "src/helpers/playerPosition";


export const playersPageColumns: Array<TableColumn<PlayerModel>> = [
    {
        columnKey: 'picture',
        columnName: 'Photo',
        render: (player: PlayerModel, src: unknown) => {
            return <Avatar variant='square' src={src as string} alt={`${player.last_name} ${player.first_name}`}/>;
        },  
    }, 
    {
        columnKey: 'first_name',
        columnName: 'First name',
    },  
    {
        columnKey: 'last_name',
        columnName: 'Last name',
    },  
    {
        columnKey: 'position',
        columnName: 'Position',
        render: (_: PlayerModel, position: unknown) => {
            return <Position position={getPlayerPositions(position as string)}/>;
        }
    }, 
    {
        columnKey: 'team',
        columnName: 'Team',
        render: (player: PlayerModel, _: unknown) => {
            return <Typography>{player.team.full_name}</Typography>;
        }
    }, 
];