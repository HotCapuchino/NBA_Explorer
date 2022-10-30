/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Avatar, Box,  Fade, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Typography } from '@mui/material';
import React from 'react';
import { DivisionEnum } from 'src/dataLayer/balldontlie/models/Division';
import { TeamModel } from 'src/dataLayer/balldontlie/models/Team';
import { ConferenceEnum } from 'src/dataLayer/balldontlie/models/Conference';
import { EastCoastFullMap, EastCoastMap, WestCoastFullMap, WestCoastMap } from 'src/icons';
import { classNames } from 'src/helpers/classnames';
import { ConferenceViewType } from '../ConferenceView';
import './styles';

interface ConferenceProps {
    conferenceType: ConferenceEnum;
    teamsMap: Map<DivisionEnum, TeamModel[]>;
    viewType: ConferenceViewType;
    onTeamClick: (teamId: number) => void;
    onExpand: (expand: boolean) => void;
} 

const Conference: React.FC<ConferenceProps> = (props) => {
    const {teamsMap, conferenceType, viewType, onTeamClick, onExpand} = props;

    const [tabValue, setTabValue] = React.useState<DivisionEnum>(null);

    const columnNames: ColumnNames<TeamModel, string> = [
        {key: ['picture', 'abbreviation'], label: 'Logo'},
        {key: 'full_name', label: 'Name'},
        {key: 'city', label: 'City'}
    ];

    React.useEffect(() => {
        if (Array.from(teamsMap.keys()).length) {
            setTabValue(Array.from(teamsMap.keys())[0])
        }
    }, [teamsMap]);

    const handleClickingTeamCard = (teamId: number) => (): void => onTeamClick(teamId);

    const handleExpanding = (expand: boolean) => (): void => onExpand(expand); 

    const renderMap = (): JSX.Element => {
        switch (conferenceType) {
            case ConferenceEnum.West: return viewType !== ConferenceViewType.Expanded ? <WestCoastMap style={{maxHeight: 650}}/> : <WestCoastFullMap style={{maxHeight: 700}}/>;
            case ConferenceEnum.East: return viewType !== ConferenceViewType.Expanded ? <EastCoastMap style={{maxHeight: 700}}/> : <EastCoastFullMap style={{maxHeight: 700}}/>;
        }
    }

    const handleChangingSelectValue = (_: React.SyntheticEvent<Element, Event>, value: DivisionEnum): void => setTabValue(value);

    const renderTableCellContent = (column: ColumnName<TeamModel, string>, team: TeamModel): JSX.Element => {
        switch(column.label) {
            case 'Logo': {
                return (
                    <TableCell className={`division-cell_${tabValue.toLowerCase()}`}>
                        <Avatar src={team.picture} alt={team.abbreviation}/>
                        <Typography>{team.abbreviation}</Typography>
                    </TableCell>
                );
            }
            case 'Name': {
                return <TableCell key={column.label}>{team.full_name}</TableCell>;
            }
            case 'City': {
                return <TableCell key={column.label}>{team.city}</TableCell>
            }
        }
    }

    // TODO: доделать стили
    return (
        <Box className={classNames('conference-view', `conference-view_${viewType.toLowerCase()}`)}>
            <Box className={classNames('conference-view--map-container', conferenceType === ConferenceEnum.East && 'conference-view--map-container_reversed')}>
                {/* {viewType === ConferenceViewType.Expanded && <Typography>{conferenceType}</Typography>} */}
                {viewType !== ConferenceViewType.Expanded && (
                    <Box onClick={handleExpanding(true)}>
                        {conferenceType.split('').map((letter, index) => {
                            return (
                                <Fade key={index} in={true} timeout={index * 500 + 500}>
                                    <Typography className={classNames('conference-view--letter', `conference-view--letter_${conferenceType.toLowerCase()}`)} variant='h2'>{letter}</Typography>
                                </Fade>
                            ); 
                        })}
                    </Box>
                )}
                {renderMap()}
                {viewType === ConferenceViewType.Expanded && (
                    <Box className='division-block'>
                        <TableContainer>
                            <Table stickyHeader className='divisions-table'>
                                <TableHead>
                                    <TableRow>
                                        <Typography>Choose division</Typography>
                                        <Tabs value={tabValue} onChange={handleChangingSelectValue}>
                                            {Array.from(teamsMap.keys()).map(division => <Tab key={division} value={division} label={division}/>)}
                                        </Tabs>
                                    </TableRow>
                                    <TableRow>
                                        {columnNames.map(column => <TableCell key={Array.isArray(column.key) ? column.key.join() : column.key}>{column.label}</TableCell>)}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tabValue && teamsMap.get(tabValue).map((team, index) => {
                                        return (
                                            <Fade in={true} key={team.id} timeout={index * 500 + 500}>
                                                <TableRow onClick={handleClickingTeamCard(team.id)}>
                                                    {columnNames.map((column) => {
                                                        return renderTableCellContent(column, team)
                                                    })}
                                                </TableRow>
                                            </Fade>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                )}
            </Box>
        </Box>
    );
}

export default Conference;