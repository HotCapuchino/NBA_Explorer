/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Box, Checkbox, FormControlLabel, FormGroup, IconButton, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { cloneDeep } from 'lodash';
import { observer } from 'mobx-react';
import moment from 'moment';
import { Moment } from 'moment';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FetchGamesParams } from 'src/dataLayer/balldontlie/types';
import PageLayout from 'src/layout/PageLayout';
import { routes } from 'src/routes/routeObject';
import { useStore } from 'src/stores';
import CloseIcon from '@mui/icons-material/Close';
import './styles';
import CustomTable from 'src/components/CustomTable';
import { getGamesPageColumns } from './columns';

const GamesPage: React.FC = observer(() => {
    const {gameStore, teamStore} = useStore();

    const navigate = useNavigate();
    const location = useLocation();
    // date filters
    const [chosenSeason, setChosenSeason] = React.useState<Moment>(() =>moment());
    const [gameDate, setGameDate] = React.useState<Moment>(null);
    const [intervalDate, setIntervalDate] = React.useState<{start: Moment, end: Moment}>({start: null, end: null});
    // postseason filter
    const [isPostseason, setIsPostseason] = React.useState<boolean>(false);
    // team filter
    const [teamId, setTeamId] = React.useState<number>();
    const [currentPage, setCurrentPage] = React.useState<number>(0);

    React.useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        if (location.state?.hasOwnProperty('teamId')) {
            const teamId = Number(location.state['teamId']);

            if (!teamStore.teams.find(team => team.id === teamId)) {
                void teamStore.fetchTeams();
            }
            setTeamId(teamId);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    React.useEffect(() => {
        requestGamesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameStore, chosenSeason, gameDate, intervalDate, isPostseason, teamId, currentPage]);

    const requestGamesData = (): void => {
        const gameFilters: FetchGamesParams = {
            "seasons[]": [chosenSeason.year()],
            postseason: isPostseason
        }
        if (gameDate) gameFilters['dates[]'] = [gameDate.format('YYYY-MM-DD')];
        if (intervalDate.start) gameFilters.start_date = intervalDate.start.format('YYYY-MM-DD');
        if (intervalDate.end) gameFilters.end_date = intervalDate.end.format('YYYY-MM-DD');
        if (teamId) gameFilters['team_ids[]'] = [teamId];
        gameFilters.page = currentPage + 1;

        void gameStore.fetchGamesByFilters(gameFilters);
    }

    const handleChangeDatePicker = (type: 'season' | 'date' | 'startDate' | 'endDate') => (val: Moment): void => {
        const startOfTheSeason = moment(val).set('month', 9);
        const endOfTheSeason = moment(val).set('month', 6);

        
        switch (type) {
            case 'season': {
                let newIntervalStart = cloneDeep(intervalDate.start);
                let newIntervalEnd = cloneDeep(intervalDate.end);

                if (intervalDate.start) {
                    if (intervalDate.start.isBefore(startOfTheSeason)) {
                        newIntervalStart = cloneDeep(startOfTheSeason);
                    } 
                }
                if (intervalDate.end) {
                    if (intervalDate.end.isAfter(endOfTheSeason)) {
                        newIntervalEnd = cloneDeep(endOfTheSeason);
                    }
                }

                setChosenSeason(val);
                setGameDate(null);
                setIntervalDate({start: newIntervalStart, end: newIntervalEnd});
                setIsPostseason(false);
                break;
            }
            case 'date': {
                if (val.year() !== chosenSeason.year()) {
                    setChosenSeason(val);
                }

                setGameDate(val);
                setIntervalDate({start: null, end: null});
                break;
            }
            case 'startDate':
            case 'endDate': {
                let targetDate = cloneDeep(val);
                const dateToCheck = type === 'startDate' ? intervalDate.end : intervalDate.start;
                const keyToUpdate: 'start' | 'end' = type === 'startDate' ? 'start' : 'end';

                if (dateToCheck) {
                    if (type === 'startDate' && val.isAfter(dateToCheck)) {
                        targetDate = cloneDeep(dateToCheck).subtract(1, 'day');
                    }
                    if (type === 'endDate' && val.isBefore(dateToCheck)) {
                        targetDate = cloneDeep(dateToCheck).add(1, 'day');
                    }
                }

                if (val.year() !== chosenSeason.year()) {
                    setChosenSeason(val);
                }  
                        
                setGameDate(null);
                setIntervalDate(prevState => ({...prevState, [keyToUpdate]: targetDate}));
                break;
            }
        }

        setCurrentPage(0);
    }

    const handleCheckboxChange = (_: React.ChangeEvent<HTMLInputElement>, checked: boolean): void => {
        setIsPostseason(checked);
        setIntervalDate({start: null, end: null});
        setGameDate(null);
    }

    const handlePageChanging = (_: React.MouseEvent<HTMLButtonElement> | null, page: number): void => setCurrentPage(page);

    const handleClickTableRow = React.useCallback((id: number) => (): void => navigate(routes.games.openGame(id)), [navigate]);

    const gameColumns = React.useMemo(() => {
        return getGamesPageColumns(handleClickTableRow);
    }, [handleClickTableRow])

    const handleRemoveTeamFilter = () => setTeamId(null);

    return (
        <PageLayout hasHeader={true}>
            <CustomTable 
                data={gameStore.games.data}
                columns={gameColumns}
                extraHeader={
                    <FormGroup>
                        <DatePicker 
                            label='season'
                            value={chosenSeason}
                            views={['year']}
                            onChange={handleChangeDatePicker('season')}
                            renderInput={(props) => <TextField {...props} />}
                            />
                        <DatePicker
                            label='Date of the game'
                            value={gameDate}
                            views={['day', 'month']}
                            onChange={handleChangeDatePicker('date')}
                            renderInput={(props) => <TextField {...props} />}
                        />
                        <DatePicker
                            label='From'
                            value={intervalDate.start}
                            onChange={handleChangeDatePicker('startDate')}
                            renderInput={(props) => <TextField {...props} />}
                        />
                        <DatePicker
                            label='To'
                            value={intervalDate.end}
                            onChange={handleChangeDatePicker('endDate')}
                            renderInput={(props) => <TextField {...props} />}
                        />
                        <FormControlLabel control={<Checkbox checked={isPostseason} onChange={handleCheckboxChange} />} label="Postseason" />
                        {teamId && (
                            <Box>
                                <Typography>{teamStore.teams.find(team => team.id === teamId)?.name || 'Chosen team'}</Typography><IconButton onClick={handleRemoveTeamFilter}><CloseIcon/></IconButton>
                            </Box>
                        )}
                    </FormGroup>
                }
                pagination={{
                    enabled: true,
                    params: {
                        count: gameStore.games.meta?.total_count || 0,
                        page: currentPage,
                        rowsPerPage: gameStore.entriesPerPage,
                        onPageChange: handlePageChanging,
                    }
                }}
                />
        </PageLayout>
    );
});

export default GamesPage;