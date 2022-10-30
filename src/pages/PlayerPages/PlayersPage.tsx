/* eslint-disable @typescript-eslint/no-unused-vars */
import { IconButton, Input } from '@mui/material';
import { observer } from 'mobx-react';
import React from 'react';
import PageLayout from 'src/layout/PageLayout';
import SearchIcon from '@mui/icons-material/Search';
import { useStore } from 'src/stores';
// import { useNavigate } from 'react-router-dom';
import CustomTable from 'src/components/CustomTable';
import { playersPageColumns } from './columns';


const PlayersPage: React.FC = observer(() => {
    const { playerStore } = useStore();
    // const navigate = useNavigate();

    const [searchInputValue, setSearchInputValue] = React.useState<string>('');
    const [currentPage, setCurrentPage] = React.useState<number>(0);

    React.useEffect(() => {
        requestPlayerData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playerStore, currentPage, playerStore.entriesPerPage]);

    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>): void => setSearchInputValue(event.target.value);

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.key.toLowerCase() === 'enter' && searchInputValue.length > 3) {
            handleStartSearch();
        } 
    }

    const requestPlayerData = (): void => {
        // API supports pagination with paging starts at 1 not 0
        void playerStore.fetchPlayers(currentPage + 1, searchInputValue.length ? searchInputValue : '').catch(e => console.error(e));
    }

    const handlePageChanging = (_: React.MouseEvent<HTMLButtonElement> | null, page: number): void => setCurrentPage(page);

    const handleRowsPerPageChanging = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
        playerStore.entriesPerPage = Number(event.target.value);
    }

    const handleStartSearch = (): void => {
        // Triggering useEffect 
        setCurrentPage(0);
        requestPlayerData();
    }

    return (
        <PageLayout hasHeader={true}>   
            <CustomTable 
                data={playerStore.players.data}
                columns={playersPageColumns}
                extraHeader={
                    <Input 
                        value={searchInputValue} 
                        onChange={handleChangeInput} 
                        placeholder="Search for a player..." 
                        onKeyUp={handleKeyPress} 
                        endAdornment={
                            <IconButton onClick={handleStartSearch}>
                                <SearchIcon/>
                            </IconButton>
                        }
                    />
                }
                pagination={{
                    enabled: true,
                    params: {
                        count: playerStore.players.meta?.total_count || 0,
                        page: currentPage,
                        rowsPerPage: playerStore.entriesPerPage,
                        rowsPerPageOptions: [10, 20],
                        onRowsPerPageChange: handleRowsPerPageChanging,
                        onPageChange: handlePageChanging,
                    }
                }}
            />
        </PageLayout>
    );
});

export default PlayersPage;